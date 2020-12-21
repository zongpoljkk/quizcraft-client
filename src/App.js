import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";

import backend from "./ip";
import Navbar from "./components/Navbar";
import Page from "./containers/Page";
import ErrorPage from "./containers/ErrorPage/ErrorPage";
import Homepage from "./containers/Homepage/Homepage";
import TopicPage from "./containers/TopicPage/TopicPage";
import SubtopicPage from "./containers/SubtopicPage/SubtopicPage";
import PracticeGame from "./containers/PracticeGame/PracticeGame";
import QuizGame from "./containers/QuizGame/QuizGame";
import LoginPage from "./containers/LoginPage/LoginPage";
import OAuthRedirectPage from "./containers/OAuthRedirectPage/OAuthRedirectPage";

const App = () => {
  const [user_info, set_user_info] = useState();
  const token = localStorage.getItem("token");
  const _id = localStorage.getItem("userId");

  const getUserData = async () => {
    try {
      const response = await axios.get(backend + "user/get-user/", {
        params: {
          _id: _id
        },
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      const { success, data } = response.data;
      console.log(data);
      if (success) {
        set_user_info(data);
      } else {
        console.log("getUserInfo Error");
      } 
    } catch (e) {
      console.log("There are something wrong about get user infomation :(");
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Router>
      {user_info ? (
        <Navbar user_info={user_info}/>
      ): null}
      <Page>
        <Switch>
        <Route exact path="/:subject/:selected_topic_name/:selected_subtopic_name/:selected_difficulty/practice-game">
            <PracticeGame token={token}/>
          </Route>
          <Route exact path="/:subject/:selected_topic_name/:selected_subtopic_name/:selected_difficulty/quiz-game">
            <QuizGame token={token}/>
          </Route>
          <Route path="/oauth/mcv-callback">
            <OAuthRedirectPage/>
          </Route>
          <Route exact path="/:subject/:topic">
            <SubtopicPage token={token}/>
          </Route>
          <Route exact path="/topic">
            <TopicPage token={token}/>
          </Route>
          <Route exact path="/homepage">
            <Homepage user_info={user_info}/>
          </Route>
          <Route exact path="/">
            <LoginPage user_info={user_info}/>
          </Route>
          <Route path="*">
            <ErrorPage />
          </Route>
        </Switch>
      </Page>
    </Router>
  );
};

export default App;

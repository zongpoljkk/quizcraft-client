import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import axios from "axios";

import { PrivateRoute } from "./route/PrivateRoute";
import { PublicRoute } from "./route/PublicRoute";
import backend from "./ip";
import Navbar from "./components/Navbar";
import Page from "./containers/Page";
import ErrorPage from "./containers/ErrorPage/ErrorPage";
import PracticeAnswer from "./containers/PracticeAnswer/PracticeAnswer";

// Component
import Homepage from "./containers/Homepage/Homepage";
import ProfilePage from "./containers/ProfilePage/ProfilePage";
import EditUsernamePage from "./containers/EditUsernamePage/EditUsernamePage";
import TopicPage from "./containers/TopicPage/TopicPage";
import SubtopicPage from "./containers/SubtopicPage/SubtopicPage";
import PracticeGame from "./containers/PracticeGame/PracticeGame";
import QuizResultPage from "./containers/QuizResultPage/QuizResultPage";
import QuizGame from "./containers/QuizGame/QuizGame";
import AllChallengePage from "./containers/AllChallengePage/AllChallengePage";
import ChallengeGame from "./containers/ChallengeGame/ChallengeGame";
import ChallengeResultPage from "./containers/ChallengeResultPage/ChallengeResultPage";
import ReportPage from "./containers/ReportPage/ReportPage";
import LoginPage from "./containers/LoginPage/LoginPage";
import OAuthRedirectPage from "./containers/OAuthRedirectPage/OAuthRedirectPage";

const App = () => {
  const [user_info, set_user_info] = useState();
  const token = localStorage.getItem("token");
  const user_id = localStorage.getItem("userId");

  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }

  const handleLogout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
  };

  const getUserData = async () => {
    try {
      const response = await axios.get(backend + "user/get-user/", {
        params: {
          _id: user_id,
        },
      });
      const { success, data } = response.data;
      if (success) {
        set_user_info(data[0]);
      } else {
        console.log("getUserInfo Error");
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        window.location.pathname = "/";
      } else {
        console.log("There are something wrong about get user infomation :(");
      }
    }
  };

  useEffect(() => {
    if (token) {
      getUserData();
    }
  }, []);

  return (
    <Router>
      {localStorage.getItem("userId") && user_info && (
        <Navbar user_info={user_info} />
      )}
      <Page>
        <Switch>
          <PrivateRoute
            exact
            path="/:subject/:selected_topic_name/:selected_subtopic_name/:selected_difficulty/practice-game"
          >
            <PracticeGame />
          </PrivateRoute>
          <PrivateRoute
            exact
            path="/:subject/:selected_topic_name/:selected_subtopic_name/:selected_difficulty/practice-answer"
          >
            <PracticeAnswer />
          </PrivateRoute>
          <PrivateRoute
            exact
            path="/:subject/:selected_topic_name/:selected_subtopic_name/:selected_difficulty/quiz-game"
            getUserData={getUserData}
          >
            <QuizGame />
          </PrivateRoute>
          <PrivateRoute
            exact
            path="/:subject/:selected_topic_name/:selected_subtopic_name/:selected_difficulty/quiz-result"
            getUserData={getUserData}
          >
            <QuizResultPage />
          </PrivateRoute>
          <PrivateRoute
            exact
            path="/:subject/:selected_topic_name/:selected_subtopic_name/:selected_difficulty/all-challenges"
            getUserData={getUserData}
          >
            <AllChallengePage />
          </PrivateRoute>
          <PrivateRoute
            exact
            path="/:subject/:selected_topic_name/:selected_subtopic_name/:selected_difficulty/challenge-game"
            getUserData={getUserData}
          >
            <ChallengeGame />
          </PrivateRoute>
          <PrivateRoute
            exact
            path="/:subject/:selected_topic_name/:selected_subtopic_name/:selected_difficulty/challenge-result"
            getUserData={getUserData}
          >
            <ChallengeResultPage />
          </PrivateRoute>
          <PublicRoute path="/oauth/mcv-callback">
            <OAuthRedirectPage />
          </PublicRoute>
          <PrivateRoute exact path="/:subject/:topic">
            <SubtopicPage />
          </PrivateRoute>
          <PrivateRoute exact path="/report" getUserData={getUserData}>
            <ReportPage />
          </PrivateRoute>
          <PrivateRoute exact path="/homepage" getUserData={getUserData}>
            <Homepage user_id={user_id} />
          </PrivateRoute>
          <PrivateRoute path="/:topic">
            <TopicPage />
          </PrivateRoute>
          <PrivateRoute exact path="/profile" getUserData={getUserData}>
            <ProfilePage handleLogout={handleLogout} user_info={user_info} />
          </PrivateRoute>
          <PrivateRoute exact path="/edit-username">
            <EditUsernamePage />
          </PrivateRoute>
          <PrivateRoute exact path="/report" getUserData={getUserData}>
            <ReportPage />
          </PrivateRoute>
          <PublicRoute exact path="/">
            <LoginPage />
          </PublicRoute>
          <PrivateRoute path="*">
            <ErrorPage />
          </PrivateRoute>
        </Switch>
      </Page>
    </Router>
  );
};

export default App;

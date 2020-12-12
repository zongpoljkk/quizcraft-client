import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Page from "./containers/Page";
import ErrorPage from "./containers/ErrorPage/ErrorPage";
import Homepage from "./containers/Homepage/Homepage";
import TopicPage from "./containers/TopicPage/TopicPage";
import SubtopicPage from "./containers/SubtopicPage/SubtopicPage";
import PracticeGame from "./containers/PracticeGame/PracticeGame";
import LoginPageTest from "./containers/LoginPageTest/LoginPageTest";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Page>
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route exact path="/topic">
            <TopicPage />
          </Route>
          <Route exact path="/:subject/:topic">
            <SubtopicPage />
          </Route>
          <Route exact path="/:subject/:selected_topic_name/:selected_subtopic_name/:selected_difficulty/practice-game">
            <PracticeGame />
          </Route>
          <Route exact path="/login">
            <LoginPageTest />
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

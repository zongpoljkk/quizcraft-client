import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Page from "./containers/Page";
import ErrorPage from "./containers/ErrorPage/ErrorPage";
import Homepage from "./containers/Homepage/Homepage";
import TopicPage from "./containers/TopicPage/TopicPage";
import SubtopicPage from "./containers/SubtopicPage/SubtopicPage";
import Navbar from "./components/Navbar";

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
          <Route exact path="/subtopic">
            <SubtopicPage />
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

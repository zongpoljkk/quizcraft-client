import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Page from "./containers/Page";
import ErrorPage from "./containers/ErrorPage/ErrorPage";

import Navbar from "./components/Navbar";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Page />
        </Route>
        <Route path="/browse">
          <Page />
        </Route>
        <Route path="*">
          <ErrorPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

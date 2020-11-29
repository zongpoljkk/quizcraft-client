import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Containers
import Homepage from "./containers/Homepage/Homepage";
import ErrorPage from "./containers/ErrorPage/ErrorPage";

// Component
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route path="/browse">
          <Homepage />
        </Route>
        <Route path="*">
          <ErrorPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

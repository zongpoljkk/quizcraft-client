import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Page from "./containers/Page";
import ErrorPage from "./containers/ErrorPage/ErrorPage";
import PracticeAnswer from "./containers/PracticeAnswer/PracticeAnswer";

// Component
import Navbar from "./components/Navbar/Navbar";
import Homepage from "./containers/Homepage/Homepage";
import TopicPage from "./containers/TopicPage/TopicPage";

function App() {
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
          <Route path="/practice-answer">
            <PracticeAnswer />
          </Route>
          <Route path="*">
            <ErrorPage />
          </Route>
        </Switch>
      </Page>
    </Router>
  );
}

export default App;

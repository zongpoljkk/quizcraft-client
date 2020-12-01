import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Page from "./containers/Page";
import ErrorPage from "./containers/ErrorPage/ErrorPage";
import PracticeAnswer from "./containers/PracticeAnswer/PracticeAnswer";

// Component
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <div className="App">
      <Router>
        {/* <div className="header"> */}
          <Navbar />
        {/* </div> */}

        <div className="content">
          <Switch>
            <Route exact path="/">
              <Page />
            </Route>
            <Route path="/practice-answer">
              <PracticeAnswer />
            </Route>
            <Route path="*">
              <ErrorPage />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;

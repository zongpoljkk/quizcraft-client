import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";

// Containers
import Homepage from "./containers/Homepage/Homepage";
import ErrorPage from "./containers/ErrorPage/ErrorPage";
import PracticeAnswer  from "./containers/PracticeAnswer/PracticeAnswer";

// Component
import Navbar from "./components/Navbar/Navbar";


function App() {
  return (
    <div className="App" style={{padding: "0px", margin: "0px"}}>
      <Router>
        <div className="header">
          <Navbar />
        </div>

        <div className="content">
          <Switch>
            <Route exact path="/">
              <Homepage />
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
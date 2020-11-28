import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// Containers
import Homepage from "./containers/Homepage/Homepage";
import ErrorPage from "./containers/Error_Page/Error_Page";
import PracticeAnswer  from "./containers/Practice_Answer/Practice_Answer";

// Component
import Navbar from "./components/Navbar/Navbar";

// Styling
import "./App.css";

function App() {
  return (
    <div className="App">
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

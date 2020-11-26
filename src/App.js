import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// Containers
import Homepage from "./containers/Homepage/Homepage";
import ErrorPage from "./containers/Error_Page/Error_Page";

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
            <Route path="/browse">
              <Homepage />
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

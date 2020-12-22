import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Page from "./containers/Page";
import ErrorPage from "./containers/ErrorPage/ErrorPage";
import PracticeAnswer from "./containers/PracticeAnswer/PracticeAnswer";

// Component
import Homepage from "./containers/Homepage/Homepage";
import TopicPage from "./containers/TopicPage/TopicPage";
import SubtopicPage from "./containers/SubtopicPage/SubtopicPage";
import PracticeGame from "./containers/PracticeGame/PracticeGame";
import QuizGame from "./containers/QuizGame/QuizGame";

function App() {
  return (
    <Router>
      <Navbar />
      <Page>
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route path="/:subject/:selected_topic_name/:selected_subtopic_name/:selected_difficulty/practice-answer">
            <PracticeAnswer />
          </Route>
          <Route exact path="/practice-game">
            <PracticeGame />
          </Route>
          <Route exact path="/:subject">
            <TopicPage />
          </Route>
          <Route exact path="/:subject/:topic">
            <SubtopicPage />
          </Route>
          <Route exact path="/:subject/:selected_topic_name/:selected_subtopic_name/:selected_difficulty/practice-game">
            <PracticeGame />
          </Route>
          <Route exact path="/:subject/:selected_topic_name/:selected_subtopic_name/:selected_difficulty/quiz-game">
            <QuizGame />
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

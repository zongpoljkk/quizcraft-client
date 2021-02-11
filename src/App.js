import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import axios from "axios";

import { PrivateRoute } from "./route/PrivateRoute";
import { PublicRoute } from "./route/PublicRoute";
import backend from "./ip";
import Navbar from "./components/Navbar/Navbar";
import Page from "./containers/Page";
import ErrorPage from "./containers/ErrorPage/ErrorPage";
import PracticeAnswer from "./containers/PracticeAnswer/PracticeAnswer";

// Component
import Homepage from "./containers/Homepage/Homepage";
import ProfilePage from "./containers/ProfilePage/ProfilePage";
import EditUsernamePage from "./containers/EditUsernamePage/EditUsernamePage";
import TopicPage from "./containers/TopicPage/TopicPage";
import SubtopicPage from "./containers/SubtopicPage/SubtopicPage";
import PracticeGame from "./containers/PracticeGamePage/PracticeGamePage";
import QuizResultPage from "./containers/QuizResultPage/QuizResultPage";
import QuizGame from "./containers/QuizGamePage/QuizGamePage";
import AllChallengesPage from "./containers/AllChallengesPage/AllChallengesPage";
import AllModeChallengesPage from "./containers/AllModeChallengesPage/AllModeChallengesPage";
import ChallengeGame from "./containers/ChallengeGamePage/ChallengeGamePage";
import ChallengeResultPage from "./containers/ChallengeResultPage/ChallengeResultPage";
import CreateGroupPage from "./containers/CreateGroupPage/CreateGroupPage";
import GroupResultPage from "./containers/GroupResultPage/GroupResultPage";
import JoinGroupPage from "./containers/JoinGroupPage/JoinGroupPage";
import WaitingRoomPage from "./containers/WaitingRoomPage/WaitingRoomPage";
import GroupGamePage from "./containers/GroupGamePage/GroupGamePage";
import ShopPage from "./containers/ShopPage/ShopPage";
import AchievementPage from "./containers/AchievementPage/AchievementPage";
import ReportPage from "./containers/ReportPage/ReportPage";
import LoginPage from "./containers/LoginPage/LoginPage";
import OAuthRedirectPage from "./containers/OAuthRedirectPage/OAuthRedirectPage";

const App = () => {
  const [user_info, set_user_info] = useState();
  const token = localStorage.getItem("token");
  const user_id = localStorage.getItem("userId");

  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }

  const handleLogout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
  };

  const getUserData = async () => {
    try {
      const response = await axios.get(backend + "user/get-user/", {
        params: {
          _id: user_id,
        },
      });
      const { success, data } = response.data;
      if (success) {
        set_user_info(data[0]);
      } else {
        console.log("getUserInfo Error");
      }
    } catch (error) {
      console.log("There are something wrong about get user infomation :(");
    }
  };

  useEffect(() => {
    if (token) {
      getUserData();
    }
  }, []);

  let isRefreshing = false;
  let failedQueue = [];

  const processQueue = (error, token = null) => {
    failedQueue.forEach((prom) => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve(token);
      }
    });

    failedQueue = [];
  };

  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      const originalRequest = error.config;

      if(error.response.data.from === "refresh token"){
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("userId");
        window.location.pathname = "/";
      }

      if (error.response.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          return new Promise(function (resolve, reject) {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              originalRequest.headers["Authorization"] = "Bearer " + token;
              return axios(originalRequest);
            })
            .catch((err) => {
              return Promise.reject(err);
            });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        return new Promise(function (resolve, reject) {
          axios
            .post(backend + "auth/refresh-token", {
              refreshToken: localStorage.getItem("refreshToken"),
            })
            .then(({ data }) => {
              localStorage.setItem("token", data.token);
              localStorage.setItem("refreshToken", data.refreshToken);
              axios.defaults.headers.common["Authorization"] =
                "Bearer " + data.token;
              originalRequest.headers["Authorization"] = "Bearer " + data.token;
              processQueue(null, data.token);
              resolve(axios(originalRequest));
            })
            .catch((err) => {
              processQueue(err, null);
              reject(err);
            })
            .finally(() => {
              isRefreshing = false;
            });
        });
      }

      return Promise.reject(error);
    }
  );

  return (
    <Router>
      {localStorage.getItem("userId") && user_info && (
        <Navbar user_info={user_info} />
      )}
      <Page>
        <Switch>
          <PrivateRoute
            exact
            path="/:subject/:selected_topic_name/:selected_subtopic_name/:selected_difficulty/practice-game"
            getUserData={getUserData}
          >
            <PracticeGame />
          </PrivateRoute>
          <PrivateRoute
            exact
            path="/:subject/:selected_topic_name/:selected_subtopic_name/:selected_difficulty/practice-answer"
            getUserData={getUserData}
          >
            <PracticeAnswer user_info={user_info} />
          </PrivateRoute>
          <PrivateRoute
            exact
            path="/:subject/:selected_topic_name/:selected_subtopic_name/:selected_difficulty/quiz-game"
            getUserData={getUserData}
          >
            <QuizGame />
          </PrivateRoute>
          <PrivateRoute
            exact
            path="/:subject/:selected_topic_name/:selected_subtopic_name/:selected_difficulty/quiz-result"
            getUserData={getUserData}
          >
            <QuizResultPage user_info={user_info} />
          </PrivateRoute>
          <PrivateRoute
            exact
            path="/:subject/:selected_topic_name/:selected_subtopic_name/:selected_difficulty/all-challenges"
            getUserData={getUserData}
          >
            <AllModeChallengesPage user_info={user_info} />
          </PrivateRoute>
          <PrivateRoute
            exact
            path="/:subject/:selected_topic_name/:selected_subtopic_name/:selected_difficulty/challenge-game"
            getUserData={getUserData}
          >
            <ChallengeGame />
          </PrivateRoute>
          <PrivateRoute
            exact
            path="/:subject/:selected_topic_name/:selected_subtopic_name/:selected_difficulty/challenge-result"
            getUserData={getUserData}
          >
            <ChallengeResultPage />
          </PrivateRoute>
          <PrivateRoute
            exact
            path="/:subject/:selected_topic_name/:selected_subtopic_name/:selected_difficulty/group-game"
            getUserData={getUserData}
          >
            <GroupGamePage />
          </PrivateRoute>
          <PrivateRoute
            exact
            path="/:subject/:selected_topic_name/:selected_subtopic_name/:selected_difficulty/group-result"
            getUserData={getUserData}
          >
            <GroupResultPage />
          </PrivateRoute>
          <PrivateRoute exact path="/all-challenges" getUserData={getUserData}>
            <AllChallengesPage />
          </PrivateRoute>
          <PrivateRoute exact path="/create-group" getUserData={getUserData}>
            <CreateGroupPage />
          </PrivateRoute>
          <PrivateRoute exact path="/join-group" getUserData={getUserData}>
            <JoinGroupPage />
          </PrivateRoute>
          <PrivateRoute exact path="/waiting-room" getUserData={getUserData}>
            <WaitingRoomPage />
          </PrivateRoute>
          <PublicRoute path="/oauth/mcv-callback">
            <OAuthRedirectPage />
          </PublicRoute>
          <PrivateRoute exact path="/topics/:subject" getUserData={getUserData}>
            <TopicPage />
          </PrivateRoute>
          <PrivateRoute exact path="/:subject/:topic" getUserData={getUserData}>
            <SubtopicPage />
          </PrivateRoute>
          <PrivateRoute exact path="/homepage" getUserData={getUserData}>
            <Homepage user_id={user_id} />
          </PrivateRoute>
          <PrivateRoute exact path="/profile" getUserData={getUserData}>
            <ProfilePage handleLogout={handleLogout} user_info={user_info} />
          </PrivateRoute>
          <PrivateRoute exact path="/edit-username" getUserData={getUserData}>
            <EditUsernamePage />
          </PrivateRoute>
          <PrivateRoute exact path="/report" getUserData={getUserData}>
            <ReportPage />
          </PrivateRoute>
          <PrivateRoute exact path="/homepage" getUserData={getUserData}>
            <Homepage user_id={user_id} />
          </PrivateRoute>
          <PrivateRoute exact path="/shop" getUserData={getUserData}>
            <ShopPage />
          </PrivateRoute>
          <PrivateRoute exact path="/achievement" getUserData={getUserData}>
            <AchievementPage user_id={user_id} />
          </PrivateRoute>
          <PublicRoute exact path="/">
            <LoginPage />
          </PublicRoute>
          <PrivateRoute exact path="*">
            <ErrorPage />
          </PrivateRoute>
        </Switch>
      </Page>
    </Router>
  );
};

export default App;

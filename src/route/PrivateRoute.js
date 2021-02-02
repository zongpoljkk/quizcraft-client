import React, { useEffect } from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";

import backend from "../ip";

export const PrivateRoute = ({ children, getUserData = () => {}, ...rest }) => {
  let token = localStorage.getItem("token");
  const location = useLocation();

  // Is the marker being refreshed?
  let isRefreshing = false;
  // Retry queue, each item will be a function to be executed
  let requests = [];

  const refreshToken = () => {
    // Instance is the axios instance created in current request.js
    return axios
      .post(backend + "auth/refresh-token")
      .then((response) => response.data);
  };

  axios.interceptors.response.use(
    (response) => {
      const { exp } = jwt_decode(token);
      if (exp * 1000 - Date.now() < 900000) {
        const config = response.config;
        if (!isRefreshing) {
          isRefreshing = true;
          return refreshToken()
            .then((response) => {
              const { token } = response.data;
              localStorage.setItem(token);
              config.headers["Authorization"] = "Bearer " + token;

              // token has been refreshed to retry requests from all queues
              requests.forEach((cb) => cb(token));
              requests = [];
              return axios(config);
            })
            .catch((response) => {
              console.error("refreshtoken error =>", response);
              window.location.href = "/homepage";
            })
            .finally(() => {
              isRefreshing = false;
            });
        } else {
          // token is being refreshed and a promise that resolve has not been executed is returned
          return new Promise((resolve) => {
            // Put resolve in the queue, save it in a function form, and execute it directly after token refreshes
            requests.push((token) => {
              config.baseURL = "";
              config.headers["X-Token"] = token;
              resolve(axios(config));
            });
          });
        }
      }
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    getUserData();
  }, [location]);

  return (
    <Route
      {...rest}
      render={() => {
        if (token) {
          return children;
        } else {
          return <Redirect to="/" />;
        }
      }}
    />
  );
};

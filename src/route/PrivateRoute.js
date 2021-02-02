import React, { useEffect } from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";

import backend from "../ip";

export const PrivateRoute = ({ children, getUserData = () => {}, ...rest }) => {
  let token = localStorage.getItem("token");
  const location = useLocation();

  instance.setToken = (token) => {
    instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    localStorage.setItem("token", token);
  };

  function refreshToken() {
    // Instance is the axios instance created in current request.js
    return instance
      .post(backend + "auth/refresh-token")
      .then((res) => res.data);
  }

  // Create an axios instance
  const instance = axios.create({
    baseURL: "/api",
    headers: {
      Authorization: `Bearer ${token}`, // headers settoken
    },
  });

  // Is the marker being refreshed?
  let isRefreshing = false;
  // Retry queue, each item will be a function to be executed
  let requests = [];

  instance.interceptors.response.use(
    (response) => {
      const { exp } = jwt_decode(token);
      if (exp * 1000 - Date.now() < 900000) {
        const config = response.config;
        if (!isRefreshing) {
          isRefreshing = true;
          return refreshToken()
            .then((res) => {
              const { token } = res.data;
              instance.setToken(token);
              config.headers["Authorization"] = `Bearer ${token}`;
              config.baseURL = "";
              // token has been refreshed to retry requests from all queues
              requests.forEach((cb) => cb(token));
              requests = [];
              return instance(config);
            })
            .catch((res) => {
              console.error("refreshtoken error =>", res);
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
              config.headers["Authorization"] = `Bearer ${token}`;
              resolve(instance(config));
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

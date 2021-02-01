import React, { useEffect, useState } from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";

import backend from "../ip";

export const PrivateRoute = ({ children, getUserData = () => {}, ...rest }) => {
  let token = localStorage.getItem("token");
  const location = useLocation();
  const { exp } = jwt_decode(token);
  const [refresh_token, set_refresh_token] = useState(0);

  const refreshToken = async () => {
    try {
      const response = await axios.post(backend + "auth/refresh-token");
      const { success, token } = response.data;
      if (success) {
        localStorage.setItem("token", token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      } else {
        console.log("refreshToken Error");
      }
    } catch (error) {
      console.log(error);
      console.log("There are something wrong about get refreshToken :(");
    }
  };

  axios.interceptors.response.use(
    (response) => {
      if (exp * 1000 - Date.now() < 900000) {
        set_refresh_token(refresh_token + 1);
      }
      return response;
    },
    (error) => {
      if (exp * 1000 - Date.now() > 900000) {
        return Promise.reject(error);
      }
    }
  );

  useEffect(() => {
    getUserData();
  }, [location]);

  useEffect(() => {
    refreshToken();
  }, [refresh_token]);

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

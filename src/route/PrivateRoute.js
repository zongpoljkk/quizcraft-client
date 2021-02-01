import React, { useEffect } from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";

import backend from "../ip";

export const PrivateRoute = ({ 
  children,
  getUserData = () => {},
  ...rest
}) => {
  
  let token = localStorage.getItem("token");
  const location = useLocation();

    // const refreshToken = async () => {
  //   try {
  //     const response = await axios.post(backend + "auth/refresh-token");
  //     const { success, data } = response.data;
  //     if (success) {
  //       localStorage.setItem("token", data.token);
  //       axios.defaults.headers.common[
  //         "Authorization"
  //       ] = `Bearer ${response.data.token}`;
  //     } else {
  //       console.log("refreshToken Error");
  //     }
  //   } catch (error) {
  //     console.log("There are something wrong about get refreshToken :(");
  //   }
  // };

    // axios.interceptors.request.use(
    //   async (config) => {
    //     const { exp } = jwt_decode(token);
    //     if (exp * 1000 - Date.now() <= 900000) {
    //       await refreshToken();
    //       return config;
    //     } else {
    //       return config;
    //     }
    //   },
    //   (err) => {
    //     return Promise.reject(err);
    //   }
    // );

  axios.interceptors.response.use(
    response => {
      return response;
    },
    error => {

      const { exp } = jwt_decode(token);

      if (exp * 1000 - Date.now() > 900000) {
        return Promise.reject(error);
      }
  
      return axios
        .post(backend + "auth/refresh-token")
        .then(response => {
          localStorage.setItem("token", response.data.token);
          axios.defaults.headers.common["Authorization"] = `Bearer ${
            response.data.token
          }`;

          error.hasRefreshedToken = true;
          return Promise.reject(error);
        })
        .catch(() => {
          const tokenError = new Error("Cannot refresh token");
          tokenError.originalError = error;
          return Promise.reject(tokenError);
        });
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

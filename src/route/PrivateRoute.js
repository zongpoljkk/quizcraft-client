import React from "react";
import { Route, Redirect } from "react-router-dom";

export const PrivateRoute = ({ children, getUserData = () => {}, ...rest }) => {
  let token = localStorage.getItem("token");
  return (
    <Route
      {...rest}
      render={() => {
        if (token) {
          getUserData();
          return children;
        } else {
          return <Redirect to="/" />;
        }
      }}
    />
  );
};

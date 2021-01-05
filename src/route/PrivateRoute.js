import React from "react";
import { Route, Redirect } from "react-router-dom";

export const PrivateRoute = ({ children, getUserData = () => {}, ...rest }) => {
  let token = localStorage.getItem("token");

  // TODO: useEffect depends on nothing or depends on children to make it not calling backend every time
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

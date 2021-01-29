import React, { useEffect } from "react";
import { Route, Redirect, useLocation } from "react-router-dom";

export const PrivateRoute = ({ 
  children,
  getUserData = () => {},
  checkExpired = () => {},
  ...rest
}) => {
  
  let token = localStorage.getItem("token");
  const location = useLocation();

  useEffect(() => {
    getUserData();
    checkExpired();
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

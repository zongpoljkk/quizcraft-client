import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

export const PrivateRoute = ({ children, ...rest }) => {
    let token = localStorage.getItem("token");
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

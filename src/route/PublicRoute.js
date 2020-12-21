import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

export const PublicRoute = ({ children, ...rest }) => {
    let token = localStorage.getItem("token");
    return (
        <Route
            {...rest}
            render={() => {
                if (token) {
                    return <Redirect to="/homepage" />;
                } else {
                    return children;
                }
            }}
        />
    );
};
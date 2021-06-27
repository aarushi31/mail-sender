import React from "react";
import { Route, Redirect } from "react-router-dom";

const isAuthenticated = window.localStorage.getItem("loggedin");

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthenticated) {
          return <Component {...props} />;
        } else {
          return window.location.href="/login";
        }
      }}
    />
  );
};

export default ProtectedRoute;
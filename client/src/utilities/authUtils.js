import React from "react";
import { Route, Redirect } from "react-router-dom";

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    rest.needSignIn === true
      ? <Redirect to='/signin' />
      : <Component {...props} />
  )} />
)

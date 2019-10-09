import React from 'react';
import {Redirect, Route} from "react-router-dom";

export default function ProtectedRoute(props, {component: Component, ...rest}) {
  console.log('inside protected route');
  console.log(props.isAuthenticated, rest);
  const isAuthenticated = props.isAuthenticated;

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to={{
            pathname: '/login',
            state: {from: props.location}
          }}/>
        )
      }
    />
  );
}
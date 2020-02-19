import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export default function AuthenticatedRoute({ component: Component, appProps, ...rest }) {
  const { isAuthenticated, currentUser } = appProps;

  return (
    <Route
      {...rest}
      render={(props) => (isAuthenticated && currentUser
        ? (<Component {...props} {...appProps} />)
        : (
          <Redirect to={{
            pathname: '/login',
            state: { from: props.location },
          }}
          />
        ))}
    />
  );
}

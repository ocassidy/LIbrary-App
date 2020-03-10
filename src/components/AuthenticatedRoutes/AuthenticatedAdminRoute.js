import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export default function AuthenticatedAdminRoute({ component: Component, appProps, ...rest }) {
  const { isAuthenticated, currentUser, isAdmin } = appProps;

  return (
    <Route
      {...rest}
      render={(props) => (isAuthenticated && currentUser && isAdmin
        ? (<Component {...props} {...appProps} />)
        : (
          <Redirect to={{
            pathname: '/forbidden',
            state: { from: props.location },
          }}
          />
        ))}
    />
  );
}

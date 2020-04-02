import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export default function AuthenticatedAdminRoute({ component: Component, authProps, ...rest }) {
  const { isAuthenticated, currentUser, isAdmin } = authProps;

  return (
    <Route
      {...rest}
      render={(props) => (isAuthenticated && currentUser && isAdmin
        ? (<Component {...props} {...authProps} />)
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

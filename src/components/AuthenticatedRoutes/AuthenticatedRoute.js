import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export default function AuthenticatedRoute({ component: Component, authProps, ...rest }) {
  const { isAuthenticated, currentUser } = authProps;

  return (
    <Route
      {...rest}
      render={(props) => (isAuthenticated && currentUser
        ? (<Component {...props} {...authProps} />)
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

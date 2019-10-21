import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export default function ProtectedRoute({ component: Component, ...rest }) {
  const isAuthenticated = (rest.location.state ? rest.location.state.isAuthenticated : null);

  return (
    <Route
      render={(props) => (isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect to={{
          pathname: '/login',
          state: { from: props.location },
        }}
        />
      ))}
    />
  );
}

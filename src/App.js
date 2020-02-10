import React, { useEffect } from 'react';
import './App.css';
import { Redirect, Route, Switch } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import { ConnectedRouter } from 'connected-react-router';
import LoginContainer from './redux/containers/LoginContainer';
import RegisterContainer from './redux/containers/RegisterContainer';
import HomeContainer from './redux/containers/ProfileContainer';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import BooksListContainer from './redux/containers/BooksListContainer';
import NotFound from './components/Shared/NotFound';

export default function App(props) {
  const {
    isLoading,
    history,
    checkForCurrentUser,
    isAuthenticated,
    handleGetBookList,
  } = props;

  useEffect(() => {
    handleGetBookList();
    checkForCurrentUser();
  }, [isAuthenticated, checkForCurrentUser, handleGetBookList]);

  return (
    <div className="App" id="App">
      {isLoading
        ? (
          <div id="appSpinnerDiv">
            <Spinner animation="border" role="status" className="isLoadingSpinner" />
            <div>
              Loading Please Wait...
            </div>
          </div>
        )
        : (
          <ConnectedRouter history={history} id="baseRouter">
            <Switch id="baseRouterSwitch">
              <Route
                exact
                path="/login"
                component={() => <LoginContainer />}
                id="baseRouteToLogin"
              />
              <Route
                exact
                path="/register"
                component={() => <RegisterContainer />}
                id="baseRouteToRegister"
              />
              <Route
                exact
                path="/books"
                component={() => <BooksListContainer />}
                id="baseRouteToBooks"
              />
              <ProtectedRoute exact path="/user/profile/:username" component={HomeContainer} id="protectedRouteToHome" />
              <Redirect
                exact
                from="/"
                to="/login"
                id="baseRouteRedirectToLogin"
              />
              <Route component={NotFound} />
            </Switch>
          </ConnectedRouter>
        )}
    </div>
  );
}

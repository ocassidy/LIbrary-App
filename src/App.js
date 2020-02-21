import React, { useEffect } from 'react';
import './App.css';
import { Redirect, Route, Switch } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import { ConnectedRouter } from 'connected-react-router';
import { connect } from 'react-redux';
import ProtectedRoute from './components/AuthenticatedRoutes/AuthenticatedRoute';
import NotFound from './components/Shared/NotFound';
import { getBookAnalytics, getBookList, getCurrentUser } from './redux/actions';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import BooksList from './components/BooksList/BooksList';
import Analytics from './components/Analytics/Analytics';
import Profile from './components/Profile/Profile';

function App(props) {
  const {
    isLoading,
    history,
    checkForCurrentUser,
    isAuthenticated,
    handleGetBookList,
    currentUser,
    isAdmin,
    bookAnalyticsList,
    handleGetBookAnalytics,
  } = props;

  useEffect(() => {
    handleGetBookList();
    checkForCurrentUser();
    if (isAdmin) {
      handleGetBookAnalytics();
    }
  }, [
    isAuthenticated,
    isAdmin,
    checkForCurrentUser,
    handleGetBookList,
    bookAnalyticsList,
    handleGetBookAnalytics,
  ]);

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
                component={() => <Login />}
                id="baseRouteToLogin"
              />
              <Route
                exact
                path="/register"
                component={() => <Register />}
                id="baseRouteToRegister"
              />
              <Route
                exact
                path="/books"
                component={() => <BooksList />}
                id="baseRouteToBooks"
              />
              <Route
                exact
                path="/analytics/books"
                component={() => <Analytics />}
                id="baseRouteToAnalytics"
              />

              <Route
                exact
                path="/analytics/users"
                component={() => <Analytics />}
                id="baseRouteToAnalytics"
              />
              <ProtectedRoute
                exact
                path="/user/profile/:username"
                component={Profile}
                id="protectedRouteToProfile"
                appProps={{ currentUser, isAuthenticated }}
              />
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

const mapStateToProps = (state) => ({
  currentUser: state.userDetails.currentUser,
  isAuthenticated: state.userDetails.isAuthenticated,
  isLoading: state.userDetails.isLoading,
  bookList: state.bookDetails.bookList,
  isAdmin: state.userDetails.isAdmin,
});

const mapDispatchToProps = (dispatch) => ({
  handleGetBookList: () => {
    dispatch(getBookList());
  },
  checkForCurrentUser: () => {
    dispatch(getCurrentUser());
  },
  handleGetBookAnalytics: () => {
    dispatch(getBookAnalytics());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

import React, { useEffect } from 'react';
import './App.css';
import { Redirect, Route, Switch } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import { ConnectedRouter } from 'connected-react-router';
import { connect } from 'react-redux';
import AuthenticatedRoute from './components/AuthenticatedRoutes/AuthenticatedRoute';
import NotFound from './components/Shared/NotFound';
import {
  getBookAnalytics, getBookList, getBookPage, getCurrentUser,
} from './redux/actions';
import Login from './components/Auth/Login/Login';
import { RegisterContainer } from './components/Auth/Register/Register';
import BooksList from './components/BooksList/BooksList';
import BookAnalytics from './components/Analytics/BookAnalytics';
import Profile from './components/Profile/Profile';
import BooksPage from './components/Book/BookPage';
import BookAdmin from './components/Admin/BookAdmin';
import Forbidden from './components/Shared/Forbidden';
import AuthenticatedAdminRoute from './components/AuthenticatedRoutes/AuthenticatedAdminRoute';

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
    handleGetBookPage,
  } = props;

  useEffect(() => {
    handleGetBookList();
    handleGetBookPage(0, 5);
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
    handleGetBookPage,
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
                component={() => <RegisterContainer />}
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
                component={() => <BookAnalytics />}
                id="baseRouteToAnalytics"
              />
              <Route
                exact
                path="/analytics/users"
                component={() => <BookAnalytics />}
                id="baseRouteToAnalytics"
              />
              <Route
                exact
                path="/book/:id"
                component={() => <BooksPage />}
                id="baseRouteToBookPage"
              />
              <AuthenticatedRoute
                exact
                path="/user/profile/:username"
                component={() => <Profile />}
                id="authenticatedRouteToProfile"
                appProps={{ currentUser, isAuthenticated }}
              />
              <AuthenticatedAdminRoute
                exact
                path="/admin/books"
                component={() => <BookAdmin />}
                id="authenticatedAdminRouteToBookAdmin"
                appProps={{ currentUser, isAuthenticated, isAdmin }}
              />
              <Route
                exact
                path="/forbidden"
                component={() => <Forbidden />}
                id="baseRouteToForbidden"
              />
              {currentUser !== null && currentUser !== undefined
                ? (
                  <Redirect
                    exact
                    from="/"
                    to={`/user/profile/${currentUser.username}`}
                    id="checkedRedirectToProfile"
                  />
                ) : (
                  <Redirect
                    exact
                    from="/"
                    to="/books"
                    id="checkedRedirectToBooks"
                  />
                )}
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
  handleGetBookPage: (page, size) => {
    dispatch(getBookPage(page, size));
  },
  checkForCurrentUser: () => {
    dispatch(getCurrentUser());
  },
  handleGetBookAnalytics: () => {
    dispatch(getBookAnalytics());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

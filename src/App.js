import React, { useEffect } from 'react';
import './App.css';
import { Redirect, Route, Switch } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import { ConnectedRouter } from 'connected-react-router';
import { connect } from 'react-redux';
import AuthenticatedRoute from './components/AuthenticatedRoutes/AuthenticatedRoute';
import NotFound from './components/Shared/NotFound';
import { RegisterContainer } from './components/Auth/Register/Register';
import { BookListContainer } from './components/Book/BooksList/BooksList';
import BookAnalytics from './components/Analytics/Analytics/Analytics';
import { ProfileContainer } from './components/Profile/Profile';
import BooksPage from './components/Book/BookPage/BookPage';
import AdminDashboard from './components/Admin/AdminDashboard/AdminDashboard';
import Forbidden from './components/Shared/Forbidden';
import AuthenticatedAdminRoute from './components/AuthenticatedRoutes/AuthenticatedAdminRoute';
import { LoginContainer } from './components/Auth/Login/Login';
import AdminAddBook from './components/Admin/AdminAddBook/AdminAddBook';
import NavBar from './components/Shared/NavBar';
import BookEditPage from './components/Book/BookEditPage/BookEditPage';
import AdminEditDeleteBook from './components/Admin/AdminEditDeleteBook/AdminEditDeleteBook';
import { getBookList, getBookPage } from './redux/actions/BookActions';
import { getCurrentUser } from './redux/actions/AuthActions';
import {
  getBookAnalytics,
  getBookDateRangeAnalytics,
  getReturnsDateRangeAnalytics,
  getUserLoansAnalytics,
  getUserReturnsAnalytics,
} from './redux/actions/AnalyticsActions';
import { getUserPage } from './redux/actions/AdminActions';
import AdminUser from "./components/Admin/AdminUser/AdminUser";
import AdminUserDetails from "./components/Admin/AdminUser/AdminUserDetails";

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
    handleGetBookDateRangeAnalytics,
    handleGetBookPage,
    handleGetUserLoansAnalytics,
    handleGetReturnDateRangeAnalytics,
    handleGetUserReturnsAnalytics,
    handleGetUserPage,
  } = props;

  useEffect(() => {
    handleGetBookList();
    handleGetBookPage(0, 5);
    handleGetUserPage(0, 10);
    checkForCurrentUser();
    if (isAdmin) {
      handleGetBookAnalytics();
      handleGetUserLoansAnalytics(1);
      handleGetUserReturnsAnalytics(1);
      handleGetBookDateRangeAnalytics('2020-01-01', '2020-12-30');
      handleGetReturnDateRangeAnalytics('2020-01-01', '2020-12-30');
    }
  }, [
    isAuthenticated,
    isAdmin,
    checkForCurrentUser,
    handleGetBookList,
    bookAnalyticsList,
    handleGetBookAnalytics,
    handleGetBookPage,
    handleGetBookDateRangeAnalytics,
    handleGetUserLoansAnalytics,
    handleGetReturnDateRangeAnalytics,
    handleGetUserReturnsAnalytics,
    handleGetUserPage,
  ]);

  return (
    <div className="App" id="App">
      {isLoading
        ? (
          <div className="appSpinnerDiv">
            <Spinner animation="border" role="status" className="text-center" style={{ marginTop: '250px' }}/>
            <div>
              Loading Please Wait...
            </div>
          </div>
        )
        : (
          <ConnectedRouter history={history} id="baseRouter">
            <NavBar />
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
                component={() => <BookListContainer />}
                id="baseRouteToBooks"
              />
              <Route
                exact
                path="/admin/analytics"
                component={() => <BookAnalytics />}
                id="baseRouteToAnalytics"
              />
              <Route
                exact
                path="/book/:id"
                component={() => <BooksPage />}
                id="baseRouteToBookPage"
              />
              <AuthenticatedAdminRoute
                exact
                path="/book/edit/:id"
                component={() => <BookEditPage />}
                id="baseRouteToBookPage"
                authProps={{ currentUser, isAuthenticated, isAdmin }}
              />
              <AuthenticatedRoute
                exact
                path="/user/profile/:username"
                component={() => <ProfileContainer />}
                id="authenticatedRouteToProfile"
                authProps={{ currentUser, isAuthenticated }}
              />
              <AuthenticatedAdminRoute
                exact
                path="/admin/dashboard"
                component={() => <AdminDashboard />}
                id="authenticatedAdminRouteToBookAdmin"
                authProps={{ currentUser, isAuthenticated, isAdmin }}
              />
              <AuthenticatedAdminRoute
                exact
                path="/admin/book-add"
                component={() => <AdminAddBook />}
                id="authenticatedAdminRouteToAdminAddBook"
                authProps={{ currentUser, isAuthenticated, isAdmin }}
              />
              <AuthenticatedAdminRoute
                exact
                path="/admin/book-edit-delete"
                component={() => <AdminEditDeleteBook />}
                id="authenticatedAdminRouteToAdminEditDeleteBook"
                authProps={{ currentUser, isAuthenticated, isAdmin }}
              />
              <AuthenticatedAdminRoute
                exact
                path="/admin/book-delete"
                component={() => <AdminDashboard />}
                id="authenticatedAdminRouteToBookAdminDeleteBook"
                authProps={{ currentUser, isAuthenticated, isAdmin }}
              />
              <AuthenticatedAdminRoute
                exact
                path="/admin/users"
                component={() => <AdminUser />}
                id="authenticatedAdminRouteToBookAdminUsers"
                authProps={{ currentUser, isAuthenticated, isAdmin }}
              />
              <AuthenticatedAdminRoute
                exact
                path="/admin/user/:username"
                component={() => <AdminUserDetails />}
                id="authenticatedAdminRouteToBookAdminUsers"
                authProps={{ currentUser, isAuthenticated, isAdmin }}
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
  currentUser: state.authDetails.currentUser,
  isAuthenticated: state.authDetails.isAuthenticated,
  isLoading: state.authDetails.isLoading,
  isAdmin: state.authDetails.isAdmin,
  bookList: state.bookDetails.bookList,
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
  handleGetBookDateRangeAnalytics: (startDate, endDate) => {
    dispatch(getBookDateRangeAnalytics(startDate, endDate));
  },
  handleGetReturnDateRangeAnalytics: (startDate, endDate) => {
    dispatch(getReturnsDateRangeAnalytics(startDate, endDate));
  },
  handleGetUserLoansAnalytics: (loanNumber) => {
    dispatch(getUserLoansAnalytics(loanNumber));
  },
  handleGetUserReturnsAnalytics: (loanNumber) => {
    dispatch(getUserReturnsAnalytics(loanNumber));
  },
  handleGetUserPage: (page, size) => {
    dispatch(getUserPage(page, size));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

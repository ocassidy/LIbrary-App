import axios from 'axios';
import toastr from 'toastr';
import { push } from 'connected-react-router';
import { API_BASE_URL } from '../constants/constants';
import {
  GET_CURRENT_USER_FAILURE,
  GET_CURRENT_USER_SUCCESS,
  POST_LOGIN_FAILURE,
  POST_LOGIN_SUCCESS,
  POST_REGISTER_SUCCESS,
  LOGOUT_FAILURE,
  LOGOUT_SUCCESS,
  GET_BOOK_LIST_FAILURE,
  GET_BOOK_LIST_SUCCESS,
  GET_CURRENT_USER_IS_ADMIN_SUCCESS,
  GET_ANALYTICS_SUCCESS,
  GET_ANALYTICS_FAILURE,
  GET_BOOK_SUCCESS,
  GET_BOOK_FAILURE,
  POST_LOAN_SUCCESS,
  POST_LOAN_FAILURE,
} from './actionTypes';

const axiosConfig = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export const getCurrentUserSuccess = (currentUser) => ({
  type: GET_CURRENT_USER_SUCCESS,
  isLoading: false,
  isAuthenticated: true,
  currentUser,
});

export const getCurrentUserIsAdminSuccess = (currentUser) => ({
  type: GET_CURRENT_USER_IS_ADMIN_SUCCESS,
  isLoading: false,
  isAuthenticated: true,
  isAdmin: true,
  currentUser,
});

export const getCurrentUserFailure = (message) => ({
  type: GET_CURRENT_USER_FAILURE,
  isLoading: false,
  isAuthenticated: false,
  message,
});

export const getCurrentUser = () => (dispatch) => {
  if (localStorage.getItem('ACCESS_TOKEN')) {
    return axios.get(`${API_BASE_URL}/auth/user`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
      },
    })
      .then((response) => {
        const checkIfAdmin = response.data.authorities.find((authority) => authority.authority === 'ROLE_ADMIN');
        if (checkIfAdmin) {
          dispatch(getCurrentUserIsAdminSuccess(response.data));
        } else {
          dispatch(getCurrentUserSuccess(response.data));
        }
      })
      .catch((error) => {
        if (error.response === undefined) {
          return dispatch(getCurrentUserFailure('Failed to get back end'));
        }
        return dispatch(getCurrentUserFailure(error.response.data.message));
      });
  }
  return dispatch(getCurrentUserFailure('No Token Set - User Unauthenticated'));
};

export const postLoginSuccess = (token) => ({
  type: POST_LOGIN_SUCCESS,
  token,
});

export const postLoginFailure = (message) => ({
  type: POST_LOGIN_FAILURE,
  message,
});

export const postLogin = (usernameOrEmail, password) => (dispatch) => {
  axios.post(`${API_BASE_URL}/auth/login`, {
      usernameOrEmail,
      password,
    },
    axiosConfig)
    .then((response) => {
      localStorage.setItem('ACCESS_TOKEN', response.data.token);
      dispatch(postLoginSuccess(response.data.token));
      dispatch(getCurrentUser());
      toastr.success('Login Successful!', 'Success');
    })
    .catch((error) => {
      if (error.response === undefined) {
        dispatch(getCurrentUserFailure('Failed to connect to back end'));
        dispatch(postLoginFailure('Failed to connect to back end'));
        return toastr.error('Failed to connect to server, please try again later', 'Error');
      }
      dispatch(getCurrentUserFailure(error.response.data.message));
      dispatch(postLoginFailure(error.response.data.message));
      return toastr.error(error.response.data.message, 'Request Failed with Error');
    });

  if (localStorage.getItem('ACCESS_TOKEN')) {
    dispatch(getCurrentUser());
  }
};

export const postRegisterSuccess = (success) => ({
  type: POST_REGISTER_SUCCESS,
  success,
});

export const postRegisterFailure = (message) => ({
  type: POST_LOGIN_FAILURE,
  message,
});

export const postRegister = (registerRequest) => (dispatch) => axios.post(`${API_BASE_URL}/auth/register`,
  {
    username: registerRequest.username,
    firstName: registerRequest.firstName,
    lastName: registerRequest.lastName,
    password: registerRequest.password,
    email: registerRequest.email,
  },
  axiosConfig)
  .then((response) => {
    if (response.data.success === false) {
      return toastr.error(response.data.message, 'Error');
    }
    toastr.success(`${response.data.message} Redirecting to login.`, 'Success', { timeOut: 10000 });
    dispatch(postRegisterSuccess(response.data.message));
    dispatch(push('/login'));
    return response.data;
  })
  .catch((error) => {
    toastr.error(error.message, 'Error');
    dispatch(postRegisterFailure(error.message));
  });

export const logoutSuccess = (success) => ({
  type: LOGOUT_SUCCESS,
  success,
});

export const logoutFailure = (message) => ({
  type: LOGOUT_FAILURE,
  message,
});

export const logout = () => (dispatch) => {
  localStorage.removeItem('ACCESS_TOKEN');
  dispatch(logoutSuccess(true));
  toastr.success('You have been successfully logged out.', 'Logged Out');
  dispatch(push('/login'));
};

export const getBookListSuccess = (bookList) => ({
  type: GET_BOOK_LIST_SUCCESS,
  bookList,
});

export const getBookListFailure = (message) => ({
  type: GET_BOOK_LIST_FAILURE,
  message,
});

export const getBookList = () => (dispatch) => axios.get(`${API_BASE_URL}/books`,
  {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
    },
  })
  .then((response) => {
    dispatch(getBookListSuccess(response.data));
  })
  .catch((error) => {
    dispatch(getBookListFailure(error.message));
  });

export const getBookSuccess = (book) => ({
  type: GET_BOOK_SUCCESS,
  book,
});

export const getBookFailure = (message) => ({
  type: GET_BOOK_FAILURE,
  message,
});

export const getBook = (id) => (dispatch) => axios.get(`${API_BASE_URL}/book/${id}`,
  {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
    },
  })
  .then((response) => {
    dispatch(getBookSuccess(response.data));
  })
  .catch((error) => {
    dispatch(getBookFailure(error.message));
  });

export const getBookAnalyticsSuccess = (bookAnalyticsList) => ({
  type: GET_ANALYTICS_SUCCESS,
  bookAnalyticsList,
});

export const getBookAnalyticsFailure = (message) => ({
  type: GET_ANALYTICS_FAILURE,
  message,
});

export const getBookAnalytics = () => (dispatch) => axios.get(`${API_BASE_URL}/analytics/all`,
  {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
    },
  })
  .then((response) => {
    dispatch(getBookAnalyticsSuccess(response.data));
  })
  .catch((error) => {
    toastr.error(error.message, 'Error');
    dispatch(getBookAnalyticsFailure(error.message));
  });

export const postLoanRequestSuccess = (token) => ({
  type: POST_LOAN_SUCCESS,
  token,
});

export const postLoanRequestFailure = (message) => ({
  type: POST_LOAN_FAILURE,
  message,
});

export const postLoanRequest = (bookId, username) => (dispatch) => {
  axios.post(`${API_BASE_URL}/book/loan`, { bookId, username },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
      },
    })
    .then((response) => {
      dispatch(postLoanRequestSuccess(response.data));
      toastr.success('Loan Successful, this book is now loaned to you.', 'Success');
    })
    .catch((error) => {
      if (error.response === undefined) {
        dispatch(postLoanRequestFailure('Failed to connect to back end'));
        return toastr.error('Failed to connect to server, please try again later', 'Error');
      }
      dispatch(postLoanRequestFailure(error.response.data.message));
      return toastr.error(error.response.data.message);
    });

  if (localStorage.getItem('ACCESS_TOKEN')) {
    dispatch(getCurrentUser());
  }
};

import axios from 'axios';
import toastr from 'toastr';
import { push } from 'connected-react-router';
import { API_BASE_URL } from '../../constants/constants';
import {
  GET_CURRENT_USER_FAILURE,
  GET_CURRENT_USER_IS_ADMIN_SUCCESS,
  GET_CURRENT_USER_SUCCESS, LOGOUT_FAILURE, LOGOUT_SUCCESS, POST_LOGIN_FAILURE,
  POST_LOGIN_SUCCESS, POST_REGISTER_SUCCESS,
} from '../actionTypes';

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
    usernameOrEmail: usernameOrEmail.trim().toLowerCase(),
    password: password.trim(),
  })
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
    username: registerRequest.username.trim().toLowerCase(),
    firstName: registerRequest.firstName.trim(),
    lastName: registerRequest.lastName.trim(),
    password: registerRequest.password.trim(),
    email: registerRequest.email.trim().toLowerCase(),
    address1: registerRequest.address1.trim(),
    address2: registerRequest.address2.trim(),
    city: registerRequest.city.trim(),
    contactNumber: registerRequest.contactNumber.trim(),
    gender: registerRequest.gender,
  })
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
    toastr.error(`${error.response.data.errors[0].field} ${error.response.data.errors[0].defaultMessage}`, 'Error');
    dispatch(postRegisterFailure(error.response.data.message));
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
  dispatch(push('/login'));
  toastr.success('You have been successfully logged out.', 'Logged Out');
};

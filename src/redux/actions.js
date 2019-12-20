import axios from 'axios';
import toastr from 'toastr';
import {push} from 'connected-react-router';
import {API_BASE_URL} from '../constants';
import {
  GET_CURRENT_USER_FAILURE,
  GET_CURRENT_USER_SUCCESS, LOGOUT_FAILURE, LOGOUT_SUCCESS,
  POST_LOGIN_FAILURE,
  POST_LOGIN_SUCCESS, POST_REGISTER_SUCCESS,
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
        }
      },
    )
      .then((response) => {
        dispatch(getCurrentUserSuccess(response.data));
        dispatch(push(`/user/home/${response.data.username}`, {
          currentUser: response.data.username,
          isAuthenticated: true
        }))
      })
      .catch((error) => {
        dispatch(getCurrentUserFailure(error.message));
      });
  }
  return dispatch(getCurrentUserFailure('No Token Set - User Unauthorised'));
};

export const postLoginSuccess = (token) => ({
  type: POST_LOGIN_SUCCESS,
  token,
});

export const postLoginFailure = (message) => ({
  type: POST_LOGIN_FAILURE,
  message,
});

export const postLogin = (usernameOrEmail, password) => {
  return dispatch => {
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
        dispatch(getCurrentUserFailure(error.message));
        dispatch(postLoginFailure(error.message));
        toastr.error(error.message, 'Error');
      });

    if (localStorage.getItem('ACCESS_TOKEN')) {
      dispatch(getCurrentUser());
    }
  };
}

export const postRegisterSuccess = (success) => ({
  type: POST_REGISTER_SUCCESS,
  success,
});

export const postRegisterFailure = (message) => ({
  type: POST_LOGIN_FAILURE,
  message,
});

export const postRegister = (registerRequest) => (dispatch) => axios.post(`${API_BASE_URL}/auth/register`, {
    username: registerRequest.username,
    name: registerRequest.name,
    password: registerRequest.password,
    email: registerRequest.email,
  },
  axiosConfig)
// eslint-disable-next-line consistent-return
  .then((response) => {
    if (response.data.success === false) {
      toastr.error(response.data.message, 'Error');
    } else {
      toastr.success(`${response.data.message} Redirecting to login.`, 'Success', {timeOut: 10000});
      dispatch(postRegisterSuccess(response.data.message));
      dispatch(push('/login'));
      return response.data;
    }
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
  dispatch(push('/login'));
};

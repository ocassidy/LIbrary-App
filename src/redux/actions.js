import {
  GET_CURRENT_USER_FAILURE,
  GET_CURRENT_USER_SUCCESS,
  POST_LOGIN_FAILURE,
  POST_LOGIN_SUCCESS, POST_REGISTER_SUCCESS
} from './actionTypes'
import axios from 'axios'
import toastr from 'toastr'
import {API_BASE_URL} from "../constants";
import {push} from "connected-react-router";


let axiosConfig = {
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  }
};

let axiosConfigWithToken = {
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Authorization': 'Bearer ' + localStorage.getItem('ACCESS_TOKEN')
  }
};

const baseURL = 'http://localhost:8080/api';

export const getCurrentUserSuccess = (currentUser) => {
  return {
    type: GET_CURRENT_USER_SUCCESS,
    isLoading: false,
    isAuthenticated: true,
    currentUser
  }
};

export const getCurrentUserFailure = (message) => {
  return {
    type: GET_CURRENT_USER_FAILURE,
    isLoading: false,
    isAuthenticated: false,
    message
  }
};

export const getCurrentUser = () => {
  return (dispatch) => {
    return axios.get(`${baseURL}/auth/user`, axiosConfigWithToken)
      .then(response => {
        if (response.status === 200) {
          dispatch(getCurrentUserSuccess(response.data));
          dispatch(push(`/user/home/${response.data}`, {currentUser: response.data}));
          return response.data
        } else {
          return 'No User Found'
        }
      })
      .catch(error => {
        dispatch(getCurrentUserFailure(error.message))
      })
  }
};

export const postLoginSuccess = (token) => {
  return {
    type: POST_LOGIN_SUCCESS,
    token
  }
};

export const postLoginFailure = (message) => {
  return {
    type: POST_LOGIN_FAILURE,
    message
  }
};

export const postLogin = (usernameOrEmail, password) => {
  return (dispatch) => {
    return axios.post(`${baseURL}/auth/login`, {
        usernameOrEmail: usernameOrEmail,
        password: password
      },
      axiosConfig)
      .then(response => {
        localStorage.setItem("ACCESS_TOKEN", response.data.token);
        dispatch(postLoginSuccess(response.data.token));
        toastr.success('Login Successful!', 'Success');
        dispatch(push(`/user/home/${usernameOrEmail}`, {currentUser: usernameOrEmail}));
      })
      .catch(error => {
        dispatch(getCurrentUserFailure(error.message));
        dispatch(postLoginFailure(error.message));
        toastr.error(error.message, 'Error')
      })
  }
};

export const postRegisterSuccess = (success) => {
  return {
    type: POST_REGISTER_SUCCESS,
    success
  }
};

export const postRegisterFailure = (message) => {
  return {
    type: POST_LOGIN_FAILURE,
    message
  }
};

export const postRegister = (registerRequest) => {
  return (dispatch) => {
    return axios.post(API_BASE_URL + "/auth/register", {
        username: registerRequest.username,
        name: registerRequest.name,
        password: registerRequest.password,
        email: registerRequest.email
      },
      axiosConfig)
      .then(response => {
        if (response.data.success === false) {
          toastr.error(response.data.message, 'Error');
        } else {
          toastr.success(response.data.message + ' Redirecting to login.', 'Success', {timeOut: 10000});
          dispatch(postRegisterSuccess(response.data.message));
          dispatch(push(`/login`));
          return response.data;
        }
      })
      .catch(error => {
        toastr.error(error.message, 'Error');
        dispatch(postRegisterFailure(error.message));
      })
  }
};

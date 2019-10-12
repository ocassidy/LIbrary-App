import {
  GET_CURRENT_USER_FAILURE,
  GET_CURRENT_USER_SUCCESS,
  POST_LOGIN_FAILURE,
  POST_LOGIN_SUCCESS
} from './actionTypes'
import axios from 'axios'
import toastr from 'toastr'


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
    currentUser
  }
};

export const getCurrentUserFailure = (message) => {
  return {
    type: GET_CURRENT_USER_FAILURE,
    message
  }
};

export const getCurrentUser = (token) => {
  return (dispatch) => {
    if (localStorage.getItem('ACCESS_TOKEN')) {
      console.log('axiosConfigWithToken', axiosConfigWithToken);
      return axios.get(`${baseURL}/auth/user`, axiosConfigWithToken)
        .then(response => {
          console.log('getCurrentUser', response, token);
          dispatch(getCurrentUserSuccess(response.data))
        })
        .catch(error => {
          console.error(error.message);
          dispatch(getCurrentUserFailure(error.message))
        })
    } else {
      return console.log('No access token set')
    }
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
  console.log('inside post login action', usernameOrEmail, password);
  return (dispatch) => {
    return axios.post(`${baseURL}/auth/login`, {
        usernameOrEmail: usernameOrEmail,
        password: password
      },
      axiosConfig)
      .then(response => {
        if (response.status === 200) {
          localStorage.setItem("ACCESS_TOKEN", response.data.token);
          dispatch(postLoginSuccess(response.data.token));
          toastr.success('Login Successful!', 'Success');
        } else {
          toastr.error('User Does Not Exist', 'Error');
        }
      })
      .catch(error => {
        dispatch(postLoginFailure(error.message));
        toastr.error(error.message, 'Error')
      })
  }
};

/* eslint-disable no-return-assign,no-param-reassign */
import {
  GET_CURRENT_USER_FAILURE,
  GET_CURRENT_USER_SUCCESS,
  POST_LOGIN_FAILURE,
  POST_LOGIN_SUCCESS, POST_REGISTER_FAILURE, POST_REGISTER_SUCCESS,
} from '../actionTypes';

const initialState = {
  currentUser: null,
  isAuthenticated: 'false',
  isLoading: true,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CURRENT_USER_SUCCESS:
      return [state = {
        isAuthenticated: action.isAuthenticated,
        isLoading: false,
        currentUser: action.currentUser,
      }, action.payload];

    case GET_CURRENT_USER_FAILURE:
      return [state = {
        isAuthenticated: false,
        isLoading: false,
        currentUser: null,
      }, action.payload];

    case POST_LOGIN_SUCCESS:
      return [state = {
        isAuthenticated: action.isAuthenticated,
        isLoading: false,
        currentUser: action.currentUser,
      }, action.payload];

    case POST_LOGIN_FAILURE:
      return [state = {
        isAuthenticated: false,
        isLoading: false,
        currentUser: null,
      }, action.payload];

    case POST_REGISTER_SUCCESS:
      return [...state, action.payload];

    case POST_REGISTER_FAILURE:
      return [...state, action.payload];

    default:
      return state;
  }
}

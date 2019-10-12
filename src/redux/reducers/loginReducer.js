import {
  GET_CURRENT_USER, GET_CURRENT_USER_FAILURE,
  GET_CURRENT_USER_SUCCESS,
  POST_LOGIN,
  POST_LOGIN_FAILURE,
  POST_LOGIN_SUCCESS
} from '../actionTypes';

const initialState = {
  currentUser: null,
  isAuthenticated: 'false'
};

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CURRENT_USER_SUCCESS:
      console.log('GET_CURRENT_USER_SUCCESS', action);
      return [state = {isAuthenticated: true, currentUser: action.payload}, action.payload];
    case GET_CURRENT_USER_FAILURE:
      console.log('GET_CURRENT_USER_FAILURE', action);
      return [state = {isAuthenticated: false, currentUser: null}, action.payload];
    case POST_LOGIN_SUCCESS:
      console.log('POST_LOGIN_SUCCESS action', action);
      return [state = {isAuthenticated: true, currentUser: action.payload}, action.payload];
    case POST_LOGIN_FAILURE:
      console.log('POST_LOGIN_FAILURE action', action);
      return [state = {isAuthenticated: false, currentUser: null}, action.payload];
    default:
      return state;
  }
}

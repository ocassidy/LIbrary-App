import {
  GET_CURRENT_USER_FAILURE,
  GET_CURRENT_USER_SUCCESS,
  POST_LOGIN_FAILURE,
  POST_LOGIN_SUCCESS,
  POST_REGISTER_FAILURE,
  POST_REGISTER_SUCCESS,
} from '../actionTypes';

const initialState = {
  currentUser: null,
  isAuthenticated: 'false',
  isLoading: true,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CURRENT_USER_SUCCESS:
      // eslint-disable-next-line no-return-assign
      return state = {
        isAuthenticated: action.isAuthenticated,
        isLoading: false,
        currentUser: action.currentUser,
      };

    case GET_CURRENT_USER_FAILURE:
      // eslint-disable-next-line no-return-assign
      return state = {
        isAuthenticated: false,
        isLoading: false,
        currentUser: null,
      };

    case POST_LOGIN_SUCCESS:
      // eslint-disable-next-line no-return-assign
      return state = {
        isAuthenticated: action.isAuthenticated,
        isLoading: false,
        currentUser: action.currentUser,
      };

    case POST_LOGIN_FAILURE:
      // eslint-disable-next-line no-return-assign
      return state = {
        isAuthenticated: false,
        isLoading: false,
        currentUser: null,
      };

    case POST_REGISTER_SUCCESS:
      return state;

    case POST_REGISTER_FAILURE:
      return state;

    default:
      return state;
  }
}

import {
  GET_CURRENT_USER_FAILURE,
  GET_CURRENT_USER_IS_ADMIN_SUCCESS,
  GET_CURRENT_USER_SUCCESS,
  LOGOUT_FAILURE,
  LOGOUT_SUCCESS,
  POST_LOGIN_FAILURE,
  POST_LOGIN_SUCCESS,
  POST_REGISTER_FAILURE,
  POST_REGISTER_SUCCESS,
} from '../actionTypes';

const initialState = {
  currentUser: null,
  isAuthenticated: 'false',
  isLoading: true,
  isAdmin: false,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CURRENT_USER_IS_ADMIN_SUCCESS:
      // eslint-disable-next-line no-return-assign
      return state = {
        isAuthenticated: action.isAuthenticated,
        isLoading: false,
        currentUser: action.currentUser,
        isAdmin: true,
      };

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
        isAdmin: false,
      };

    case POST_LOGIN_SUCCESS:
      // eslint-disable-next-line no-return-assign
      return state = {
        isAuthenticated: action.isAuthenticated,
        isLoading: false,
        currentUser: action.currentUser,
        isAdmin: false,
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

    case LOGOUT_SUCCESS:
      // eslint-disable-next-line no-return-assign
      return state = {
        isAuthenticated: false,
        isLoading: false,
        isAdmin: false,
        currentUser: null,
      };

    case LOGOUT_FAILURE:
      // eslint-disable-next-line no-return-assign
      return state = {
        isAuthenticated: false,
        isLoading: false,
        isAdmin: false,
        currentUser: null,
      };

    default:
      return state;
  }
}

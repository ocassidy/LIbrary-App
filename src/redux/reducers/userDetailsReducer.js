import {
  GET_USER_ACTIVE_LOAN_DETAILS_PAGE_FAILURE,
  GET_USER_ACTIVE_LOAN_DETAILS_PAGE_SUCCESS,
  GET_USER_FAILURE,
  GET_USER_INACTIVE_LOAN_DETAILS_PAGE_FAILURE,
  GET_USER_INACTIVE_LOAN_DETAILS_PAGE_SUCCESS, GET_USER_LIST_FAILURE,
  GET_USER_LIST_SUCCESS,
  GET_USER_PAGE_FAILURE,
  GET_USER_PAGE_SUCCESS,
  GET_USER_SUCCESS,
} from '../actionTypes';

const initialState = {
  userActiveLoansDetailsPage: {},
  userInactiveLoansDetailsPage: {},
  userPage: {},
  userList: [],
  user: null,
};

export default function userDetailsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_ACTIVE_LOAN_DETAILS_PAGE_SUCCESS:
      // eslint-disable-next-line no-return-assign
      return state = {
        ...state,
        userActiveLoansDetailsPage: action.userActiveLoansDetailsPage,
      };

    case GET_USER_ACTIVE_LOAN_DETAILS_PAGE_FAILURE:
      // eslint-disable-next-line no-return-assign
      return state = {
        ...state,
        userActiveLoansDetailsPage: {},
      };

    case GET_USER_INACTIVE_LOAN_DETAILS_PAGE_SUCCESS:
      // eslint-disable-next-line no-return-assign
      return state = {
        ...state,
        userInactiveLoansDetailsPage: action.userInactiveLoansDetailsPage,
      };

    case GET_USER_INACTIVE_LOAN_DETAILS_PAGE_FAILURE:
      // eslint-disable-next-line no-return-assign
      return state = {
        ...state,
        userInactiveLoansDetailsPage: {},
      };

    case GET_USER_PAGE_SUCCESS:
      // eslint-disable-next-line no-return-assign
      return state = {
        ...state,
        userPage: action.userPage,
      };

    case GET_USER_PAGE_FAILURE:
      // eslint-disable-next-line no-return-assign
      return state = {
        ...state,
        userPage: {},
      };

    case GET_USER_LIST_SUCCESS:
      // eslint-disable-next-line no-return-assign
      return state = {
        ...state,
        userList: action.userList,
      };

    case GET_USER_LIST_FAILURE:
      // eslint-disable-next-line no-return-assign
      return state = {
        ...state,
        userList: [],
      };

    case GET_USER_SUCCESS:
      // eslint-disable-next-line no-return-assign
      return state = {
        ...state,
        user: action.user,
      };

    case GET_USER_FAILURE:
      // eslint-disable-next-line no-return-assign
      return state = {
        ...state,
        user: null,
      };

    default:
      return state;
  }
}

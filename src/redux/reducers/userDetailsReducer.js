import {
  GET_USER_ACTIVE_LOAN_DETAILS_PAGE_FAILURE,
  GET_USER_ACTIVE_LOAN_DETAILS_PAGE_SUCCESS, GET_USER_INACTIVE_LOAN_DETAILS_PAGE_FAILURE,
  GET_USER_INACTIVE_LOAN_DETAILS_PAGE_SUCCESS
} from '../actionTypes';

const initialState = {
  userActiveLoansDetailsPage: {},
  userInactiveLoansDetailsPage: {},
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

    default:
      return state;
  }
}

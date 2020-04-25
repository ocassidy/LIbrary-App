import {
  GET_USER_LOANS_ANALYTICS_SUCCESS,
  GET_USER_LOANS_ANALYTICS_FAILURE,
  GET_USER_RETURNS_ANALYTICS_SUCCESS,
  GET_USER_RETURNS_ANALYTICS_FAILURE,
} from '../actionTypes';

const initialState = {
  userLoansAnalyticsList: [],
  userReturnsAnalyticsList: [],
};

export default function userAnalyticsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_LOANS_ANALYTICS_SUCCESS:
      // eslint-disable-next-line no-return-assign
      return state = {
        ...state,
        userLoansAnalyticsList: action.userLoansAnalyticsList,
      };

    case GET_USER_LOANS_ANALYTICS_FAILURE:
      // eslint-disable-next-line no-return-assign
      return state = {
        ...state,
        userLoansAnalyticsList: [],
      };

    case GET_USER_RETURNS_ANALYTICS_SUCCESS:
      // eslint-disable-next-line no-return-assign
      return state = {
        ...state,
        userReturnsAnalyticsList: action.userReturnsAnalyticsList,
      };

    case GET_USER_RETURNS_ANALYTICS_FAILURE:
      // eslint-disable-next-line no-return-assign
      return state = {
        ...state,
        userAnalyticsList: [],
      };

    default:
      return {
        ...state,
      };
  }
}

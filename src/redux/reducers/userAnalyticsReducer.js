import {
  GET_USER_ANALYTICS_FAILURE,
  GET_USER_ANALYTICS_SUCCESS,
} from '../actionTypes';

const initialState = {
  userAnalyticsList: [],
};

export default function userAnalyticsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_ANALYTICS_SUCCESS:
      // eslint-disable-next-line no-return-assign
      return state = {
        ...state,
        userAnalyticsList: action.userAnalyticsList,
      };

    case GET_USER_ANALYTICS_FAILURE:
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

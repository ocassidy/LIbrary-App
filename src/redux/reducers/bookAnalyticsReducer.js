import {
  GET_ANALYTICS_FAILURE,
  GET_ANALYTICS_SUCCESS, GET_DATE_RANGE_ANALYTICS_FAILURE, GET_DATE_RANGE_ANALYTICS_SUCCESS,
} from '../actionTypes';

const initialState = {
  bookAnalyticsList: [],
  bookDateRangeList: [],
};

export default function bookAnalyticsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ANALYTICS_SUCCESS:
      // eslint-disable-next-line no-return-assign
      return state = {
        ...state,
        bookAnalyticsList: action.bookAnalyticsList,
      };

    case GET_ANALYTICS_FAILURE:
      // eslint-disable-next-line no-return-assign
      return state = {
        ...state,
        bookAnalyticsList: [],
      };

    case GET_DATE_RANGE_ANALYTICS_SUCCESS:
      // eslint-disable-next-line no-return-assign
      return state = {
        ...state,
        bookDateRangeList: action.bookDateRangeList,
      };

    case GET_DATE_RANGE_ANALYTICS_FAILURE:
      // eslint-disable-next-line no-return-assign
      return state = {
        ...state,
        bookDateRangeList: [],
      };

    default:
      return {
        ...state,
      };
  }
}

import {
  GET_ANALYTICS_FAILURE,
  GET_ANALYTICS_SUCCESS,
} from '../actionTypes';

const initialState = {
  bookAnalyticsList: [],
};

export default function bookAnalyticsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ANALYTICS_SUCCESS:
      console.log(action.bookAnalyticsList)
      // eslint-disable-next-line no-return-assign
      return state = {
        bookAnalyticsList: action.bookAnalyticsList,
      };

    case GET_ANALYTICS_FAILURE:
      // eslint-disable-next-line no-return-assign
      return state;

    default:
      return state;
  }
}

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import authReducer from './authReducer';
import bookReducer from './bookReducer';
import bookAnalyticsReducer from './bookAnalyticsReducer';

// eslint-disable-next-line import/prefer-default-export
export const rootReducer = (history) => combineReducers({
  router: connectRouter(history),
  userDetails: authReducer,
  bookDetails: bookReducer,
  bookAnalytics: bookAnalyticsReducer,
});

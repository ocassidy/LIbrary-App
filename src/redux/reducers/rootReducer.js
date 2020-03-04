import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import authReducer from './authReducer';
import bookListReducer from './bookListReducer';
import bookAnalyticsReducer from './bookAnalyticsReducer';
import bookReducer from './bookReducer';

// eslint-disable-next-line import/prefer-default-export
export const rootReducer = (history) => combineReducers({
  router: connectRouter(history),
  userDetails: authReducer,
  bookListDetails: bookListReducer,
  bookDetails: bookReducer,
  bookAnalytics: bookAnalyticsReducer,
});

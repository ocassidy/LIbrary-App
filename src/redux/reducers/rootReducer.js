import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import authReducer from './authReducer';

// eslint-disable-next-line import/prefer-default-export
export const rootReducer = (history) => combineReducers({
  router: connectRouter(history),
  userDetails: authReducer,
});

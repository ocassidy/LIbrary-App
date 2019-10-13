import {combineReducers} from 'redux';
import authReducer from "./authReducer";
import {connectRouter} from 'connected-react-router'

export const rootReducer = (history) => combineReducers({
  router: connectRouter(history),
  login: authReducer
});

import React from 'react';
import { render } from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { rootReducer } from './redux/reducers/rootReducer';
import * as serviceWorker from './serviceWorker';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './toastr.css';
import './index.css';

// eslint-disable-next-line import/prefer-default-export
export const history = createBrowserHistory();

const store = createStore(rootReducer(history), applyMiddleware(thunk, routerMiddleware(history)));

render(
  <Provider store={store}>
    <App history={history} />
  </Provider>,
  document.getElementById('root'),
);

serviceWorker.unregister();

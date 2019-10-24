import React, { Component } from 'react';
import './App.css';
import { Redirect, Route, Switch } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import { ConnectedRouter } from 'connected-react-router';
import LoginContainer from './redux/containers/LoginContainer';
import RegisterContainer from './redux/containers/RegisterContainer';
import HomeContainer from './redux/containers/HomeContainer';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import {API_BASE_URL} from "./constants";

export default class App extends Component {
  componentDidMount() {
    const { props } = this;
    props.onStartAppCheckForCurrentUser();
  }

  render() {
    const { props } = this;
    return (
      <div className="App" id="App">
        {(props.isLoading && props.currentUser) || props.isLoading
          ? (
            <div id="appSpinnerDiv">
              <Spinner animation="border" role="status" className="isLoadingSpinner" />
              <div>
              Loading Please Wait...
              </div>
            </div>
          )
          : (
            <ConnectedRouter history={props.history} id="baseRouter">
              <Switch id="baseRouterSwitch">
                <Redirect exact from="/" to="/login" id="baseRouteRedirectToLogin" />
                <Route exact path="/login" component={() => <LoginContainer currentUser={props.currentUser} />} id="baseRouteToLogin" />
                <Route exact path="/register" component={() => <RegisterContainer currentUser={props.currentUser} />} id="baseRouteToRegister" />
                <ProtectedRoute exact path="/user/home/:username" component={HomeContainer} id="protectedRouteToHome" />
              </Switch>
            </ConnectedRouter>
          )}
      </div>
    );
  }
}

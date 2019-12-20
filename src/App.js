import React, {Component} from 'react';
import './App.css';
import {Redirect, Route, Switch} from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import {ConnectedRouter} from 'connected-react-router';
import LoginContainer from './redux/containers/LoginContainer';
import RegisterContainer from './redux/containers/RegisterContainer';
import HomeContainer from './redux/containers/HomeContainer';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

export default class App extends Component {
  componentDidMount() {
    const {props} = this;
    props.onStartAppCheckForCurrentUser();
  }

  render() {
    const {isLoading, history} = this.props;
    return (
      <div className="App" id="App">
        {isLoading
          ?
          <div id="appSpinnerDiv">
            <Spinner animation="border" role="status" className="isLoadingSpinner"/>
            <div>
              Loading Please Wait...
            </div>
          </div>
          :
          <ConnectedRouter history={history} id="baseRouter">
            <Switch id="baseRouterSwitch">
              <Route exact path="/login"
                     component={() => <LoginContainer/>}
                     id="baseRouteToLogin"/>
              <Route exact path="/register"
                     component={() => <RegisterContainer/>}
                     id="baseRouteToRegister"/>
              <ProtectedRoute exact path="/user/home/:username" component={HomeContainer} id="protectedRouteToHome"/>
              <Redirect exact from="/"
                        to="/login"
                        id="baseRouteRedirectToLogin"/>
            </Switch>
          </ConnectedRouter>
        }
      </div>
    );
  }
}

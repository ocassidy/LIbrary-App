import React, {Component} from 'react';
import './App.css';
import {Route, Redirect, Switch} from "react-router-dom";
import LoginContainer from "./redux/containers/LoginContainer";
import RegisterContainer from "./redux/containers/RegisterContainer";
import Spinner from "react-bootstrap/Spinner";
import HomeContainer from "./redux/containers/HomeContainer";
import {ConnectedRouter} from "connected-react-router";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

export default class App extends Component {
  componentDidMount() {
    this.props.onStartAppCheckForCurrentUser();
  }

  render() {
    return (
      <div className="App">
        {this.props.isLoading && this.props.currentUser ?
          <div>
            <Spinner animation="border" role="status" className="isLoadingSpinner"/>
            <div>
              Loading Please Wait...
            </div>
          </div>
          :
          <ConnectedRouter history={this.props.history}>
            <Switch>
              <Redirect exact from="/" to="/login"/>
              <Route exact path="/login" component={() => <LoginContainer currentUser={this.props.currentUser}/>}/>
              <Route exact path="/register" component={() => <RegisterContainer currentUser={this.props.currentUser}/>}/>
              <ProtectedRoute exact path="/user/home/:username" component={HomeContainer}/>
            </Switch>
          </ConnectedRouter>
        }
      </div>
    )
  }
};

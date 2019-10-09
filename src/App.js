import React, {Component} from 'react';
import './App.css';
import {Route, BrowserRouter as Router, Redirect, Switch} from "react-router-dom";
import {ACCESS_TOKEN, API_BASE_URL} from './constants/index'
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Profile from "./components/Profile/Profile";
import axios from "axios";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

let axiosConfig = {
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  }
};

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      isAuthenticated: false,
      isLoading: false
    };
  }

  getCurrentUser = () => {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
      return Promise.reject("No access token set.");
    } else {
      return axios.get(API_BASE_URL + '/user', axiosConfig)
        .then(response => {
          console.log('inside axios getCurrentUser', response);
          this.setState({
            currentUser: response.data,
            isAuthenticated: true,
            isLoading: false
          });
          this.props.push('/user/' + this.state.currentUser)
        }).catch(error => {
          this.setState({
            isAuthenticated: false,
            isLoading: false
          });
        });
    }
  };

  loadCurrentUser() {
    this.setState({
      isLoading: true
    });
    return this.getCurrentUser();
  }

  componentDidMount() {
    if (localStorage.getItem(ACCESS_TOKEN)) {
      console.log('got access token');
      this.loadCurrentUser();
    }
  }

  handleLogout() {
    localStorage.removeItem(ACCESS_TOKEN);

    this.setState({
      currentUser: null,
      isAuthenticated: false
    });

    this.props.history.push('/');
  }

  handleLogin() {
    this.loadCurrentUser();
    this.props.history.push("/user/" + this.getCurrentUser);
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Redirect exact from="/" to="/login"/>
            <Route path="/login" exact
                   component={() => <Login handleLogin={this.handleLogin} getCurrentUser={this.getCurrentUser}/>}/>
            <Route path="/register" exact component={() => <Register getCurrentUser={this.getCurrentUser}/>}/>
            <ProtectedRoute path="/user/*" exact
                            component={(props) => <Profile {...props} getCurrentUser={this.getCurrentUser}
                                                           isAuthenticated={this.state.isAuthenticated}/>}/>
          </Switch>
        </Router>
      </div>
    )
  }
}

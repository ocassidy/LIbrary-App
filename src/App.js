import React, {Component} from 'react';
import './App.css';
import {Route, BrowserRouter as Router, Redirect, Switch} from "react-router-dom";
import Register from "./components/Register/Register";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Home from "./components/Home/Home";
import LoginContainer from "./redux/containers/LoginContainer";

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Redirect exact from="/" to="/login"/>
            <Route path="/login"
                   exact component={() => <LoginContainer />}/>
            <Route path="/register"
                   exact component={() => <Register />}/>
            <ProtectedRoute path="/user/home/*"
                            exact component={() => <Home/>}/>
          </Switch>
        </Router>
      </div>
    )
  }
};

import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { postLogin } from "../../../redux/actions/AuthActions";

export function Login(props) {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const { currentUser, onHandleLogin, onAlreadyLoggedIn } = props;

  useEffect(() => {
    if (currentUser) {
      onAlreadyLoggedIn(currentUser);
    }
  }, [currentUser, onAlreadyLoggedIn]);

  return (
    <div className="container-fluid">
      <div className="row no-gutters">
        <div className="col-12">
          <div className="h3">Login</div>
          <div className="h5">
            Please Login to use the Library System.
          </div>
        </div>
      </div>
      <Form id="loginForm" onSubmit={(e) => onHandleLogin(e, usernameOrEmail, password)}>
        <div className="row no-gutters">
          <div className="col-12">
            <Form.Label>
              Username or Email
              <span className="text-danger"> * </span>
            </Form.Label>
            <Form.Control
              id="loginUsernameInput"
              type="username"
              placeholder="Username or Email"
              required
              onChange={(e) => setUsernameOrEmail(e.target.value)}
            />
            <Form.Label>
              Password
              <span className="text-danger"> * </span>
            </Form.Label>
            <Form.Control
              id="loginPasswordInput"
              type="password"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="row no-gutters justify-content-end mt-2">
          <div className="col-sm-12 col-md-4 col-lg-auto">
            <Button id="loginButton" className="btn btn-block" variant="primary" type="submit">
              Log In
            </Button>
          </div>
        </div>
      </Form>
      <div className="row no-gutters text-center">
        <div className="col-12">
          <div id="registerLinkTo" className="mt-2">
            Need an account?
            <a href="/register"> Register Here</a>
          </div>
          <div id="booksLinkTo" className="mt-2">
            View books?
            <a href="/books"> Click Here</a>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  currentUser: state.authDetails.currentUser,
  isAuthenticated: state.authDetails.isAuthenticated,
  hasLoadedUser: state.authDetails.hasLoadedUser,
});

const mapDispatchToProps = (dispatch) => ({
  onHandleLogin: (e, usernameOrEmail, password) => {
    e.preventDefault();
    dispatch(postLogin(usernameOrEmail, password));
  },
  onAlreadyLoggedIn: (currentUser) => {
    dispatch(push(`/user/profile/${currentUser.username}`));
  },
});

export const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login);

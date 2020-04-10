import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import './Login.css';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { postLogin } from '../../../redux/actions';

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
    <div className="loginContainer">
      <h2>Login</h2>
      <div className="formInfoText">
        Please Login to use the Library System.
      </div>
      <div>
        <Form className="loginForm" onSubmit={(e) => onHandleLogin(e, usernameOrEmail, password)}>
          <Form.Label>
            Username or Email
            <span className="requiredStar"> * </span>
          </Form.Label>
          <Form.Control
            type="username"
            className="loginUsernameInput"
            placeholder="Username or Email"
            required
            onChange={(e) => setUsernameOrEmail(e.target.value)}
          />
          <Form.Label>
            Password
            <span className="requiredStar"> * </span>
          </Form.Label>
          <Form.Control
            type="password"
            className="loginPasswordInput"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button className="loginButton" variant="primary" type="submit">
            Log In
          </Button>
        </Form>
        <div className="loginLinkTo">
          Need an account?
          <a href="/register"> Register Here</a>
        </div>
        <div className="loginLinkTo">
          View books?
          <a href="/books"> Click Here</a>
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

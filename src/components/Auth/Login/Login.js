import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import './Login.css';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { postLogin } from '../../../redux/actions';

function Login(props) {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const { currentUser, onHandleLogin, onAlreadyLoggedIn } = props;

  const handleLogin = (e) => {
    e.preventDefault();
    return onHandleLogin(usernameOrEmail, password);
  };

  useEffect(() => {
    if (currentUser) {
      onAlreadyLoggedIn(currentUser);
    }
  }, [currentUser, onAlreadyLoggedIn]);

  return (
    <div className="loginForm">
      <h2>Login</h2>
      <div className="formInfoText">
        Please Login to use the Library System.
      </div>
      <div>
        <Form onSubmit={handleLogin}>
          <Form.Group controlId="loginUsernameFormGroup">
            <Form.Label>Username or Email</Form.Label>
            <Form.Control
              type="username"
              className="loginUsernameInput"
              placeholder="Username or Email"
              required
              onChange={(e) => setUsernameOrEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="loginPasswordFormGroup">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              className="loginPasswordInput"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Log In
          </Button>
        </Form>
        <div>
          Need an account?
          <a href="/register"> Register Here</a>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  currentUser: state.userDetails.currentUser,
  isAuthenticated: state.userDetails.isAuthenticated,
  hasLoadedUser: state.userDetails.hasLoadedUser,
});

const mapDispatchToProps = (dispatch) => ({
  onHandleLogin: (usernameOrEmail, password) => {
    dispatch(postLogin(usernameOrEmail, password));
  },
  onAlreadyLoggedIn: (currentUser) => {
    dispatch(push(`/user/profile/${currentUser.username}`));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

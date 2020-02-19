import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import './Login.css';
import { connect } from 'react-redux';
import { postLogin } from '../../redux/actions';

function Login(props) {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    return props.onHandleLogin(usernameOrEmail, password);
  };

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
          Don&apos; have an account?&nbsp;
          <a href="/register">Register Here</a>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

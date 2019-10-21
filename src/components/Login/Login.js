import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import './Login.css';
import { withRouter } from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameOrEmail: '',
      password: '',
    };
  }

  handleUsernameOrEmailOnChange = (e) => {
    this.setState({ usernameOrEmail: e.target.value });
  };

  handlePasswordOnChange = (e) => {
    this.setState({ password: e.target.value });
  };

  handleLogin = (e) => {
    e.preventDefault();
    const { props, state } = this;
    return props.onHandleLogin(state.usernameOrEmail, state.password);
  };

  render() {
    return (
      <div className="loginForm">
        <h2>Login</h2>
        <div className="formInfoText">
          Please Login to use the Library System.
        </div>
        <div>
          <Form onSubmit={this.handleLogin}>
            <Form.Group controlId="loginUsernameFormGroup">
              <Form.Label>Username or Email</Form.Label>
              <Form.Control
                type="username"
                className="loginUsernameInput"
                placeholder="Username or Email"
                required
                onChange={this.handleUsernameOrEmailOnChange}
              />
            </Form.Group>
            <Form.Group controlId="loginPasswordFormGroup">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                className="loginPasswordInput"
                placeholder="Password"
                required
                onChange={this.handlePasswordOnChange}
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
}

export default withRouter(Login);

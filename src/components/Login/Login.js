import React, {Component} from 'react'
import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import axios from 'axios'
import toastr from 'toastr'
import './Login.css'
import {ACCESS_TOKEN, API_BASE_URL} from "../../constants";
import {withRouter} from "react-router-dom";

let axiosConfig = {
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameOrEmail: '',
      password: ''
    }
  }

  postLogin = () => {
    return axios.post(API_BASE_URL + "/auth/login", {
        usernameOrEmail: this.state.usernameOrEmail,
        password: this.state.password
      },
      axiosConfig)
      .then(response => {
        if (response.status === 200) {
          localStorage.setItem("ACCESS_TOKEN", response.data.token);
          toastr.success('Login Successful!', 'Success');
          this.props.history.push('/user/' + this.props.getCurrentUser);
        }
        else {
          toastr.error('User Does Not Exist', 'Error');
        }
      })
      .catch(error => {
        toastr.error(error.message, 'Error')
      })
  };

  handleLogin = (e) => {
    e.preventDefault();
    return this.postLogin();
  };

  handleUsernameOrEmailOnChange = (e) => {
    this.setState({usernameOrEmail: e.target.value})
  };

  handlePasswordOnChange = (e) => {
    this.setState({password: e.target.value})
  };

  componentDidMount() {
    if (localStorage.getItem(ACCESS_TOKEN)) {
      this.loadCurrentUser();
    }
  }

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
              <Form.Control type="username"
                            className="loginUsernameInput"
                            placeholder="Username or Email"
                            required
                            onChange={this.handleUsernameOrEmailOnChange}/>
            </Form.Group>
            <Form.Group controlId="loginPasswordFormGroup">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password"
                            className="loginPasswordInput"
                            placeholder="Password"
                            required
                            onChange={this.handlePasswordOnChange}/>
            </Form.Group>
            <Button variant="primary" type="submit">
              Log In
            </Button>
          </Form>
          <div>Don't have an account?&nbsp;
            <a href="/register">Register Here</a>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
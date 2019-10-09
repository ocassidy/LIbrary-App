import React, {Component} from 'react'
import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {API_BASE_URL} from "../../constants";
import axios from "axios";
import toastr from "toastr";
import './Register.css'

let axiosConfig = {
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  }
};

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      username: '',
      password: '',
      retypePassword: '',
      email: ''
    }
  }

  postRegister = () => {
    if (this.state.password !== this.state.retypePassword) {
      toastr.error('Passwords do not match', 'Error');
    } else {
      return axios.post(API_BASE_URL + "/auth/register", {
          name: this.state.name,
          username: this.state.username,
          password: this.state.password,
          email: this.state.email
        },
        axiosConfig)
        .then(response => {
          if (response.data.success === false) {
            toastr.error(response.data.message, 'Error');
          } else {
            toastr.success(response.data.message, 'Success');
            this.props.history.push(`/user/${this.state.username}`);
          }
        })
        .catch(error => {
          toastr.error(error.message, 'Error')
        })
    }
  }

  handleRegister = (e) => {
    e.preventDefault();
    return this.postRegister();
  };

  handleUsernameOnChange = (e) => {
    this.setState({username: e.target.value});
  };

  handleNameOnChange = (e) => {
    this.setState({name: e.target.value});
  };

  handlePasswordOnChange = (e) => {
    this.setState({password: e.target.value});
  };

  handleRetypePasswordOnChange = (e) => {
    this.setState({retypePassword: e.target.value});
  };

  handleEmailOnChange = (e) => {
    this.setState({email: e.target.value});
  };

  render() {
    return (
      <div className="registerForm">
        <h2>Register</h2>
        <div>
          <Form onSubmit={this.handleRegister}>
            <Form.Group controlId="registerUsernameFormGroup">
              <Form.Label>Username</Form.Label>
              <Form.Control type="username"
                            className="registerUsernameInput"
                            placeholder="Username"
                            required
                            onChange={this.handleUsernameOnChange}/>
            </Form.Group>
            <Form.Group controlId="registerFullNameFormGroup">
              <Form.Label>Full Name</Form.Label>
              <Form.Control type="username"
                            className="registerFullNameInput"
                            placeholder="Full Name"
                            required
                            onChange={this.handleNameOnChange}/>
            </Form.Group>
            <Form.Group controlId="registerEmailFormGroup">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email"
                            className="registerEmailInput"
                            placeholder="Email"
                            required
                            onChange={this.handleEmailOnChange}/>
            </Form.Group>
            <Form.Group controlId="registerPasswordFormGroup">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password"
                            className="registerPasswordInput"
                            placeholder="Password"
                            required
                            onChange={this.handlePasswordOnChange}/>
            </Form.Group>
            <Form.Group controlId="registerPasswordFormGroup">
              <Form.Label>Retype Password</Form.Label>
              <Form.Control type="password"
                            className="registerRetypePasswordInput"
                            placeholder="Retype Password"
                            required
                            onChange={this.handleRetypePasswordOnChange}/>
            </Form.Group>
            <Button variant="primary" type="submit">
              Register
            </Button>
          </Form>
          <div>Already have an account?&nbsp;
            <a href="/login">Sign in</a>
          </div>
        </div>
      </div>
    );
  }
}
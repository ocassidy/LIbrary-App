import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import toastr from 'toastr';
import './Register.css';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { postRegister } from '../../redux/actions';

function Register(props) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const { currentUser, onHandleRegister, onAlreadyLoggedIn } = props;

  const handleRegister = (e) => {
    e.preventDefault();

    if (password !== retypePassword) {
      return toastr.error('Passwords do not match!', 'Error', { timeOut: 5000 });
    }

    const registerRequest = {
      username,
      firstName,
      lastName,
      password,
      email,
    };
    return onHandleRegister(registerRequest);
  };

  useEffect(() => {
    if (currentUser) {
      onAlreadyLoggedIn(currentUser);
    }
  }, [currentUser, onAlreadyLoggedIn]);

  return (
    <div className="registerForm">
      <h2>Register</h2>
      <div>
        <div>
          Please Register to use the library system.
        </div>
        <Form onSubmit={handleRegister}>
          <Form.Group controlId="registerUsernameFormGroup">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="username"
              className="registerUsernameInput"
              placeholder="Username"
              required
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="registerLastNameFormGroup">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="username"
              className="registerFirstNameInput"
              placeholder="First Name"
              required
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="registerLastNameFormGroup">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="username"
              className="registerLastNameInput"
              placeholder="Last Name"
              required
              onChange={(e) => setLastName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="registerEmailFormGroup">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              className="registerEmailInput"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="registerPasswordFormGroup">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              className="registerPasswordInput"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="registerPasswordFormGroup">
            <Form.Label>Retype Password</Form.Label>
            <Form.Control
              type="password"
              className="registerRetypePasswordInput"
              placeholder="Retype Password"
              required
              onChange={(e) => setRetypePassword(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Register
          </Button>
        </Form>
        <div>
          Already have an account?
          <a href="/login"> Sign in</a>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  currentUser: state.userDetails.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  onHandleRegister: (registerRequest) => {
    dispatch(postRegister(registerRequest));
  },
  onAlreadyLoggedIn: (currentUser) => {
    dispatch(push(`/user/profile/${currentUser.username}`));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);

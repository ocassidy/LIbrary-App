import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import toastr from 'toastr';
import './Register.css';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { postRegister } from '../../../redux/actions';

export function Register(props) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const { currentUser, onHandleRegister, onAlreadyLoggedIn } = props;

  useEffect(() => {
    if (currentUser) {
      onAlreadyLoggedIn(currentUser);
    }
  }, [currentUser, onAlreadyLoggedIn]);

  return (
    <div className="registerContainer">
      <h2>Register</h2>
      <div>
        <div>
          Please Register to use the library system.
        </div>
        <Form className="registerForm" onSubmit={(e) => onHandleRegister(username, email, password, retypePassword, firstName, lastName, e)}>
          <Form.Group controlId="registerFormGroup">
            <Form.Label>
              Username
              <span className="requiredStar"> * </span>
            </Form.Label>
            <Form.Control
              type="username"
              className="registerUsernameInput"
              placeholder="Username"
              required
              onChange={(e) => setUsername(e.target.value)}
            />
            <Form.Label>
              First Name
              <span className="requiredStar"> * </span>
            </Form.Label>
            <Form.Control
              type="username"
              className="registerFirstNameInput"
              placeholder="First Name"
              required
              onChange={(e) => setFirstName(e.target.value)}
            />
            <Form.Label>
              Last Name
              <span className="requiredStar"> * </span>
            </Form.Label>
            <Form.Control
              type="username"
              className="registerLastNameInput"
              placeholder="Last Name"
              required
              onChange={(e) => setLastName(e.target.value)}
            />
            <Form.Label>
              Email
              <span className="requiredStar"> * </span>
            </Form.Label>
            <Form.Control
              type="email"
              className="registerEmailInput"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Label>
              Password
              <span className="requiredStar"> * </span>
            </Form.Label>
            <Form.Control
              type="password"
              className="registerPasswordInput"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <Form.Label>
              Retype Password
              <span className="requiredStar"> * </span>
            </Form.Label>
            <Form.Control
              type="password"
              className="registerRetypePasswordInput"
              placeholder="Retype Password"
              required
              onChange={(e) => setRetypePassword(e.target.value)}
            />
          </Form.Group>
          <Button className="registerFormButton" variant="primary" type="submit">
            Register
          </Button>
        </Form>
        <div className="linkTo">
          Already have an account?
          <a href="/login"> Sign in</a>
        </div>
        <div className="linkTo">
          View books?
          <a href="/books"> Click Here</a>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  currentUser: state.authDetails.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  onHandleRegister: (username, email, password, retypePassword, firstName, lastName, e) => {
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

    return dispatch(postRegister(registerRequest));
  },
  onAlreadyLoggedIn: (currentUser) => {
    dispatch(push(`/user/profile/${currentUser.username}`));
  },
});

export const RegisterContainer = connect(mapStateToProps, mapDispatchToProps)(Register);

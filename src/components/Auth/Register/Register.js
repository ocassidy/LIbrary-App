import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import toastr from 'toastr';
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
    <div id="registerContainer" className="container-fluid">
      <div className="row no-gutters">
        <div className="col-12">
          <div className="h3">Register</div>
          <div className="h5">
            Please Register to use the Library System.
          </div>
        </div>
      </div>
      {/* eslint-disable-next-line max-len */}
      <Form id="registerForm" onSubmit={(e) => onHandleRegister(username, email, password, retypePassword, firstName, lastName, e)}>
        <div className="row no-gutters">
          <div className="col-12">
            <Form.Label>
              Username
              <span className="text-danger"> * </span>
            </Form.Label>
            <Form.Control
              id="registerUsernameInput"
              type="text"
              className="registerUsernameInput"
              placeholder="Username"
              required
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="col-sm-12 col-md-5 col-lg-5 mr-auto">
            <Form.Label>
              First Name
              <span className="text-danger"> * </span>
            </Form.Label>
            <Form.Control
              id="registerFirstNameInput"
              type="text"
              className="registerFirstNameInput"
              placeholder="First Name"
              required
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="col-sm-12 col-md-5 col-lg-5">
            <Form.Label>
              Last Name
              <span className="text-danger"> * </span>
            </Form.Label>
            <Form.Control
              id="registerLastNameInput"
              type="text"
              className="registerLastNameInput"
              placeholder="Last Name"
              required
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="col-12">
            <Form.Label>
              Email
              <span className="text-danger"> * </span>
            </Form.Label>
            <Form.Control
              id="registerEmailInput"
              type="email"
              className="registerEmailInput"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="col-12">
            <Form.Label>
              Password
              <span className="text-danger"> * </span>
            </Form.Label>
            <Form.Control
              id="registerPasswordInput"
              type="password"
              className="registerPasswordInput"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="col-12">
            <Form.Label>
              Retype Password
              <span className="text-danger"> * </span>
            </Form.Label>
            <Form.Control
              id="registerRetypePasswordInput"
              type="password"
              className="registerRetypePasswordInput"
              placeholder="Retype Password"
              required
              onChange={(e) => setRetypePassword(e.target.value)}
            />
          </div>
        </div>
        <div className="row no-gutters justify-content-end mt-2">
          <div className="col-sm-12 col-md-4 col-lg-auto">
            <Button id="registerFormButton" className="btn btn-primary btn-block" variant="primary" type="submit">
              Register
            </Button>
          </div>
        </div>
      </Form>
      <div className="row no-gutters text-center">
        <div className="col-12">
          <div id="loginLinkTo" className="mt-2">
            Have an account?
            <a href="/login"> Login Here</a>
          </div>
          <div id="bookLinkTo" className="mt-2">
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

import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import toastr from 'toastr';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { postRegister } from '../../../redux/actions/AuthActions';

export function Register(props) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [gender, setGender] = useState('M');
  const [city, setCity] = useState('');
  const [contactNumber, setContactNumber] = useState('');
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
      <Form
        id="registerForm"
        onSubmit={(e) => onHandleRegister(
          e, username, email, password,
          retypePassword, firstName, lastName,
          address1, address2, city, contactNumber, gender,
        )}
      >
        <div className="row">
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
          <div className="col-sm-12 col-md-6 col-lg-6">
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
          <div className="col-sm-12 col-md-6 col-lg-6">
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
          <div className="col-sm-12 col-md-6 col-lg-6 mb-2">
            <div className="mb-2 font-weight-bold">User Address 1:</div>
            <Form.Control
              type="text"
              placeholder="User Address 1..."
              required
              onChange={(e) => setAddress1(e.target.value)}
            />
          </div>
          <div className="col-sm-12 col-md-6 col-lg-6 mb-2">
            <div className="mb-2 font-weight-bold">User Address 2:</div>
            <Form.Control
              type="text"
              placeholder="User Address 2..."
              onChange={(e) => setAddress2(e.target.value)}
            />
          </div>
          <div className="col-12">
            <div className="mb-2 font-weight-bold">City:</div>
            <Form.Control
              type="text"
              placeholder="City..."
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="col-6">
            <div className="mb-2 font-weight-bold">Gender:</div>
            <Form.Control
              as="select"
              type="text"
              placeholder="Gender..."
              required
              onChange={(e) => setGender(e.target.value)}
            >
              <option>M</option>
              <option>F</option>
            </Form.Control>
          </div>
          <div className="col-6">
            <div className="mb-2 font-weight-bold">Contact Number:</div>
            <Form.Control
              type="text"
              placeholder="Contact Number..."
              onChange={(e) => setContactNumber(e.target.value)}
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
              placeholder="Password..."
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
              placeholder="Retype Password..."
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
  onHandleRegister: (e, username, email, password,
    retypePassword, firstName, lastName, address1,
    address2, city, contactNumber, gender) => {
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
      address1,
      address2,
      city,
      contactNumber,
      gender,
    };

    return dispatch(postRegister(registerRequest));
  },
  onAlreadyLoggedIn: (currentUser) => {
    dispatch(push(`/user/profile/${currentUser.username}`));
  },
});

export const RegisterContainer = connect(mapStateToProps, mapDispatchToProps)(Register);

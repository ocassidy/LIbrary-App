import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import moment from 'moment';
import { getUser, putUser } from '../../../redux/actions/AdminActions';

function AdminUserDetails(props) {
  const { username } = useParams();
  const [roles, setRoles] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address1, setAddress] = useState('');
  const [address2, setAddress2] = useState('');
  const [gender, setGender] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [city, setCity] = useState('');
  const { user, handleGetUser, onPutUser } = props;

  useEffect(() => {
    handleGetUser(username);
  }, [username, handleGetUser]);

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setContactNumber(user.contactNumber);
      setGender(user.gender);
      setAddress(user.address1);
      setCity(user.city);
    }
  }, [user]);

  return (
    <div className="container-fluid">
      {user
        ? (
          <Form onSubmit={(e) => onPutUser(e, user.id, user.username, firstName, lastName,
            address1, address2, city, contactNumber, gender)}
          >
            <div className="row justify-content-start align-content-start">
              <div className="col-sm-12 col-md-4 col-lg-4 mb-2 h4">
                <span className="mb-2 font-weight-bold">User ID: </span>
                <span>{user.id}</span>
              </div>
              <div className="col-sm-12 col-md-4 col-lg-4 mb-2 h4">
                <span className="mb-2 font-weight-bold">Username: </span>
                <span>{user.username}</span>
              </div>
              <div className="col-sm-12 col-md-4 col-lg-4 mb-2 h4">
                <span className="mb-2 font-weight-bold">Email: </span>
                <span>{user.email}</span>
              </div>
              <div className="col-sm-12 col-md-12 col-lg-12 mb-2 h4">
                <span className="mb-2 font-weight-bold">Registration Date: </span>
                <span>{moment(user.registrationDate).format('DD-MM-YYYY')}</span>
              </div>
              <div className="col-sm-12 col-md-6 col-lg-6 mb-2">
                <div className="mb-2 font-weight-bold">User Firstname:</div>
                <Form.Control
                  value={firstName || ''}
                  type="text"
                  placeholder="Firstname"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="col-sm-12 col-md-6 col-lg-6 font-weight-bold mb-2">
                <div className="mb-2 font-weight-bold">Lastname:</div>
                <Form.Control
                  value={lastName || ''}
                  type="text"
                  placeholder="Lastname"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="col-sm-12 col-md-6 col-lg-6 mb-2">
                <div className="mb-2 font-weight-bold">User Address 1:</div>
                <Form.Control
                  value={address1 || ''}
                  type="text"
                  placeholder="User Address 1..."
                  required
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="col-sm-12 col-md-6 col-lg-6 mb-2">
                <div className="mb-2 font-weight-bold">User Address 2:</div>
                <Form.Control
                  value={address2 || ''}
                  type="text"
                  placeholder="User Address 2..."
                  onChange={(e) => setAddress2(e.target.value)}
                />
              </div>
              <div className="col-12">
                <div className="mb-2 font-weight-bold">City:</div>
                <Form.Control
                  value={city || ''}
                  type="text"
                  placeholder="Contact Number..."
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className="col-6">
                <div className="mb-2 font-weight-bold">Gender:</div>
                <Form.Control
                  as="select"
                  value={gender || ''}
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
                  value={contactNumber || ''}
                  type="text"
                  placeholder="Contact Number..."
                  onChange={(e) => setContactNumber(e.target.value)}
                />
              </div>
              <div className="col-sm-12 col-md-6 col-lg-2 mt-2">
                <Button className="btn btn-block" variant="primary" type="submit">
                  Save Changes
                </Button>
              </div>
            </div>
          </Form>
        )
        : null}
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.userDetails.user,
});

const mapDispatchToProps = (dispatch) => ({
  handleGetUser: (username) => {
    dispatch(getUser(username));
  },
  onPutUser: (e, id, username, firstName, lastName,
    address1, address2, city, contactNumber, gender) => {
    e.preventDefault();

    const editUserRequest = {
      id,
      username,
      firstName,
      lastName,
      address1,
      address2,
      city,
      contactNumber,
      gender,
    };
    dispatch(putUser(editUserRequest));
    dispatch(push('/admin/users'));
    window.location.reload();
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminUserDetails);

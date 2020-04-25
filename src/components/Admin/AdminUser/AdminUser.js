import React from 'react';
import { connect } from 'react-redux';
import { Button, Card } from 'react-bootstrap';
import moment from 'moment';
import { push } from 'connected-react-router';
import { getUserPage } from '../../../redux/actions/AdminActions';

function AdminUser(props) {
  const { userPage, gotoUserDetailsPage } = props;

  const userPageList = (userPage
    && userPage.content
    && userPage.content.length > 0)
    ? userPage.content.map((user) => (
      <Card key={user.id} className="mt-2 mb-2 text-left">
        <div className="card-text m-2 h4">
          <span className="font-weight-bold">User ID: </span>
          {user.id}
        </div>
        <div className="card-text m-2 h4">
          <span className="font-weight-bold">Username: </span>
          {user.username}
        </div>
        <div className="card-text m-2 row">
          <span className="font-weight-bold h5">User Roles: </span>
          {user.roles.map((role, index) => (
            <div key={role.id} className="ml-2">
              <span>{index + 1}. {role.role}</span>
            </div>
          ))}
        </div>
        <div className="card-text m-2">
          <span className="font-weight-bold">User Firstname: </span>
          {user.firstName}
        </div>
        <div className="card-text m-2">
          <span className="font-weight-bold">User Lastname: </span>
          {user.lastName}
        </div>
        <div className="m-2">
          <span className="font-weight-bold">Registration Date: </span>
          {moment(user.registrationDate).format('DD-MM-YYYY')}
        </div>
        <div className="card-text m-2">
          <span className="font-weight-bold">User Address: </span>
          {user.address1}
        </div>
        <div className="card-text m-2">
          <span className="font-weight-bold">User Gender: </span>
          {user.gender}
        </div>
        <div className="card-text m-2">
          <span className="font-weight-bold">User Contact Number: </span>
          {user.contactNumber}
        </div>
        <Button
          className="m-2"
          variant="info"
          type="submit"
          onClick={() => gotoUserDetailsPage(user)}
        >
          View User Details
        </Button>
      </Card>
    ))
    : (
      <div>
        No users found.
      </div>
    );

  return (
    <div className="container-fluid">
      {userPageList}
    </div>
  );
}

const mapStateToProps = (state) => ({
  userPage: state.userDetails.userPage,
});

const mapDispatchToProps = (dispatch) => ({
  handleGetUserPage: (page, size) => {
    dispatch(getUserPage(page, size));
  },
  gotoUserDetailsPage: (user) => {
    dispatch(push(`/admin/user/${user.username}`));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminUser);

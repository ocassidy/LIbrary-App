import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  Button, Card, FormControl, FormLabel, Pagination,
} from 'react-bootstrap';
import moment from 'moment';
import { push } from 'connected-react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSync } from '@fortawesome/free-solid-svg-icons';
import { getUserList, getUserPage } from '../../../redux/actions/AdminActions';

function AdminUser(props) {
  const [pagedUsers, setPagedUsers] = useState({});
  const [isSearchActive, setIsSearchActiveActive] = useState(false);
  const [isPaginationActive, setIsPaginationActive] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [numItemsPerPage, setNumItemsPerPage] = useState(5);
  const {
    userPage, gotoUserDetailsPage, handleGetUserPage, handleGetUserList, userList,
  } = props;

  useEffect(() => {
    if (userPage.content) {
      setPagedUsers(userPage.content);
    }
    if (userPage.totalPages) {
      setTotalPages(userPage.totalPages);
    }
  }, [userPage, userList]);

  const users = (pagedUsers
    && pagedUsers.length > 0)
    ? pagedUsers.map((user) => (
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

  const handleSearchChange = (e) => {
    let currentList = [];
    let filteredList = [];
    e.target.value.toLowerCase();

    if (e.target.value !== '') {
      currentList = userList;
      filteredList = currentList.filter((user) => {
        const username = user.username.toLowerCase();
        const filter = e.target.value.toLowerCase();
        setIsPaginationActive(false);
        return username.includes(filter);
      });
    } else {
      setIsPaginationActive(true);
      filteredList = userPage.content;
    }
    setPagedUsers(filteredList);
  };

  const search = (
    <div className="row no-gutters">
      <FormLabel className="col-auto m-1 h2">Search:</FormLabel>
      <FormControl
        className="m-1"
        onChange={(e) => handleSearchChange(e)}
        placeholder="Start typing a book name to search..."
        aria-label="Start typing a book name to search..."
        aria-describedby="search-input"
      />
    </div>
  );

  const paginationItemsPerPage = (
    <div className="row no-gutters justify-content-end align-items-center mt-2 mb-2">
      <div className="col-auto ml-2">
        Items Per Page:
      </div>
      <div className="col-auto ml-2">
        <Button
          onClick={() => {
            setNumItemsPerPage(5);
            handleGetUserPage(0, 5);
          }}
          variant="light"
        >
          5
        </Button>
      </div>
      <div className="col-auto ml-2">
        <Button
          onClick={() => {
            setNumItemsPerPage(10);
            handleGetUserPage(0, 10);
          }}
          variant="light"
        >
          10
        </Button>
      </div>
      <div className="col-auto ml-2">
        <Button
          onClick={() => {
            setNumItemsPerPage(20);
            handleGetUserPage(0, 20);
          }}
          variant="light"
        >
          20
        </Button>
      </div>
    </div>
  );

  const paginationItems = [];
  // eslint-disable-next-line no-plusplus
  for (let number = 1; number <= totalPages; number++) {
    paginationItems.push(
      <Pagination.Item key={number} onClick={() => handleGetUserPage(number - 1, numItemsPerPage)}>
        {number}
      </Pagination.Item>,
    );
  }

  const pagination = (
    <div className="mr-5">
      <Pagination>{paginationItems}</Pagination>
    </div>
  );

  return (
    <div className="container-fluid text-justify">
      {userPage && userList
        ? (
          <div className="row no-gutters">
            <div className="col-12 mr-2">
              <Button
                onClick={() => setIsSearchActiveActive(!isSearchActive)}
                variant="light"
                className="mr-2"
              >
                Search
                <FontAwesomeIcon icon={faSearch} className="ml-2" />
              </Button>
              <Button
                onClick={() => {
                  handleGetUserList();
                  handleGetUserPage(0, 5);
                }}
                variant="light"
                className="mr-2"
              >
                Refresh
                <FontAwesomeIcon icon={faSync} className="ml-2" />
              </Button>
            </div>
            <div className="col-12">{paginationItemsPerPage}</div>
            <div className="col-12">{isSearchActive ? search : null}</div>
          </div>
        ) : null}
      {users}
      {totalPages > 1 && isPaginationActive ? pagination : null}
    </div>
  );
}

const mapStateToProps = (state) => ({
  userPage: state.userDetails.userPage,
  userList: state.userDetails.userList,
});

const mapDispatchToProps = (dispatch) => ({
  handleGetUserPage: (page, size) => {
    dispatch(getUserPage(page, size));
  },
  gotoUserDetailsPage: (user) => {
    dispatch(push(`/admin/user/${user.username}`));
  },
  handleGetUserList: () => {
    dispatch(getUserList());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminUser);

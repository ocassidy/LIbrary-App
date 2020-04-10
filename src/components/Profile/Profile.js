import React, { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { connect } from 'react-redux';
import { Button, Card, Pagination } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import toastr from 'toastr';
import axios from 'axios';
import { getUserActiveLoanDetailsPage, getUserInactiveLoanDetailsPage } from '../../redux/actions';
import './Profile.css';
import { API_BASE_URL } from '../../constants/constants';

export function Profile(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [totalActiveLoanPages, setTotalActiveLoanPages] = useState(0);
  const [totalInactiveLoanPages, setTotalInactiveLoanPages] = useState(0);
  const [showActiveLoans, setShowActiveLoans] = useState(0);
  const [showInactiveLoans, setShowInactiveLoans] = useState(0);
  const [numItemsPerPage] = useState(5);
  const {
    currentUser,
    handleGetUserActiveLoanDetailsPage,
    handleGetUserInactiveLoanDetailsPage,
    userActiveLoansDetailsPage,
    userInactiveLoansDetailsPage,
  } = props;

  useEffect(() => {
    setIsLoading(false);
    handleGetUserActiveLoanDetailsPage(currentUser.username, 0, 5);
    handleGetUserInactiveLoanDetailsPage(currentUser.username, 0, 5);
    if (userActiveLoansDetailsPage.totalPages) {
      setTotalActiveLoanPages(userActiveLoansDetailsPage.totalPages);
    }
    if (userInactiveLoansDetailsPage.totalPages) {
      setTotalInactiveLoanPages(userInactiveLoansDetailsPage.totalPages);
    }
  }, [currentUser,
    handleGetUserActiveLoanDetailsPage,
    handleGetUserInactiveLoanDetailsPage,
    userActiveLoansDetailsPage.totalPages,
    userInactiveLoansDetailsPage.totalPages]);

  const postLoanReturnRequest = (username, loanId, bookId) => {
    axios.post(`${API_BASE_URL}/book/return`, { username, loanId, bookId },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
        },
      })
      .then((response) => {
        toastr.success('Return Successful, this book is now returned.', 'Success');
        window.location.reload();
        return response.data;
      })
      .catch((error) => {
        if (error.response === undefined) {
          return toastr.error('Failed to connect to server, please try again later', 'Error');
        }
        return toastr.error(error.response.data.message);
      });
  };

  const userActiveLoansList = (userActiveLoansDetailsPage
    && userActiveLoansDetailsPage.content
    && userActiveLoansDetailsPage.content.length > 0)
    ? userActiveLoansDetailsPage.content.map((loan) => (
      <Card key={loan.loanId} className="m-2 text-left">
        {loan.image ? <div className="m-2">{loan.image}</div> : null}
        <h5 className="card-title m-2">{loan.bookName}</h5>
        <div className="card-text m-2">
          <span className="font-weight-bold">Book ID: </span>
          {loan.bookId}
        </div>
        <div className="m-2">
          <span className="font-weight-bold">Date Withdrawn: </span>
          {moment(loan.dateWithdrawn).format('DD-MM-YYYY')}
        </div>
        <div className="m-2">
          <span className="font-weight-bold">Date Due Back: </span>
          {moment(loan.dateDueBack).format('DD-MM-YYYY')}
        </div>
        <div className="m-2">{loan.fine > 0 ? loan.fine : 'You have no fines for this loan.'}</div>
        {loan.fine === true
          ? (
            <div className="m-2">
              <h4>Cost Per Day:</h4>
              {loan.costPerDay}
            </div>
          ) : null}
        {loan.overdueBy ? <div className="m-2">Overdue by (days): {loan.overdueBy}</div> : null}
        <div className="m-2">Loan Active</div>
        <Button
          className="m-2"
          variant="success"
          type="submit"
          onClick={() => postLoanReturnRequest(currentUser.username, loan.loanId, loan.bookId)}
        >
          Return Book
        </Button>
      </Card>
    ))
    : (
      <div>
        You currently have no loans.
      </div>
    );

  const userInactiveLoansList = (userInactiveLoansDetailsPage
    && userInactiveLoansDetailsPage.content
    && userInactiveLoansDetailsPage.content.length > 0)
    ? userInactiveLoansDetailsPage.content.map((loan) => (
      <Card key={loan.loanId} className="m-2 text-left">
        {loan.image ? <div className="m-2">{loan.image}</div> : null}
        <h5 className="card-title m-2">{loan.bookName}</h5>
        <div className="card-text m-2">
          <span className="font-weight-bold">Book ID: </span>
          {loan.bookId}
        </div>
        <div className="m-2">
          <span className="font-weight-bold">Date Withdrawn: </span>
          {moment(loan.dateWithdrawn).format('DD-MM-YYYY')}
        </div>
        <div className="m-2">
          <span className="font-weight-bold">Date Due Back: </span>
          {moment(loan.dateDueBack).format('DD-MM-YYYY')}
        </div>
        {loan.dateReturned
          ? (
            <div className="m-2">
              <span className="font-weight-bold">Date Returned: </span>
              {moment(loan.dateReturned).format('DD-MM-YYYY')}
            </div>
          )
          : null}
        <div className="m-2">Loan Inactive</div>
      </Card>
    ))
    : (
      <div>
        You currently have no loans.
      </div>
    );

  const paginationActiveLoans = [];
  // eslint-disable-next-line no-plusplus
  for (let number = 1; number <= totalActiveLoanPages; number++) {
    paginationActiveLoans.push(
      <Pagination.Item
        key={number}
        onClick={() => handleGetUserActiveLoanDetailsPage(currentUser.username, number - 1, numItemsPerPage)}
      >
        {number}
      </Pagination.Item>,
    );
  }

  const activeLoanPagination = (
    <div className="userLoansPagination">
      <Pagination>{paginationActiveLoans}</Pagination>
    </div>
  );

  const paginationInactiveLoans = [];
  // eslint-disable-next-line no-plusplus
  for (let number = 1; number <= totalActiveLoanPages; number++) {
    paginationInactiveLoans.push(
      <Pagination.Item
        key={number}
        onClick={() => handleGetUserInactiveLoanDetailsPage(currentUser.username, number - 1, numItemsPerPage)}
      >
        {number}
      </Pagination.Item>,
    );
  }

  const inactiveLoanPagination = (
    <div className="userLoansPagination">
      <Pagination>{paginationInactiveLoans}</Pagination>
    </div>
  );

  return (
    <div id="profileContainer" className="container-fluid">
      {isLoading && !currentUser
        ? (
          <div id="profileSpinner" className="text-center">
            <Spinner animation="border" role="status" />
            <div>
              Loading Please Wait...
            </div>
          </div>
        )
        : (
          <div className="row no-gutters">
            {currentUser
              ? (
                <div id="userDetailsContainer" className="col-auto mr-4">
                  <h2 id="userDetailsUsername">Hi {currentUser.username}</h2>
                  <div id="userDetailsTitle">Your user details:</div>
                  <div id="userDetailsFirstName">Firstname: {currentUser.firstName}</div>
                  <div id="userDetailsLastName">Lastname: {currentUser.lastName}</div>
                  <div id="userDetailsEmail">Email: {currentUser.email}</div>
                </div>
              )
              : null}
            <div className="col-auto">
              <h2 className="col-auto">Your Loan Details:</h2>
              <div className="row no-gutters">
                <div className="col-auto">
                  <Button
                    onClick={() => setShowActiveLoans(!showActiveLoans)}
                    variant="light"
                    className="m-2"
                  >
                    {showActiveLoans ? 'Close Active Loans' : 'See Active Loans'}
                    {showActiveLoans
                      ? <FontAwesomeIcon icon={faCaretUp} style={{ marginLeft: 10 }} />
                      : <FontAwesomeIcon icon={faCaretDown} style={{ marginLeft: 10 }} />}
                  </Button>
                  {showActiveLoans ? (
                    <div>
                      {userActiveLoansList ? <h5 className="text-left m-2">Your Active Loans:</h5> : null}
                      {userActiveLoansList}
                      {totalActiveLoanPages > 1 ? activeLoanPagination : null}
                    </div>
                  ) : null}
                </div>
                <div className="col-auto">
                  <Button
                    onClick={() => setShowInactiveLoans(!showInactiveLoans)}
                    variant="light"
                    className="m-2"
                  >
                    {showInactiveLoans ? 'Close Inactive Loans' : 'See Inactive Loans'}
                    {showInactiveLoans
                      ? <FontAwesomeIcon icon={faCaretUp} className="ml-2" />
                      : <FontAwesomeIcon icon={faCaretDown} className="ml-2" />}
                  </Button>
                  {showInactiveLoans
                    ? (
                      <div>
                        {userInactiveLoansList ? <h5 className="text-left m-2">Your Inactive Loans:</h5> : null}
                        {userInactiveLoansList}
                        {totalInactiveLoanPages > 1 ? inactiveLoanPagination : null}
                      </div>
                    ) : null}
                </div>
              </div>
            </div>
          </div>
        )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  currentUser: state.authDetails.currentUser,
  isAuthenticated: state.authDetails.isAuthenticated,
  isLoading: state.authDetails.isLoading,
  userActiveLoansDetailsPage: state.userDetails.userActiveLoansDetailsPage,
  userInactiveLoansDetailsPage: state.userDetails.userInactiveLoansDetailsPage,
});


const mapDispatchToProps = (dispatch) => ({
  handleGetUserActiveLoanDetailsPage: (username, page, size) => {
    dispatch(getUserActiveLoanDetailsPage(username, page, size));
  },
  handleGetUserInactiveLoanDetailsPage: (username, page, size) => {
    dispatch(getUserInactiveLoanDetailsPage(username, page, size));
  },
});

export const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(Profile);

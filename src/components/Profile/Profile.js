import React, { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { connect } from 'react-redux';
import { Button, Card, Pagination } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import toastr from 'toastr';
import axios from 'axios';
import { API_BASE_URL } from '../../constants/constants';
import { getUserActiveLoanDetailsPage, getUserInactiveLoanDetailsPage } from '../../redux/actions/UserActions';

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

  const postLoanExtendRequest = (bookId, loanId, username, lengthOfExtension) => {
    axios.post(`${API_BASE_URL}/book/loan-extend`, {
      bookId, loanId, username, lengthOfExtension,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
      },
    })
      .then((response) => {
        console.log(loanId)
        toastr.success(response.data.message, 'Success', { timeOut: 100000 });
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
      <Card key={loan.loanId} className="mt-2 mb-2 text-left">
        {loan.image ? <div className="m-2">{loan.image}</div> : null}
        <div className="card-title m-2 h5">{loan.bookName}</div>
        <div className="card-text m-2">
          <span className="font-weight-bold">Book ID: </span>
          {loan.bookId}
        </div>
        <div className="card-text m-2">
          <span className="font-weight-bold">Loan ID: </span>
          {loan.loanId}
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
        <div className="m-2">{loan.beenExtended ? 'Loan Has Extension' : null}</div>
        {!loan.beenExtended
          ? (
            <Button
              className="m-2"
              variant="success"
              type="submit"
              onClick={() => postLoanExtendRequest(
                loan.bookId, loan.loanId, currentUser.username, 1,
              )}
            >
              Extend Loan by 1 Month
            </Button>
          ) : null}
        {!loan.beenExtended
          ? (
            <Button
              className="m-2"
              variant="success"
              type="submit"
              onClick={() => postLoanExtendRequest(
                loan.bookId, loan.loanId, currentUser.username, 2,
              )}
            >
              Extend Loan by 2 Months
            </Button>
          ) : null}
        {!loan.beenExtended
          ? (
            <Button
              className="m-2"
              variant="success"
              type="submit"
              onClick={() => postLoanExtendRequest(
                loan.bookId, loan.loanId, currentUser.username, 3,
              )}
            >
              Extend Loan by 3 Months
            </Button>
          ) : null}
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
      <Card key={loan.loanId} className="mt-2 mb-2 text-left">
        {loan.image ? <div className="m-2">{loan.image}</div> : null}
        <h5 className="card-title m-2">{loan.bookName}</h5>
        <div className="card-text m-2">
          <span className="font-weight-bold">Book ID: </span>
          {loan.bookId}
        </div>
        <div className="card-text m-2">
          <span className="font-weight-bold">Loan ID: </span>
          {loan.loanId}
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
    <div>
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
          <div id="profileSpinner" className="text-center" style={{ marginTop: '250px' }}>
            <Spinner animation="border" role="status" />
            <div>
              Loading Please Wait...
            </div>
          </div>
        )
        : (
          <div className="row no-gutters justify-content-sm-center justify-content-md-center justify-content-lg-start">
            {currentUser
              ? (
                <div id="userDetailsContainer" className="col-sm-12 col-md-6 col-lg-auto">
                  <div id="userDetailsUsername" className="h2 mb-2">Hi {currentUser.username}</div>
                  <div id="userDetailsTitle" className="mb-2">Your user details:</div>
                  <div id="userDetailsFirstName" className="mb-2">Firstname: {currentUser.firstName}</div>
                  <div id="userDetailsLastName" className="mb-2">Lastname: {currentUser.lastName}</div>
                  <div id="userDetailsEmail" className="mb-2">Email: {currentUser.email}</div>
                  <div className="mb-2">
                    <Button
                      variant="success"
                      className="btn btn-block"
                    >
                      Change Password
                    </Button>
                  </div>
                  <div className="mb-2">
                    <Button
                      variant="danger"
                      className="btn btn-block"
                    >
                      Delete Account
                    </Button>
                  </div>
                  <Button
                    onClick={() => setShowActiveLoans(!showActiveLoans)}
                    variant="info"
                    className="btn btn-block"
                  >
                    {showActiveLoans ? 'Close Active Loans' : 'See Active Loans'}
                    {showActiveLoans
                      ? <FontAwesomeIcon icon={faCaretUp} style={{ marginLeft: 10 }} />
                      : <FontAwesomeIcon icon={faCaretDown} style={{ marginLeft: 10 }} />}
                  </Button>
                  {showActiveLoans ? (
                    <div>
                      {userActiveLoansList ? <h5 className="text-left mt-2 mb-2">Your Active Loans:</h5> : null}
                      {userActiveLoansList}
                      {totalActiveLoanPages > 1 ? activeLoanPagination : null}
                    </div>
                  ) : null}
                  <Button
                    onClick={() => setShowInactiveLoans(!showInactiveLoans)}
                    variant="secondary"
                    className="btn btn-block"
                  >
                    {showInactiveLoans ? 'Close Inactive Loans' : 'See Inactive Loans'}
                    {showInactiveLoans
                      ? <FontAwesomeIcon icon={faCaretUp} className="ml-2" />
                      : <FontAwesomeIcon icon={faCaretDown} className="ml-2" />}
                  </Button>
                  {showInactiveLoans
                    ? (
                      <div>
                        {userInactiveLoansList ? <h5 className="text-left mt-2 mb-2">Your Inactive Loans:</h5> : null}
                        {userInactiveLoansList}
                        {totalInactiveLoanPages > 1 ? inactiveLoanPagination : null}
                      </div>
                    ) : null}
                </div>
              )
              : null}
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

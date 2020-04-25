import axios from 'axios';
import toastr from 'toastr';
import {
  GET_USER_ACTIVE_LOAN_DETAILS_PAGE_FAILURE,
  GET_USER_ACTIVE_LOAN_DETAILS_PAGE_SUCCESS,
  GET_USER_INACTIVE_LOAN_DETAILS_PAGE_FAILURE,
  GET_USER_INACTIVE_LOAN_DETAILS_PAGE_SUCCESS,
  POST_LOAN_FAILURE,
  POST_LOAN_SUCCESS,
} from '../actionTypes';
import { API_BASE_URL } from '../../constants/constants';

export const postLoanRequestSuccess = (token) => ({
  type: POST_LOAN_SUCCESS,
  token,
});

export const postLoanRequestFailure = (message) => ({
  type: POST_LOAN_FAILURE,
  message,
});

export const postLoanRequest = (bookId, username) => (dispatch) => {
  axios.post(`${API_BASE_URL}/book/loan`, { bookId, username },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
      },
    })
    .then((response) => {
      dispatch(postLoanRequestSuccess(response.data));
      toastr.success('Loan Successful, this book is now loaned to you.', 'Success');
    })
    .catch((error) => {
      if (error.response === undefined) {
        dispatch(postLoanRequestFailure('Failed to connect to back end'));
        return toastr.error('Failed to connect to server, please try again later', 'Error');
      }
      dispatch(postLoanRequestFailure(error.response.data.message));
      return toastr.error(error.response.data.message);
    });
};

export const getUserActiveLoanDetailsPageSuccess = (userActiveLoansDetailsPage) => ({
  type: GET_USER_ACTIVE_LOAN_DETAILS_PAGE_SUCCESS,
  userActiveLoansDetailsPage,
});

export const getUserActiveLoanDetailsPageFailure = (message) => ({
  type: GET_USER_ACTIVE_LOAN_DETAILS_PAGE_FAILURE,
  message,
});

export const getUserActiveLoanDetailsPage = (username, page, size) => (dispatch) => axios.get(`${API_BASE_URL}/user/loans-active/${username}`,
  {
    params: { page, size },
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
    },
  })
  .then((response) => {
    dispatch(getUserActiveLoanDetailsPageSuccess(response.data));
  })
  .catch((error) => {
    dispatch(getUserActiveLoanDetailsPageFailure(error.message));
  });

export const getUserInactiveLoanDetailsPageSuccess = (userInactiveLoansDetailsPage) => ({
  type: GET_USER_INACTIVE_LOAN_DETAILS_PAGE_SUCCESS,
  userInactiveLoansDetailsPage,
});

export const getUserInactiveLoanDetailsPageFailure = (message) => ({
  type: GET_USER_INACTIVE_LOAN_DETAILS_PAGE_FAILURE,
  message,
});

export const getUserInactiveLoanDetailsPage = (username, page, size) => (dispatch) => {
  axios.get(`${API_BASE_URL}/user/loans-inactive/${username}`,
    {
      params: { page, size },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
      },
    })
    .then((response) => {
      dispatch(getUserInactiveLoanDetailsPageSuccess(response.data));
    })
    .catch((error) => {
      dispatch(getUserInactiveLoanDetailsPageFailure(error.message));
    });
};

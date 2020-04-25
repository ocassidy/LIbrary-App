import axios from 'axios';
import toastr from 'toastr';
import moment from 'moment';
import { API_BASE_URL } from '../../constants/constants';
import {
  GET_ANALYTICS_FAILURE,
  GET_ANALYTICS_SUCCESS,
  GET_DATE_RANGE_ANALYTICS_FAILURE,
  GET_DATE_RANGE_ANALYTICS_SUCCESS,
  GET_RETURNS_RANGE_ANALYTICS_FAILURE,
  GET_RETURNS_RANGE_ANALYTICS_SUCCESS,
  GET_USER_LOANS_ANALYTICS_FAILURE,
  GET_USER_LOANS_ANALYTICS_SUCCESS, GET_USER_RETURNS_ANALYTICS_FAILURE,
  GET_USER_RETURNS_ANALYTICS_SUCCESS,
} from '../actionTypes';

export const getBookAnalyticsSuccess = (bookAnalyticsList) => ({
  type: GET_ANALYTICS_SUCCESS,
  bookAnalyticsList,
});

export const getBookAnalyticsFailure = (message) => ({
  type: GET_ANALYTICS_FAILURE,
  message,
});

export const getBookAnalytics = () => (dispatch) => axios.get(`${API_BASE_URL}/analytics/all-books`,
  {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
    },
  })
  .then((response) => {
    dispatch(getBookAnalyticsSuccess(response.data));
  })
  .catch((error) => {
    toastr.error(error.message, 'Error');
    dispatch(getBookAnalyticsFailure(error.message));
  });

export const getUserLoansAnalyticsSuccess = (userLoansAnalyticsList) => ({
  type: GET_USER_LOANS_ANALYTICS_SUCCESS,
  userLoansAnalyticsList,
});

export const getUserLoansAnalyticsFailure = (message) => ({
  type: GET_USER_LOANS_ANALYTICS_FAILURE,
  message,
});

export const getUserLoansAnalytics = (loanNumber) => (dispatch) => axios.get(`${API_BASE_URL}/analytics/all-users-loans`,
  {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
    },
    params: {
      loanNumber,
    },
  })
  .then((response) => {
    dispatch(getUserLoansAnalyticsSuccess(response.data));
  })
  .catch((error) => {
    toastr.error(error.message, 'Error');
    dispatch(getUserLoansAnalyticsFailure(error.message));
  });

export const getUserReturnsAnalyticsSuccess = (userReturnsAnalyticsList) => ({
  type: GET_USER_RETURNS_ANALYTICS_SUCCESS,
  userReturnsAnalyticsList,
});

export const getUserReturnsAnalyticsFailure = (message) => ({
  type: GET_USER_RETURNS_ANALYTICS_FAILURE,
  message,
});

export const getUserReturnsAnalytics = (loanNumber) => (dispatch) => axios.get(`${API_BASE_URL}/analytics/all-users-returns`,
  {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
    },
    params: {
      loanNumber,
    },
  })
  .then((response) => {
    dispatch(getUserReturnsAnalyticsSuccess(response.data));
  })
  .catch((error) => {
    toastr.error(error.message, 'Error');
    dispatch(getUserReturnsAnalyticsFailure(error.message));
  });

export const getBookDateRangeAnalyticsSuccess = (bookDateRangeList) => ({
  type: GET_DATE_RANGE_ANALYTICS_SUCCESS,
  bookDateRangeList,
});

export const getBookDateRangeAnalyticsFailure = (message) => ({
  type: GET_DATE_RANGE_ANALYTICS_FAILURE,
  message,
});

export const getBookDateRangeAnalytics = (startDate, endDate) => (dispatch) => axios.get(`${API_BASE_URL}/analytics/loans-date-range`,
  {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
    },
    params: {
      startDate: moment(startDate).format('YYYY-MM-DD'),
      endDate: moment(endDate).format('YYYY-MM-DD'),
    },
  })
  .then((response) => {
    dispatch(getBookDateRangeAnalyticsSuccess(response.data));
  })
  .catch((error) => {
    toastr.error(error.message, 'Error');
    dispatch(getBookDateRangeAnalyticsFailure(error.message));
  });

export const getReturnsDateRangeAnalyticsSuccess = (returnsDateRangeList) => ({
  type: GET_RETURNS_RANGE_ANALYTICS_SUCCESS,
  returnsDateRangeList,
});

export const getReturnsDateRangeAnalyticsFailure = (message) => ({
  type: GET_RETURNS_RANGE_ANALYTICS_FAILURE,
  message,
});

export const getReturnsDateRangeAnalytics = (startDate, endDate) => (dispatch) => axios.get(`${API_BASE_URL}/analytics/returns-date-range`,
  {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
    },
    params: {
      startDate: moment(startDate).format('YYYY-MM-DD'),
      endDate: moment(endDate).format('YYYY-MM-DD'),
    },
  })
  .then((response) => {
    dispatch(getReturnsDateRangeAnalyticsSuccess(response.data));
  })
  .catch((error) => {
    toastr.error(error.message, 'Error');
    dispatch(getReturnsDateRangeAnalyticsFailure(error.message));
  });

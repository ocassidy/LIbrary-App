import axios from 'axios';
import {
  GET_BOOK_FAILURE,
  GET_BOOK_LIST_FAILURE,
  GET_BOOK_LIST_SUCCESS,
  GET_BOOK_PAGE_FAILURE,
  GET_BOOK_PAGE_SUCCESS, GET_BOOK_SUCCESS,
} from '../actionTypes';
import { API_BASE_URL } from '../../constants/constants';

export const getBookListSuccess = (bookList) => ({
  type: GET_BOOK_LIST_SUCCESS,
  bookList,
});

export const getBookListFailure = (message) => ({
  type: GET_BOOK_LIST_FAILURE,
  message,
});

export const getBookList = () => (dispatch) => axios.get(`${API_BASE_URL}/books`,
  {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
    },
  })
  .then((response) => {
    dispatch(getBookListSuccess(response.data));
  })
  .catch((error) => {
    dispatch(getBookListFailure(error.message));
  });

export const getBookPageSuccess = (bookPage) => ({
  type: GET_BOOK_PAGE_SUCCESS,
  bookPage,
});

export const getBookPageFailure = (message) => ({
  type: GET_BOOK_PAGE_FAILURE,
  message,
});

export const getBookPage = (page, size) => (dispatch) => axios.get(`${API_BASE_URL}/books-paged`,
  {
    params: { page, size },
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
    },
  })
  .then((response) => {
    dispatch(getBookPageSuccess(response.data));
  })
  .catch((error) => {
    dispatch(getBookPageFailure(error.message));
  });

export const getBookSuccess = (book) => ({
  type: GET_BOOK_SUCCESS,
  book,
});

export const getBookFailure = (message) => ({
  type: GET_BOOK_FAILURE,
  message,
});

export const getBook = (id) => (dispatch) => axios.get(`${API_BASE_URL}/book/${id}`,
  {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
    },
  })
  .then((response) => {
    dispatch(getBookSuccess(response.data));
  })
  .catch((error) => {
    dispatch(getBookFailure(error.message));
  });

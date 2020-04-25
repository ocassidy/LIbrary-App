import axios from 'axios';
import toastr from 'toastr';
import { push } from 'connected-react-router';
import { API_BASE_URL } from '../../constants/constants';
import {
  DELETE_BOOK_FAILURE,
  DELETE_BOOK_SUCCESS,
  GET_USER_FAILURE,
  GET_USER_PAGE_FAILURE,
  GET_USER_PAGE_SUCCESS,
  GET_USER_SUCCESS,
  PUT_BOOK_FAILURE,
  PUT_BOOK_SUCCESS, PUT_USER_FAILURE, PUT_USER_SUCCESS,
} from '../actionTypes';

export const putEditBookSuccess = (book) => ({
  type: PUT_BOOK_SUCCESS,
  book,
});

export const putEditBookFailure = (message) => ({
  type: PUT_BOOK_FAILURE,
  message,
});

export const putEditBook = (editBookRequest) => (dispatch) => axios.put(`${API_BASE_URL}/book/${editBookRequest.id}`,
  {
    id: editBookRequest.id,
    image: editBookRequest.image.trim(),
    name: editBookRequest.title.trim(),
    subtitle: editBookRequest.subtitle.trim(),
    publisher: editBookRequest.publisher.trim(),
    copies: editBookRequest.copies,
    copiesAvailable: editBookRequest.copiesAvailable,
    isbn10: editBookRequest.isbn10.trim(),
    isbn13: editBookRequest.isbn13.trim(),
    description: editBookRequest.description.trim(),
    edition: editBookRequest.edition.trim(),
    genre: editBookRequest.genre.trim(),
    yearPublished: editBookRequest.yearPublished.trim(),
    author: editBookRequest.author,
  },
  {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
    },
  })
  .then((response) => {
    if (response.data.success === false) {
      return toastr.error(response.data.message, 'Error');
    }
    toastr.success('Book Updated!', 'Success', { timeOut: 10000 });
    dispatch(putEditBookSuccess(editBookRequest));
    return response.data;
  })
  .catch((error) => {
    toastr.error(error.message, 'Error');
    dispatch(putEditBookFailure(error.message));
  });

export const deleteBookSuccess = (id) => ({
  type: DELETE_BOOK_SUCCESS,
  id,
});

export const deleteBookFailure = (message) => ({
  type: DELETE_BOOK_FAILURE,
  message,
});

export const deleteBook = (id) => (dispatch) => axios.delete(`${API_BASE_URL}/book/${id}`,
  {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
    },
  })
  .then((response) => {
    if (response.data.success === false) {
      return toastr.error(response.data.message, 'Error');
    }
    toastr.success('Book Deleted!', 'Success', { timeOut: 10000 });
    dispatch(deleteBookSuccess(id));
    dispatch(push('/admin/book-edit-delete'));
    return response.data;
  })
  .catch((error) => {
    toastr.error(error.message, 'Error');
    dispatch(deleteBookFailure(error.message));
  });

export const getUserPageSuccess = (userPage) => ({
  type: GET_USER_PAGE_SUCCESS,
  userPage,
});

export const getUserPageFailure = (message) => ({
  type: GET_USER_PAGE_FAILURE,
  message,
});

export const getUserPage = (page, size) => (dispatch) => axios.get(`${API_BASE_URL}/users-paged`,
  {
    params: { page, size },
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
    },
  })
  .then((response) => {
    dispatch(getUserPageSuccess(response.data));
  })
  .catch((error) => {
    dispatch(getUserPageFailure(error.message));
  });

export const getUserSuccess = (user) => ({
  type: GET_USER_SUCCESS,
  user,
});

export const getUserFailure = (message) => ({
  type: GET_USER_FAILURE,
  message,
});

export const getUser = (username) => (dispatch) => axios.get(`${API_BASE_URL}/user/admin/${username}`,
  {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
    },
  })
  .then((response) => {
    dispatch(getUserSuccess(response.data));
  })
  .catch((error) => {
    dispatch(getUserFailure(error.message));
  });

export const putUserSuccess = (user) => ({
  type: PUT_USER_SUCCESS,
  user,
});

export const putUserFailure = (message) => ({
  type: PUT_USER_FAILURE,
  message,
});

export const putUser = (userEditRequest) => (dispatch) => axios.put(`${API_BASE_URL}/user`,
  {
    id: userEditRequest.id,
    username: userEditRequest.username,
    firstName: userEditRequest.firstName.trim(),
    lastName: userEditRequest.lastName.trim(),
    address1: userEditRequest.address1.trim(),
    address2: userEditRequest.address2.trim(),
    city: userEditRequest.city.trim(),
    contactNumber: userEditRequest.contactNumber.trim(),
    gender: userEditRequest.gender,
  },
  {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
    },
  })
  .then((response) => {
    if (response.data.success === false) {
      return toastr.error(response.data.message, 'Error');
    }
    toastr.success('User Updated!', 'Success', { timeOut: 10000 });
    dispatch(putUserSuccess(userEditRequest));
    return response.data;
  })
  .catch((error) => {
    toastr.error(error.message, 'Error');
    dispatch(putUserFailure(error.message));
  });

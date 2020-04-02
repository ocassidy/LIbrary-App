import {
  GET_BOOK_FAILURE,
  GET_BOOK_LIST_FAILURE,
  GET_BOOK_LIST_SUCCESS,
  GET_BOOK_PAGE_FAILURE,
  GET_BOOK_PAGE_SUCCESS,
  GET_BOOK_SUCCESS,
} from '../actionTypes';

const initialState = {
  book: null,
  bookList: [],
  bookPage: {},
};

export default function bookReducer(state = initialState, action) {
  switch (action.type) {
    case GET_BOOK_SUCCESS:
      // eslint-disable-next-line no-return-assign
      return state = {
        ...state,
        book: action.book,
      };

    case GET_BOOK_FAILURE:
      // eslint-disable-next-line no-return-assign
      return state = {
        ...state,
        book: null,
      };

    case GET_BOOK_LIST_SUCCESS:
      // eslint-disable-next-line no-return-assign
      return state = {
        ...state,
        bookList: action.bookList,
      };

    case GET_BOOK_LIST_FAILURE:
      // eslint-disable-next-line no-return-assign
      return state = {
        ...state,
        bookList: [],
      };

    case GET_BOOK_PAGE_SUCCESS:
      // eslint-disable-next-line no-return-assign
      return state = {
        ...state,
        bookPage: action.bookPage,
      };

    case GET_BOOK_PAGE_FAILURE:
      // eslint-disable-next-line no-return-assign
      return state = {
        ...state,
        bookPage: {},
      };

    default:
      return state;
  }
}

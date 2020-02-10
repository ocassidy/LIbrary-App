import {
  GET_BOOK_LIST_FAILURE,
  GET_BOOK_LIST_SUCCESS,
} from '../actionTypes';

const initialState = {
  bookList: [],
};

export default function bookReducer(state = initialState, action) {
  switch (action.type) {
    case GET_BOOK_LIST_SUCCESS:
      // eslint-disable-next-line no-return-assign
      return state = {
        bookList: action.bookList,
      };

    case GET_BOOK_LIST_FAILURE:
      // eslint-disable-next-line no-return-assign
      return state;

    default:
      return state;
  }
}

import {
  GET_BOOK_PAGE_FAILURE,
  GET_BOOK_PAGE_SUCCESS,
} from '../actionTypes';

const initialState = {
  bookPage: {},
};

export default function bookListReducer(state = initialState, action) {
  switch (action.type) {
    case GET_BOOK_PAGE_SUCCESS:
      // eslint-disable-next-line no-return-assign
      return state = {
        bookPage: action.bookPage,
      };

    case GET_BOOK_PAGE_FAILURE:
      // eslint-disable-next-line no-return-assign
      return state = {
        bookPage: [],
      };

    default:
      return state;
  }
}

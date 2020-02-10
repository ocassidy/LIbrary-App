import { connect } from 'react-redux';
import BooksList from '../../components/BooksList/BooksList';
import { getBookList } from '../actions';

const mapStateToProps = (state) => ({
  currentUser: state.userDetails.currentUser,
  isAuthenticated: state.userDetails.isAuthenticated,
  isLoading: state.userDetails.isLoading,
  bookList: state.bookDetails.bookList,
});

const mapDispatchToProps = (dispatch) => ({
  handleGetBookList: () => {
    dispatch(getBookList());
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(BooksList);

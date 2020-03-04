import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import { getBookList } from '../../redux/actions';
import NavBar from '../Shared/NavBar';
import './BookList.css';

function BooksList(props) {
  const { bookList, handleGetBookList } = props;
  const books = (bookList && bookList.length > 0)
    ? bookList.map((book) => (
      <Route
        key={book.id}
        render={({ history }) => (
          <Card
            className="text-center bookListCard"
            border="info"
            key={book.id}
            onClick={() => { history.push(`/book/${book.id}`); }}
          >
            <div className="row no-gutters">
              <div className="col-auto">
                <img src={book.image} className="bookListItemImg" alt="bookImg" />
              </div>
              <div className="col bookListItemDetails">
                <h4 className="card-title bookListItemText">{book.name}</h4>
                <div className="card-text bookListItemText">
                  <span className="bookListItemHeaderText">Edition: </span>
                  {book.edition}
                </div>
                <div className="card-text bookListItemText">
                  <span className="bookListItemHeaderText">Authors: </span>
                  {book.authors[0].name}
                </div>
                <div className="card-text bookListItemText">
                  <span className="bookListItemHeaderText">Year Published: </span>
                  {book.yearPublished}
                </div>
              </div>
              <div className="col bookDescription">
                <p className="card-text bookListItemDescription">
                  <span className="bookListDescriptionItemHeaderText">Description: </span>
                  {book.description}
                </p>
              </div>
            </div>
            <div className="card-footer w-100 bookListItemFooter">
              {`Publisher: ${book.publisher}`}
            </div>
          </Card>
        )}
      />
    ))
    : (
      <div>
        No books found, please try again later.
      </div>
    );

  return (
    <div>
      <NavBar />
      <div>
        <Button onClick={handleGetBookList} variant="light" className="refreshButton">
          <FontAwesomeIcon icon={faSync} style={{ marginRight: 10 }} />
          Refresh
        </Button>
        {books}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  currentUser: state.userDetails.currentUser,
  isAuthenticated: state.userDetails.isAuthenticated,
  isLoading: state.userDetails.isLoading,
  bookList: state.bookListDetails.bookList,
});

const mapDispatchToProps = (dispatch) => ({
  handleGetBookList: () => {
    dispatch(getBookList());
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(BooksList);

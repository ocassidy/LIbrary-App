import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';
import {
  getBook, postLoanRequest,
} from '../../redux/actions';
import NavBar from '../Shared/NavBar';
import './BookPage.css';

function BookPage(props) {
  const { id } = useParams();
  const {
    book, handleGetBook, currentUser, handleLoanBook,
  } = props;

  useEffect(() => {
    handleGetBook(id);
  }, [id, handleGetBook]);

  return (
    <div>
      <NavBar />
      {book
        ? (
          <div className="row no-gutters bookDetailsContainer">
            <div className="col-auto bookDetailsCol">
              <img src={book.image} className="bookImg" alt="bookImg" />
            </div>
            <div className="col-auto bookDetailsCol">
              <h4 className="bookDetailsItem">{book.name}</h4>
              {book.subtitle ? (
                <div className="bookDetailsItem">
                  <span className="bookDetailsItemHeaderText">Subtitle: </span>
                  {book.subtitle}
                </div>
              ) : null}
              <div className="bookDetailsItem">
                <span className="bookDetailsItemHeaderText">Edition: </span>
                {book.edition}
              </div>
              <div className="bookDetailsItem">
                <span className="bookDetailsItemHeaderText">Authors: </span>
                {book.authors[0].name}
              </div>
              <div className="bookDetailsItem">
                <span className="bookDetailsItemHeaderText">Year Published: </span>
                {book.yearPublished}
              </div>
              <div className="bookDetailsItem">
                <span className="bookDetailsItemHeaderText">Year Published: </span>
                {book.publisher}
              </div>
              <div className="bookDetailsItem">
                <span className="bookDetailsItemHeaderText">Genre: </span>
                {book.genre}
              </div>
              <div className="bookDetailsItem">
                <span className="bookDescriptionItemHeaderText">Description: </span>
                {book.description}
              </div>
              <div className="bookDetailsItem">
                <span className="bookDescriptionItemHeaderText">Copies Available: </span>
                {book.copiesAvailable}
              </div>
              <div className="bookDetailsItem">
                <span className="bookDescriptionItemHeaderText">ISBN-10: </span>
                {book.isbn10}
              </div>
              <div className="bookDetailsItem">
                <span className="bookDescriptionItemHeaderText">ISBN-13: </span>
                {book.isbn13}
              </div>
              <div>
                <Button onClick={() => handleLoanBook(id, currentUser.username)} variant="primary" className="withdrawButton">
                  <FontAwesomeIcon icon={faBookOpen} style={{ marginRight: 10 }} />
                  Loan Book
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div>
            Book details not found, please try again.
          </div>
        )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  currentUser: state.userDetails.currentUser,
  book: state.bookDetails.book,
});

const mapDispatchToProps = (dispatch) => ({
  handleGetBook: (id) => {
    dispatch(getBook(id));
  },
  handleLoanBook: (id, username) => {
    dispatch(postLoanRequest(id, username));
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(BookPage);

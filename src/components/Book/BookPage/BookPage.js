import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { push } from 'connected-react-router';
import { deleteBook, getBook, postLoanRequest } from '../../../redux/actions';
import './BookPage.css';
import AdminDeleteBookConfirmModal from '../../Admin/AdminEditDeleteBook/AdminDeleteBookConfirmModal';

function BookPage(props) {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);
  const {
    book, handleGetBook, currentUser, handleLoanBook, isAdmin, handleGotoBookEditPage,
    handleDeleteBook,
  } = props;

  useEffect(() => {
    handleGetBook(id);
  }, [id, handleGetBook]);

  return (
    <div>
      {book
        ? (
          <div className="bookDetailsContainer">
            <div className="bookImgCol">
              <img src={book.image} className="bookImg" alt="bookImg" />
            </div>
            <div className="bookDetailsCol">
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
              <div className="bookPageButtonContainer">
                <Button
                  onClick={() => handleLoanBook(id, currentUser.username)}
                  variant="primary"
                  className="withdrawButton"
                >
                  <FontAwesomeIcon icon={faBookOpen} style={{ marginRight: 10 }} />
                  Loan Book
                </Button>
                {isAdmin
                  ? (
                    <div>
                      <Button onClick={() => handleGotoBookEditPage(book)} variant="success" className="editButton">
                        <FontAwesomeIcon icon={faEdit} style={{ marginRight: 10 }} />
                        Edit Book
                      </Button>
                      <Button
                        className="bookListDeleteBookButton"
                        onClick={() => { setShowModal(!showModal); setBookToDelete(book); }}
                        variant="danger"
                      >
                        <FontAwesomeIcon icon={faTrash} style={{ marginRight: 10 }} />
                        Delete Book
                      </Button>
                    </div>
                  )
                  : null}
              </div>
            </div>
            {showModal ? (
              <AdminDeleteBookConfirmModal
                handleDeleteBook={() => handleDeleteBook(book.id)}
                bookToDelete={bookToDelete}
                show={showModal}
                onHide={() => setShowModal(false)}
              />
            )
              : null}
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
  currentUser: state.authDetails.currentUser,
  book: state.bookDetails.book,
  isAdmin: state.authDetails.isAdmin,
});

const mapDispatchToProps = (dispatch) => ({
  handleGetBook: (id) => dispatch(getBook(id)),
  handleLoanBook: (id, username) => dispatch(postLoanRequest(id, username)),
  handleGotoBookEditPage: (book) => dispatch(push(`/book/edit/${book.id}`)),
  handleDeleteBook: (id) => {
    dispatch(deleteBook(id));
    dispatch(push('/books'));
    window.location.reload();
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(BookPage);

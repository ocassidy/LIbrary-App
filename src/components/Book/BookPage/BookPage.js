import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { push } from 'connected-react-router';
import { deleteBook, getBook, postLoanRequest } from '../../../redux/actions';
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
    <div className="container-fluid text-justify">
      {book
        ? (
          <div className="row no-gutters justify-content-center align-items-center">
            <div className="col-sm-12 col-md-4 col-lg-3">
              <img src={book.image} className="img-fluid mx-auto d-block w-75" alt="bookImg" />
            </div>
            <div className="col-sm-12 col-md-8 col-lg-9">
              <div className="col-12 mb-2">
                <div className="display-4">{book.name}</div>
              </div>
              <div className="col-12 mb-2">
                {book.subtitle ? (
                  <div className="bookDetailsItem">
                    <span className="font-weight-bold">Subtitle: </span>
                    {book.subtitle}
                  </div>
                ) : null}
              </div>
              <div className="col-12 mb-2">
                <span className="font-weight-bold">Edition: </span>
                {book.edition}
              </div>
              <div className="col-12 mb-2">
                <span className="font-weight-bold">Author: </span>
                {book.author}
              </div>
              <div className="col-12 mb-2">
                <span className="font-weight-bold">Year Published: </span>
                {book.yearPublished}
              </div>
              <div className="col-12 mb-2">
                <span className="font-weight-bold">Year Published: </span>
                {book.publisher}
              </div>
              <div className="col-12 mb-2">
                <span className="font-weight-bold">Genre: </span>
                {book.genre}
              </div>
              <div className="col-12 mb-2">
                <span className="font-weight-bold">Description: </span>
                {book.description}
              </div>
              <div className="col-12 mb-2">
                <span className="font-weight-bold">Copies Available: </span>
                {book.copiesAvailable}
              </div>
              <div className="col-12 mb-2">
                <span className="font-weight-bold">ISBN-10: </span>
                {book.isbn10}
              </div>
              <div className="col-12 mb-2">
                <span className="font-weight-bold">ISBN-13: </span>
                {book.isbn13}
              </div>
              <div className="col-sm-12 col-md-4 col-lg-auto mb-2">
                <div className="row no-gutters mt-2 mb-2">
                  <div className="col-auto mr-2 mb-2">
                    <Button
                      onClick={() => handleLoanBook(id, currentUser.username)}
                      variant="primary"
                      className="withdrawButton"
                    >
                      Loan Book
                      <FontAwesomeIcon icon={faBookOpen} className="ml-2" />
                    </Button>
                  </div>
                  {isAdmin
                    ? (
                      <div className="col-sm-12 col-md-4 col-lg-auto mr-2 mb-2">
                        <Button onClick={() => handleGotoBookEditPage(book)} variant="success" className="editButton">
                          Edit Book
                          <FontAwesomeIcon icon={faEdit} className="ml-2" />
                        </Button>
                      </div>
                    )
                    : null}
                  {isAdmin
                    ? (
                      <div className="col-sm-12 col-md-4 col-lg-auto mr-2 mb-2">
                        <Button
                          className="bookListDeleteBookButton"
                          onClick={() => {
                            setShowModal(!showModal);
                            setBookToDelete(book);
                          }}
                          variant="danger"
                        >
                          Delete Book
                          <FontAwesomeIcon icon={faTrash} className="ml-2" />
                        </Button>
                      </div>
                    )
                    : null}
                </div>
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

import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Card from 'react-bootstrap/Card';
import {
  Button, FormControl, FormLabel, Pagination,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faSearch, faSync } from '@fortawesome/free-solid-svg-icons';
import { push } from 'connected-react-router';
import { deleteBook, getBookList, getBookPage } from '../../../redux/actions';
import BooksListFilters from './BookListFilters';
import AdminDeleteBookConfirmModal from '../../Admin/AdminEditDeleteBook/AdminDeleteBookConfirmModal';

export function BooksList(props) {
  const [pagedBooks, setPagedBooks] = useState({});
  const [isSearchActive, setIsSearchActiveActive] = useState(false);
  const [isFilterDropdownActive, setIsFilterDropdownActive] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [numItemsPerPage, setNumItemsPerPage] = useState(5);
  const [showModal, setShowModal] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);
  const {
    bookList,
    handleGetBookList,
    handleGetBookPage,
    bookPage,
    handleGotoBookPage,
    handleGotoBookEditPage,
    adminMode,
    handleDeleteBook,
  } = props;

  useEffect(() => {
    if (bookPage.content) {
      setPagedBooks(bookPage.content);
    }
    if (bookPage.totalPages) {
      setTotalPages(bookPage.totalPages);
    }
  }, [bookPage, bookList]);

  const handleSearchChange = (e) => {
    let currentList = [];
    let filteredList = [];
    e.target.value.toLowerCase();

    if (e.target.value !== '') {
      currentList = bookList;
      filteredList = currentList.filter((book) => {
        const bookName = book.name.toLowerCase();
        const filter = e.target.value.toLowerCase();
        return bookName.includes(filter);
      });
    } else {
      filteredList = bookPage.content;
    }
    setPagedBooks(filteredList);
  };

  const books = (pagedBooks && pagedBooks.length > 0)
    ? pagedBooks.map((book) => (
      <Card
        className="card mb-2"
        border="dark"
        key={book.id}
      >
        <div className="row no-gutters justify-content-center align-items-center">
          <div className="col-sm-12 col-md-4 col-lg-3">
            <img src={book.image} className="img-thumbnail rounded mx-auto d-block w-75 mt-2" alt="bookImg" />
          </div>
          <div className="col-sm-12 col-md-8 col-lg-9 mt-4 p-3">
            <div className="card-title h4">{book.name}</div>
            <div className="card-text mt-4">
              <span className="font-weight-bold">Book ID: </span>
              {book.id}
            </div>
            <div className="card-text mt-4">
              <span className="font-weight-bold">Edition: </span>
              {book.edition}
            </div>
            <div className="card-text mt-4">
              <span className="font-weight-bold">Author: </span>
              {book.author}
            </div>
            <div className="card-text mt-4">
              <span className="font-weight-bold">Year Published: </span>
              {book.yearPublished}
            </div>
            <div className="card-text mt-4">
              <span className="font-weight-bold">Genre: </span>
              {book.genre}
            </div>
            <div className="card-text mt-4">
              <span className="font-weight-bold">Description: </span>
              {book.description}
            </div>

            <div className="row no-gutters justify-content-end mt-2">
              <div className="col-auto ml-2">
                <Button
                  onClick={() => handleGotoBookPage(book)}
                  variant="success"
                >
                  View Book
                </Button>
              </div>
              {adminMode
                ? (
                  <div className="row no-gutters">
                    <div className="col-auto ml-2">
                      <Button
                        onClick={() => handleGotoBookEditPage(book)}
                        variant="info"
                      >
                        Edit Book
                      </Button>
                    </div>
                    <div className="col-auto ml-2">
                      <Button
                        onClick={() => {
                          setShowModal(!showModal);
                          setBookToDelete(book);
                        }}
                        variant="danger"
                      >
                        Delete Book
                      </Button>
                    </div>
                  </div>
                ) : null}
            </div>
          </div>
        </div>
        <div className="card-footer col-auto text-right">
          Publisher: {book.publisher}
        </div>
      </Card>
    ))
    : (
      <div className="text-center">
        No books found, please try again.
      </div>
    );

  const search = (
    <div className="row no-gutters">
      <FormLabel className="col-auto m-1 h2">Search:</FormLabel>
      <FormControl
        className="m-1"
        onChange={(e) => handleSearchChange(e)}
        placeholder="Start typing to search..."
        aria-label="Start typing to search..."
        aria-describedby="search-input"
      />
    </div>
  );

  const paginationItemsPerPage = (
    <div className="row no-gutters justify-content-end mb-2 align-items-center">
      <div className="col-auto mr-2">
        Items Per Page:
      </div>
      <div className="col-auto mr-2">
        <Button
          onClick={() => {
            setNumItemsPerPage(5);
            handleGetBookPage(0, 5);
          }}
          variant="light"
        >
          5
        </Button>
      </div>
      <div className="col-auto mr-2">
        <Button
          onClick={() => {
            setNumItemsPerPage(10);
            handleGetBookPage(0, 10);
          }}
          variant="light"
        >
          10
        </Button>
      </div>
      <div className="col-auto mr-2">
        <Button
          onClick={() => {
            setNumItemsPerPage(20);
            handleGetBookPage(0, 20);
          }}
          variant="light"
        >
          20
        </Button>
      </div>
    </div>
  );

  const paginationItems = [];
  // eslint-disable-next-line no-plusplus
  for (let number = 1; number <= totalPages; number++) {
    paginationItems.push(
      <Pagination.Item key={number} onClick={() => handleGetBookPage(number - 1, numItemsPerPage)}>
        {number}
      </Pagination.Item>,
    );
  }

  const pagination = (
    <div className="mr-5">
      <Pagination>{paginationItems}</Pagination>
    </div>
  );

  return (
    <div className="container-fluid text-justify">
      {bookPage
        ? (
          <div className="row no-gutters">
            <div className="col-12 mr-2">
              <Button
                onClick={() => setIsSearchActiveActive(!isSearchActive)}
                variant="light"
                className="mr-2"
              >
                Search
                <FontAwesomeIcon icon={faSearch} className="ml-2" />
              </Button>
              <Button
                onClick={() => setIsFilterDropdownActive(!isFilterDropdownActive)}
                variant="light"
                className="mr-2"
              >
                Filters
                <FontAwesomeIcon icon={faFilter} className="ml-2" />
              </Button>
              <Button
                onClick={() => {
                  handleGetBookList();
                  handleGetBookPage(0, 5);
                }}
                variant="light"
                className="mr-2"
              >
                Refresh
                <FontAwesomeIcon icon={faSync} className="ml-2" />
              </Button>
            </div>
            {isFilterDropdownActive
              ? (
                <div className="col-12 m-2">
                  <BooksListFilters />
                </div>
              )
              : null}
            <div className="col-12">{paginationItemsPerPage}</div>
            <div className="col-12">{isSearchActive ? search : null}</div>
          </div>
        ) : null}
      {books}
      {totalPages > 1 ? pagination : null}
      {showModal ? (
        <AdminDeleteBookConfirmModal
          handleDeleteBook={() => handleDeleteBook(bookToDelete.id)}
          bookToDelete={bookToDelete}
          show={showModal}
          onHide={() => setShowModal(false)}
        />
      )
        : null}
    </div>
  );
}

const mapStateToProps = (state) => ({
  currentUser: state.authDetails.currentUser,
  isAuthenticated: state.authDetails.isAuthenticated,
  isLoading: state.authDetails.isLoading,
  bookList: state.bookDetails.bookList,
  bookPage: state.bookDetails.bookPage,
});

const mapDispatchToProps = (dispatch) => ({
  handleGetBookList: () => dispatch(getBookList()),
  handleGetBookPage: (page, size) => dispatch(getBookPage(page, size)),
  handleGotoBookPage: (book) => dispatch(push(`/book/${book.id}`)),
  handleGotoBookEditPage: (book) => dispatch(push(`/book/edit/${book.id}`)),
  handleDeleteBook: (id) => {
    dispatch(deleteBook(id));
    dispatch(push('/books'));
    window.location.reload();
  },
});


export const BookListContainer = connect(mapStateToProps, mapDispatchToProps)(BooksList);

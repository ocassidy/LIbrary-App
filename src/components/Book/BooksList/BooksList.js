import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Card from 'react-bootstrap/Card';
import { Button, FormControl, Pagination } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faSearch, faSync } from '@fortawesome/free-solid-svg-icons';
import { push } from 'connected-react-router';
import { deleteBook, getBookList, getBookPage } from '../../../redux/actions';
import './BookList.css';
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
        className="text-center bookListCard"
        border="info"
        key={book.id}
      >
        <div className="row no-gutters bookListItemDetailsContainer">
          <div className="col-md-2">
            <img src={book.image} className="bookListItemImg" alt="bookImg" />
          </div>
          <div className="col-auto bookListItemDetailsTextContainer">
            <h4 className="card-title bookListItemText">{book.name}</h4>
            <div className="card-text bookListItemText">
              <span className="bookListItemHeaderText">Book ID: </span>
              {book.id}
            </div>
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
            <div className="card-text bookListItemText">
              <span className="bookListItemHeaderText">Genre: </span>
              {book.genre}
            </div>
          </div>
          <div className="col-auto bookDescription">
            <p className="card-text bookListItemDescription">
              <span className="bookListDescriptionItemHeaderText">Description: </span>
              {book.description}
            </p>
          </div>

          <div className="bookListButtonContainer">
            <Button
              className="bookListViewBookButton"
              onClick={() => handleGotoBookPage(book)}
              variant="success"
            >
              View Book
            </Button>
            {adminMode
              ? (
                <div>
                  <Button
                    className="bookListEditBookButton"
                    onClick={() => handleGotoBookEditPage(book)}
                    variant="info"
                  >
                    Edit Book
                  </Button>
                  <Button
                    className="bookListDeleteBookButton"
                    onClick={() => { setShowModal(!showModal); setBookToDelete(book); }}
                    variant="danger"
                  >
                    Delete Book
                  </Button>
                </div>
              ) : null}
          </div>
        </div>
        <div className="card-footer w-100 bookListItemFooter">
          {`Publisher: ${book.publisher}`}
        </div>
      </Card>
    ))
    : (
      <div>
        No books found, please try again.
      </div>
    );

  const search = (
    <div className="bookListSearchBarContainer">
      <h5 className="bookListSearchBarTitle">Search:</h5>
      <FormControl
        onChange={(e) => handleSearchChange(e)}
        placeholder="Start typing to search..."
        aria-label="Start typing to search..."
        aria-describedby="search-input"
      />
    </div>
  );

  const paginationItemsPerPage = (
    <div className="bookPaginationFilterContainer">
      Items Per Page:
      <Button
        className="bookPaginationFilterContainerButton"
        onClick={() => {
          setNumItemsPerPage(5);
          handleGetBookPage(0, numItemsPerPage);
        }}
        variant="light"
      >
        5
      </Button>
      <Button
        className="bookPaginationFilterContainerButton"
        onClick={() => {
          setNumItemsPerPage(10);
          handleGetBookPage(0, numItemsPerPage);
        }}
        variant="light"
      >
        10
      </Button>
      <Button
        className="bookPaginationFilterContainerButton"
        onClick={() => {
          setNumItemsPerPage(20);
          handleGetBookPage(0, numItemsPerPage);
        }}
        variant="light"
      >
        20
      </Button>
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
    <div className="bookListPagination">
      <Pagination>{paginationItems}</Pagination>
    </div>
  );

  return (
    <div>
      <div>
        {bookPage
          ? (
            <div className="bookListTopContainer">
              <div className="bookListTopButtonContainer">
                <Button
                  onClick={() => setIsSearchActiveActive(!isSearchActive)}
                  variant="light"
                  className="bookListTopContainerSearchButton"
                >
                  <FontAwesomeIcon icon={faSearch} style={{ marginRight: 10 }} />
                  Search
                </Button>
                <Button
                  onClick={() => setIsFilterDropdownActive(!isFilterDropdownActive)}
                  variant="light"
                  className="bookListTopContainerFilterButton"
                >
                  <FontAwesomeIcon icon={faFilter} style={{ marginRight: 10 }} />
                  Filters
                </Button>
                <Button
                  onClick={() => { handleGetBookList(); handleGetBookPage(); }}
                  variant="light"
                  className="bookListTopContainerRefreshButton"
                >
                  <FontAwesomeIcon icon={faSync} style={{ marginRight: 10 }} />
                  Refresh
                </Button>
              </div>
              {isSearchActive ? search : null}
              {isFilterDropdownActive ? <BooksListFilters /> : null}
              {paginationItemsPerPage}
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

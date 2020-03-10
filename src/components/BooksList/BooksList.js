import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Card from 'react-bootstrap/Card';
import { Button, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faSearch, faSync } from '@fortawesome/free-solid-svg-icons';
import { getBookList } from '../../redux/actions';
import NavBar from '../Shared/NavBar';
import './BookList.css';
import BooksListFilters from './BookListFilters';

function BooksList(props) {
  const [booksState, setBooksState] = useState([]);
  const [isSearchActive, setIsSearchActiveActive] = useState(false);
  const [isFilterDropdownActive, setIsFilterDropdownActive] = useState(false);
  const { bookList, handleGetBookList } = props;

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
      filteredList = bookList;
    }
    console.log(filteredList);
    setBooksState(filteredList);
  };

  const books = (booksState && booksState.length > 0)
    ? booksState.map((book) => (
      <Route
        key={book.id}
        render={({ history }) => (
          <Card
            className="text-center bookListCard"
            border="info"
            key={book.id}
            onClick={() => {
              history.push(`/book/${book.id}`);
            }}
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
                <div className="card-text bookListItemText">
                  <span className="bookListItemHeaderText">Genre: </span>
                  {book.genre}
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

  useEffect(() => {
    setBooksState(bookList);
  }, [bookList]);

  return (
    <div>
      <NavBar />
      <div>
        {books
          ? (
            <div className="bookListTopContainer">
              <div className="bookListButtonContainer">
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
                  onClick={() => handleGetBookList()}
                  variant="light"
                  className="bookListTopContainerRefreshButton"
                >
                  <FontAwesomeIcon icon={faSync} style={{ marginRight: 10 }} />
                  Refresh
                </Button>
              </div>
              {isSearchActive ? search : null}
              {isFilterDropdownActive ? <BooksListFilters /> : null}
            </div>
          ) : null}
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

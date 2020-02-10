import React from 'react';
import { Route } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import NavBar from '../Shared/NavBar';
import './BookList.css';

export default function BooksList(props) {
  const { bookList, handleGetBookList } = props;
  const books = (bookList && bookList.length > 0)
    ? bookList.map((book) => (
      <Route
        key={book.id}
        render={({ history }) => (
          <Card
            className="text-center bookCard"
            border="info"
            key={book.id}
            onClick={() => {
              history.push(`/book/${book.id}`, {
                book,
              });
            }}
          >
            <div className="row no-gutters">
              <div className="col-auto">
                <img src={book.image} className="bookImg" alt="bookImg" />
              </div>
              <div className="col bookDetails">
                <h4 className="card-title bookDetailsItem">{book.name}</h4>
                <div className="card-text bookDetailsItem">
                  <span className="bookDetailsItemHeaderText">Edition: </span>
                  {book.edition}
                </div>
                <div className="card-text bookDetailsItem">
                  <span className="bookDetailsItemHeaderText">Authors: </span>
                  {book.authors[0].name}
                </div>
                <div className="card-text bookDetailsItem">
                  <span className="bookDetailsItemHeaderText">Year Published: </span>
                  {book.yearPublished}
                </div>
              </div>
              <div className="col bookDescription">
                <p className="card-text bookDescriptionItem">
                  <span className="bookDescriptionItemHeaderText">Description: </span>
                  {book.description}
                </p>
              </div>
            </div>
            <div className="card-footer w-100">
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
        <Button onClick={handleGetBookList}>
          <FontAwesomeIcon icon={faSync} style={{ marginRight: 10 }} />
          Refresh
        </Button>
        {books}
      </div>
    </div>
  );
}

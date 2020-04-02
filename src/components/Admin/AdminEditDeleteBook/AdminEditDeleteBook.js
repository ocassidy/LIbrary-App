import React from 'react';
import { BookListContainer } from '../../Book/BooksList/BooksList';

export default function AdminEditDeleteBook(props) {
  return (
    <div>
      <div className="adminEditBookContainer">
        <BookListContainer adminMode />
      </div>
    </div>
  );
}

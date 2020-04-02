import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import './AdminAddBook.css';
import axios from 'axios';
import toastr from 'toastr';
import { API_BASE_URL } from '../../../constants/constants';

export default function AdminAddBook() {
  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [publisher, setPublisher] = useState('');
  const [copies, setCopies] = useState('');
  const [copiesAvailable, setCopiesAvailable] = useState('');
  const [ISBN10, setISBN10] = useState('');
  const [ISBN13, setISBN13] = useState('');
  const [description, setDescription] = useState('');
  const [edition, setEdition] = useState('');
  const [genre, setGenre] = useState('');
  const [yearPublished, setYearPublished] = useState('');
  const [authors, setAuthors] = useState([]);

  const postAddBook = (e) => {
    e.preventDefault();

    return axios.post(`${API_BASE_URL}/book`,
      {
        image: image.trim(),
        name: title.trim(),
        subtitle: subtitle.trim(),
        publisher: publisher.trim(),
        copies: copies.trim(),
        copiesAvailable: copiesAvailable.trim(),
        isbn10: ISBN10.trim(),
        isbn13: ISBN13.trim(),
        description: description.trim(),
        edition: edition.trim(),
        genre: genre.trim(),
        yearPublished: yearPublished.trim(),
        authors: [{ name: authors }],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
        },
      })
      .then((response) => {
        toastr.success('Book Added!', 'Success', { timeOut: 10000 });
        return response.data;
      })
      .catch((error) => {
        toastr.error(error.message, 'Error');
      });
  };

  return (
    <div>
      <Form
        className="bookAddForm justify-content-center row no-gutters"
        onSubmit={(e) => postAddBook(e)}
      >
        <div className="col-sm ml-4 mr-4">
          <Form.Label>Book Image</Form.Label>
          <Form.Control
            type="text"
            className="bookBookImageInput"
            placeholder="Book Image"
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <div className="col-md ml-4 mr-4">
          <Form.Label>
            Book Title
            <span className="requiredStar"> * </span>
          </Form.Label>
          <Form.Control
            type="text"
            className="bookTitleInput"
            placeholder="Book Title"
            required
            onChange={(e) => setTitle(e.target.value)}
          />
          <Form.Label>Book Subtitle</Form.Label>
          <Form.Control
            type="text"
            className="bookSubtitleInput"
            placeholder="Book Subtitle"
            onChange={(e) => setSubtitle(e.target.value)}
          />
          <Form.Label>
            Book Publisher
            <span className="requiredStar"> * </span>
          </Form.Label>
          <Form.Control
            type="text"
            className="bookPublisherInput"
            placeholder="Book Publisher"
            required
            onChange={(e) => setPublisher(e.target.value)}
          />
          <Form.Label>
            Total Copies
            <span className="requiredStar"> * </span>
          </Form.Label>
          <Form.Control
            type="number"
            className="bookCopiesInput"
            placeholder="Total Copies"
            required
            onChange={(e) => setCopies(e.target.value)}
          />
          <Form.Label>
            Available Copies
            <span className="requiredStar"> * </span>
          </Form.Label>
          <Form.Control
            type="number"
            className="bookAvailableCopiesInput"
            placeholder="Available Copies"
            required
            onChange={(e) => setCopiesAvailable(e.target.value)}
          />
          <Form.Label>
            Authors
            <span className="requiredStar"> * </span>
          </Form.Label>
          <Form.Control
            type="text"
            className="bookAuthorsInput"
            placeholder="Authors"
            required
            onChange={(e) => setAuthors(e.target.value)}
          />
        </div>

        <div className="col-md ml-4 mr-4">
          <Form.Label>
            ISBN 10
            <span className="requiredStar"> * </span>
          </Form.Label>
          <Form.Control
            type="number"
            className="bookISBN10Input"
            placeholder="ISBN 10"
            required
            onChange={(e) => setISBN10(e.target.value)}
          />
          <Form.Label>ISBN 13</Form.Label>
          <Form.Control
            type="number"
            className="bookISBN13Input"
            placeholder="ISBN 13"
            onChange={(e) => setISBN13(e.target.value)}
          />
          <Form.Label>Book Description</Form.Label>
          <Form.Control
            as="textarea"
            rows="3"
            type="text"
            className="bookDescriptionInput"
            placeholder="Book Description"
            onChange={(e) => setDescription(e.target.value)}
          />
          <Form.Label>
            Book Edition
            <span className="requiredStar"> * </span>
          </Form.Label>
          <Form.Control
            type="text"
            className="bookEditionInput"
            placeholder="Book Edition"
            required
            onChange={(e) => setEdition(e.target.value)}
          />
          <Form.Label>
            Book Genre
            <span className="requiredStar"> * </span>
          </Form.Label>
          <Form.Control
            type="text"
            className="bookGenreInput"
            placeholder="Book Genre"
            required
            onChange={(e) => setGenre(e.target.value)}
          />
          <Form.Label>
            Year Published
            <span className="requiredStar"> * </span>
          </Form.Label>
          <Form.Control
            type="text"
            className="bookYearPublishedInput"
            placeholder="Year Published"
            required
            onChange={(e) => setYearPublished(e.target.value)}
          />
          <Button className="addBookButton" variant="primary" type="submit">
            Add Book
          </Button>
        </div>
      </Form>
    </div>
  );
}

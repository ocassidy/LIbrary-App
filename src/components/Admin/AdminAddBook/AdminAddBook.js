import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
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
  const [isbn10, setISBN10] = useState('');
  const [isbn13, setISBN13] = useState('');
  const [description, setDescription] = useState('');
  const [edition, setEdition] = useState('');
  const [genre, setGenre] = useState('');
  const [yearPublished, setYearPublished] = useState('');
  const [author, setAuthor] = useState('');

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
        isbn10: isbn10.trim(),
        isbn13: isbn13.trim(),
        description: description.trim(),
        edition: edition.trim(),
        genre: genre.trim(),
        yearPublished: yearPublished.trim(),
        author: author.trim(),
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
        },
      })
      .then((response) => {
        toastr.success('Book Added!', 'Success', { timeOut: 10000 });
        window.location.reload();
        return response.data;
      })
      .catch((error) => {
        toastr.error(error.message, 'Error');
      });
  };

  return (
    <div className="container-fluid">
      <Form
        onSubmit={(e) => postAddBook(e)}
      >
        <div className="row no-gutters">
          <div className="col-sm-12 col-md-4 col-lg-3">
            <div className="mb-2 font-weight-bold">Image Preview:</div>
            <img src={image} className="img-fluid mx-auto d-block w-75" alt="Preview will appear here once address bar is filled." />
          </div>
          <div className="col-sm-12 col-md-8 col-lg-9">
            <div className="col-12 mb-2">
              <div className="mb-2 font-weight-bold">Book Title:</div>
              <Form.Control
                type="text"
                className="bookTitleInput"
                placeholder="Book Title"
                required
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="col-12 mb-2">
              <div className="mb-2 font-weight-bold">Book Subtitle:</div>
              <Form.Control
                type="text"
                className="bookSubtitleInput"
                placeholder="Book Subtitle"
                onChange={(e) => setSubtitle(e.target.value)}
              />
            </div>
            <div className="col-12 mt-auto font-weight-bold mb-2">
              <div className="mb-2 font-weight-bold">Book Image:</div>
              <Form.Control
                type="text"
                placeholder="Book Image"
                as="textarea"
                rows="3"
                onChange={(e) => setImage(e.target.value)}
              />
            </div>
            <div className="col-12 mb-2">
              <div className="mb-2 font-weight-bold">Book Publisher:</div>
              <Form.Control
                type="text"
                className="bookPublisherInput"
                placeholder="Book Publisher"
                required
                onChange={(e) => setPublisher(e.target.value)}
              />
            </div>
            <div className="col-12 mb-2">
              <div className="mb-2 font-weight-bold">Total Copies:</div>
              <Form.Control
                type="text"
                className="bookCopiesInput"
                placeholder="Total Copies"
                required
                onChange={(e) => setCopies(e.target.value)}
              />
            </div>
            <div className="col-12 mb-2">
              <div className="mb-2 font-weight-bold">Available Copies:</div>
              <Form.Control
                type="text"
                className="bookAvailableCopiesInput"
                placeholder="Available Copies"
                required
                onChange={(e) => setCopiesAvailable(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="col-12 mb-2">
          <div className="mb-2 font-weight-bold">Author:</div>
          <Form.Control
            type="text"
            className="bookAuthorsInput"
            placeholder="Author"
            required
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div className="col-12 mb-2">
          <div className="row no-gutters">
            <div className="col-6 mr-2">
              <div className="mb-2 font-weight-bold">ISBN 10:</div>
              <Form.Control
                type="text"
                className="bookISBN10Input"
                placeholder="ISBN 10"
                required
                onChange={(e) => setISBN10(e.target.value)}
              />
            </div>
            <div className="col-5">
              <div className="mb-2 font-weight-bold">ISBN 13:</div>
              <Form.Control
                type="text"
                className="bookISBN13Input"
                placeholder="ISBN 13"
                onChange={(e) => setISBN13(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="col-12 mb-2">
          <div className="mb-2 font-weight-bold">Book Description:</div>
          <Form.Control
            type="text"
            as="textarea"
            rows="5"
            className="bookDescriptionInput"
            placeholder="Book Description"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="col-12 mb-2">
          <div className="mb-2 font-weight-bold">Book Edition:</div>
          <Form.Control
            type="text"
            className="bookEditionInput"
            placeholder="Book Edition"
            required
            onChange={(e) => setEdition(e.target.value)}
          />
        </div>
        <div className="col-12 mb-2">
          <div className="mb-2 font-weight-bold">Book Genre:</div>
          <Form.Control
            value={genre || ''}
            type="text"
            className="bookGenreInput"
            placeholder="Book Genre"
            required
            onChange={(e) => setGenre(e.target.value)}
          />
        </div>
        <div className="col-12 mb-2">
          <div className="mb-2 font-weight-bold">Year Published:</div>
          <Form.Control
            type="text"
            className="bookYearPublishedInput"
            placeholder="Year Published"
            required
            onChange={(e) => setYearPublished(e.target.value)}
          />
        </div>
        <div className="col-12 mb-2">
          <Button className="editBookButton" variant="primary" type="submit">
            Add Book
          </Button>
        </div>
      </Form>
    </div>
  );
}

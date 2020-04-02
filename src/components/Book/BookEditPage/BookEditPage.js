import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { push } from 'connected-react-router';
import { getBook, putEditBook } from '../../../redux/actions';
import './BookEditPage.css';

function BookEditPage(props) {
  const [image, setImage] = useState();
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
  const [authors, setAuthors] = useState([]);
  const { id } = useParams();
  const { book, handleGetBook, onPutBook } = props;

  useEffect(() => {
    handleGetBook(id);
  }, [id, handleGetBook]);

  useEffect(() => {
    if (book) {
      setImage(book.image);
      setTitle(book.name);
      setSubtitle(book.subtitle);
      setPublisher(book.publisher);
      setCopies(book.copies);
      setCopiesAvailable(book.copies);
      setISBN10(book.isbn10);
      setISBN13(book.isbn13);
      setDescription(book.description);
      setEdition(book.edition);
      setGenre(book.genre);
      setYearPublished(book.yearPublished);
      setAuthors(book.authors);
    }
  }, [book]);

  return (
    <div>
      {book
        ? (
          <div className="bookEditContainer">
            <Form
              className="bookEditForm"
              onSubmit={(e) => onPutBook(e, book.id, image, title, subtitle, publisher, copies, copiesAvailable,
                isbn10, isbn13, description, edition, genre, yearPublished, authors)}
            >
              <h4>Book ID: {book.id}</h4>
              <Form.Label>Book Image:</Form.Label>
              <Form.Control
                value={image || ''}
                type="text"
                className="bookBookImageInput"
                placeholder="Book Image"
                onChange={(e) => setImage(e.target.value)}
              />
              <Form.Label>Book Title:</Form.Label>
              <Form.Control
                value={title || ''}
                type="text"
                className="bookTitleInput"
                placeholder="Book Title"
                required
                onChange={(e) => setTitle(e.target.value)}
              />
              <Form.Label>Book Subtitle:</Form.Label>
              <Form.Control
                value={subtitle || ''}
                type="text"
                className="bookSubtitleInput"
                placeholder="Book Subtitle"
                onChange={(e) => setSubtitle(e.target.value)}
              />
              <Form.Label>Book Publisher:</Form.Label>
              <Form.Control
                value={publisher || ''}
                type="text"
                className="bookPublisherInput"
                placeholder="Book Publisher"
                required
                onChange={(e) => setPublisher(e.target.value)}
              />
              <Form.Label>Total Copies:</Form.Label>
              <Form.Control
                value={copies || ''}
                type="text"
                className="bookCopiesInput"
                placeholder="Total Copies"
                required
                onChange={(e) => setCopies(e.target.value)}
              />
              <Form.Label>Available Copies:</Form.Label>
              <Form.Control
                value={copiesAvailable || ''}
                type="text"
                className="bookAvailableCopiesInput"
                placeholder="Available Copies"
                required
                onChange={(e) => setCopiesAvailable(e.target.value)}
              />
              <Form.Label>Authors:</Form.Label>
              <Form.Control
                value={book.authors[0].name || ''}
                type="text"
                className="bookAuthorsInput"
                placeholder="Authors"
                required
                onChange={(e) => setAuthors(e.target.value)}
              />
              <Form.Label>ISBN 10:</Form.Label>
              <Form.Control
                value={isbn10 || ''}
                type="text"
                className="bookISBN10Input"
                placeholder="ISBN 10"
                required
                onChange={(e) => setISBN10(e.target.value)}
              />
              <Form.Label>ISBN 13:</Form.Label>
              <Form.Control
                value={isbn13 || ''}
                type="text"
                className="bookISBN13Input"
                placeholder="ISBN 13"
                onChange={(e) => setISBN13(e.target.value)}
              />
              <Form.Label>Book Description:</Form.Label>
              <Form.Control
                value={description || ''}
                type="text"
                as="textarea"
                rows="5"
                className="bookDescriptionInput"
                placeholder="Book Description"
                onChange={(e) => setDescription(e.target.value)}
              />
              <Form.Label>Book Edition:</Form.Label>
              <Form.Control
                value={edition || ''}
                type="text"
                className="bookEditionInput"
                placeholder="Book Edition"
                required
                onChange={(e) => setEdition(e.target.value)}
              />
              <Form.Label>Book Genre:</Form.Label>
              <Form.Control
                value={genre || ''}
                type="text"
                className="bookGenreInput"
                placeholder="Book Genre"
                required
                onChange={(e) => setGenre(e.target.value)}
              />
              <Form.Label>Year Published:</Form.Label>
              <Form.Control
                value={yearPublished || ''}
                type="text"
                className="bookYearPublishedInput"
                placeholder="Year Published"
                required
                onChange={(e) => setYearPublished(e.target.value)}
              />
              <Button className="editBookButton" variant="primary" type="submit">
                Save Edits
              </Button>
            </Form>
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
});

const mapDispatchToProps = (dispatch) => ({
  handleGetBook: (id) => {
    dispatch(getBook(id));
  },
  onPutBook: (e, id, image, title, subtitle, publisher, copies, copiesAvailable,
    isbn10, isbn13, description, edition, genre, yearPublished, authors) => {
    e.preventDefault();

    const editBookRequest = {
      id,
      image,
      title,
      subtitle,
      publisher,
      copies,
      copiesAvailable,
      isbn10,
      isbn13,
      description,
      edition,
      genre,
      yearPublished,
      authors,
    };
    dispatch(putEditBook(editBookRequest));
    dispatch(push('/books'));
    window.location.reload();
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(BookEditPage);

import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { push } from 'connected-react-router';
import { putEditBook } from '../../../redux/actions/AdminActions';
import { getBook } from '../../../redux/actions/BookActions';

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
  const [author, setAuthor] = useState('');
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
      setAuthor(book.author);
    }
  }, [book]);

  return (
    <div className="container-fluid">
      {book
        ? (
          <Form
            onSubmit={(e) => onPutBook(e, book.id, image, title, subtitle, publisher,
              copies, copiesAvailable, isbn10, isbn13, description,
              edition, genre, yearPublished, author)}
          >
            <div className="row no-gutters">
              <div className="col-sm-12 col-md-4 col-lg-3">
                <div className="mb-2 font-weight-bold">Image Preview:</div>
                <img src={image} className="img-fluid mx-auto d-block w-75" alt="bookImg" />
              </div>
              <div className="col-sm-12 col-md-8 col-lg-9">
                <div className="col-12 mb-2 mt-2 font-weight-bold">Book ID: {book.id}</div>
                <div className="col-12 mb-2">
                  <div className="mb-2 font-weight-bold">Book Title:</div>
                  <Form.Control
                    value={title || ''}
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
                    value={subtitle || ''}
                    type="text"
                    className="bookSubtitleInput"
                    placeholder="Book Subtitle"
                    onChange={(e) => setSubtitle(e.target.value)}
                  />
                </div>
                <div className="col-12 mt-auto font-weight-bold mb-2">
                  <div className="mb-2 font-weight-bold">Book Image:</div>
                  <Form.Control
                    value={image || ''}
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
                    value={publisher || ''}
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
                    value={copies || ''}
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
                    value={copiesAvailable || ''}
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
                value={author || ''}
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
                    value={isbn10 || ''}
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
                    value={isbn13 || ''}
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
                value={description || ''}
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
                value={edition || ''}
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
                value={yearPublished || ''}
                type="text"
                className="bookYearPublishedInput"
                placeholder="Year Published"
                required
                onChange={(e) => setYearPublished(e.target.value)}
              />
            </div>
            <div className="col-12 mb-2 font-weight-bold">
              <Button className="editBookButton" variant="primary" type="submit">
                Save Edits
              </Button>
            </div>
          </Form>
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
    isbn10, isbn13, description, edition, genre, yearPublished, author) => {
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
      author,
    };
    dispatch(putEditBook(editBookRequest));
    dispatch(push('/books'));
    window.location.reload();
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(BookEditPage);

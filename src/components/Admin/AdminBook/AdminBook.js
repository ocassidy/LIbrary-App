import React from 'react';
import { connect } from 'react-redux';
import {
  Button, Container, Jumbotron,
} from 'react-bootstrap';
import './AdminBook.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import { push } from 'connected-react-router';

function AdminBook(props) {
  const {
    gotoAddBook, gotoEditDeleteBook,
  } = props;
  return (
    <div>
      <Jumbotron className="adminBookJumbotron">
        <Container className="bookJumbotronContainer">
          <FontAwesomeIcon size="2x" icon={faPlus} style={{ marginRight: 10 }} />
          <h3 className="bookJumbotronContainerTitleText">Add Book</h3>
          <Button
            size="lg"
            className="bookJumbotronContainerButton"
            variant="primary"
            onClick={() => gotoAddBook()}
          >
            Add Book
          </Button>
        </Container>
      </Jumbotron>
      <Jumbotron className="adminBookJumbotron">
        <Container className="bookJumbotronContainer">
          <FontAwesomeIcon size="2x" icon={faEdit} style={{ marginRight: 10 }} />
          <h3 className="bookJumbotronContainerTitleText">Edit/Delete Book</h3>
          <Button
            size="lg"
            className="bookJumbotronContainerButton"
            variant="info"
            onClick={() => gotoEditDeleteBook()}
          >
            Edit/Delete Book
          </Button>
        </Container>
      </Jumbotron>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  gotoAddBook: () => {
    dispatch(push('/admin/book-add'));
  },
  gotoEditDeleteBook: () => {
    dispatch(push('/admin/book-edit-delete'));
  },
});

export default connect(null, mapDispatchToProps)(AdminBook);

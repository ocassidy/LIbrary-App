import React from 'react';
import { connect } from 'react-redux';
import {
  Button, Container, Jumbotron,
} from 'react-bootstrap';
import './BookAdmin.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import NavBar from '../Shared/NavBar';


function BookAdmin(props) {
  return (
    <div>
      <NavBar />
      <Jumbotron className="bookJumbotron">
        <Container className="bookJumbotronContainer">
          <FontAwesomeIcon size="2x" icon={faPlus} style={{ marginRight: 10 }} />
          <h1 className="bookJumbotronContainerTitleText">Add Book</h1>
          <Button size="lg" className="bookJumbotronContainerButton" variant="primary">Add Book</Button>
        </Container>
      </Jumbotron>
      <Jumbotron className="bookJumbotron">
        <Container className="bookJumbotronContainer">
          <FontAwesomeIcon size="2x" icon={faEdit} style={{ marginRight: 10 }} />
          <h1 className="bookJumbotronContainerTitleText">Edit Book</h1>
          <Button size="lg" className="bookJumbotronContainerButton" variant="info">Edit Book</Button>
        </Container>
      </Jumbotron>
      <Jumbotron className="bookJumbotron">
        <Container className="bookJumbotronContainer">
          <FontAwesomeIcon size="2x" icon={faTrash} style={{ marginRight: 10 }} />
          <h1 className="bookJumbotronContainerTitleText">Delete Book</h1>
          <Button size="lg" className="bookJumbotronContainerButton" variant="danger">Delete Book</Button>
        </Container>
      </Jumbotron>
    </div>
  );
}

export default connect(null, null)(BookAdmin);

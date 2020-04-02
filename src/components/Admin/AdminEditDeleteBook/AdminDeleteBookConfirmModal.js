import React from 'react';
import { Button, Modal } from 'react-bootstrap';

export default function AdminDeleteBookConfirmModal(props) {
  const {
    show, onHide, handleDeleteBook, bookToDelete,
  } = props;

  return (
    <div>
      <Modal
        show={show}
        onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Confirm Delete
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {bookToDelete
            ? <h4>Are you sure you wish to delete book {bookToDelete.name} with ID {bookToDelete.id}?</h4>
            : null}
          <div>
            Note: This is a destructive action that cannot be undone.
          </div>
          <div>
            Deleting a book will also delete its associated loans.
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => onHide()}>Close</Button>
          <Button
            variant="danger"
            onClick={() => {
              handleDeleteBook(bookToDelete.id);
              onHide();
            }}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

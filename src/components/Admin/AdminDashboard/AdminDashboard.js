import React, { useState } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCaretDown, faCaretUp, faChartBar, faEdit, faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { Button, Container, Jumbotron } from 'react-bootstrap';
import { push } from 'connected-react-router';

function AdminDashboard(props) {
  const [openAdminBook, setOpenAdminBooks] = useState(false);
  const [openAdminAnalytics, setOpenAdminAnalytics] = useState(false);
  const [openAdminUsers, setOpenAdminUsers] = useState(false);
  const { gotoEditDeleteBook, gotoAddBook, gotoBookAnalytics, gotoUserManagement } = props;

  return (
    <div className="container-fluid">
      <div className="row no-gutters justify-content-center text-center">
        <div className="col">
          <div className="col border border-dark rounded ml-auto mr-auto w-75">
            <div className="h4 m-2">Toggles:</div>
            <Button
              onClick={() => setOpenAdminBooks(!openAdminBook)}
              variant="light"
              className="m-2"
            >
              {openAdminBook ? 'Close Book Section' : 'Open Book Section'}
              {openAdminBook
                ? <FontAwesomeIcon icon={faCaretUp} className="ml-2" />
                : <FontAwesomeIcon icon={faCaretDown} className="ml-2" />}
            </Button>

            <Button
              onClick={() => setOpenAdminAnalytics(!openAdminAnalytics)}
              variant="light"
              className="m-2"
            >
              {openAdminAnalytics ? 'Close Analytics Section' : 'Open Analytics Section'}
              {openAdminAnalytics
                ? <FontAwesomeIcon icon={faCaretUp} className="ml-2" />
                : <FontAwesomeIcon icon={faCaretDown} className="ml-2" />}
            </Button>

            <Button
              onClick={() => setOpenAdminUsers(!openAdminUsers)}
              variant="light"
              className="m-2"
            >
              {openAdminUsers ? 'Close User Section' : 'Open User Section'}
              {openAdminUsers
                ? <FontAwesomeIcon icon={faCaretUp} className="ml-2" />
                : <FontAwesomeIcon icon={faCaretDown} className="ml-2" />}
            </Button>
          </div>

          <div className="col-12">
            <div className="row no-gutters justify-content-center">
              <div className="col-sm-12 col-md-12 col-lg-4">
                {openAdminBook ? (
                  <div>
                    <Jumbotron className="m-2">
                      <Container className="row no-gutters justify-content-center align-content-center">
                        <FontAwesomeIcon size="2x" icon={faPlus} className="col-2 mb-2" />
                        <div className="col-auto h4 mb-2">Add Book</div>
                        <div className="col-12 mb-2">
                          <Button
                            size="lg"
                            variant="primary"
                            className="btn btn-block"
                            onClick={() => gotoAddBook()}
                          >
                            Add Book
                          </Button>
                        </div>
                      </Container>
                    </Jumbotron>
                    <Jumbotron className="m-2">
                      <Container className="row no-gutters justify-content-center align-content-center">
                        <FontAwesomeIcon size="2x" icon={faEdit} className="col-2 mb-2" />
                        <div className="col-auto h4 mb-2">Edit/Delete Book</div>
                        <div className="col-12 mb-2">
                          <Button
                            size="lg"
                            variant="info"
                            className="btn btn-block"
                            onClick={() => gotoEditDeleteBook()}
                          >
                            Edit/Delete Book
                          </Button>
                        </div>
                      </Container>
                    </Jumbotron>
                  </div>
                ) : null}
              </div>
              <div className="col-sm-12 col-md-12 col-lg-4">
                {openAdminAnalytics ? (
                  <div>
                    <Jumbotron className="m-2">
                      <Container className="row no-gutters justify-content-center align-content-center">
                        <FontAwesomeIcon size="2x" icon={faChartBar} className="col-2" />
                        <div className="col-auto h4">Book Analytics</div>
                        <div className="col-12">
                          <Button
                            size="lg"
                            className="btn btn-block"
                            variant="danger"
                            onClick={() => gotoBookAnalytics()}
                          >
                            View Book Analytics
                          </Button>
                        </div>
                      </Container>
                    </Jumbotron>
                  </div>
                ) : null}
              </div>
              <div className="col-sm-12 col-md-12 col-lg-4">
                {openAdminUsers
                  ? (
                    <Jumbotron className="m-2">
                      <Container className="row no-gutters justify-content-center align-content-center">
                        <FontAwesomeIcon size="2x" icon={faChartBar} className="col-2" />
                        <div className="col-auto h4">User Management</div>
                        <div className="col-12">
                          <Button
                            size="lg"
                            className="btn btn-block"
                            variant="info"
                            onClick={() => gotoUserManagement()}
                          >
                            View User Management
                          </Button>
                        </div>
                      </Container>
                    </Jumbotron>
                  ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  gotoUserManagement: () => {
    dispatch(push('/admin/users'));
  },
  gotoBookAnalytics: () => {
    dispatch(push('/admin/analytics'));
  },
  gotoAddBook: () => {
    dispatch(push('/admin/book-add'));
  },
  gotoEditDeleteBook: () => {
    dispatch(push('/admin/book-edit-delete'));
  },
});

export default connect(null, mapDispatchToProps)(AdminDashboard);

import React, { useState } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';
import AdminBook from '../AdminBook/AdminBook';
import AdminAnalytics from '../AdminAnalytics/AdminAnalytics';

function AdminDashboard(props) {
  const [openAdminBook, setOpenAdminBooks] = useState(false);
  const [openAdminAnalytics, setOpenAdminAnalytics] = useState(false);
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
          </div>

          <div className="col-12">
            <div className="row no-gutters justify-content-center">
              <div className="col-sm-12 col-md-4 col-lg-auto">
                {openAdminBook ? <AdminBook /> : null}
              </div>
              <div className="col-sm-12 col-md-4 col-lg-auto">
                {openAdminAnalytics ? <AdminAnalytics /> : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default connect(null, null)(AdminDashboard);

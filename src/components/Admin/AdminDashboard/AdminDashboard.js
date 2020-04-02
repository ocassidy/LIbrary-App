import React, { useState } from 'react';
import { connect } from 'react-redux';
import './AdminDashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';
import AdminBook from '../AdminBook/AdminBook';
import AdminAnalytics from '../AdminAnalytics/AdminAnalytics';

function AdminDashboard(props) {
  const [openAdminBook, setOpenAdminBooks] = useState(false);
  const [openAdminAnalytics, setOpenAdminAnalytics] = useState(false);
  return (
    <div>
      <div className="adminDashboardContainer">
        <div className="adminDashboardButtonContainer">
          <div className="adminDashboardButtonContainerTitle">Toggles:</div>
          <Button
            onClick={() => setOpenAdminBooks(!openAdminBook)}
            variant="light"
            className="adminBooksToggleButton"
          >
            {openAdminBook ? 'Close Book Section' : 'Open Book Section'}
            {openAdminBook
              ? <FontAwesomeIcon icon={faCaretUp} style={{ marginLeft: 10 }} />
              : <FontAwesomeIcon icon={faCaretDown} style={{ marginLeft: 10 }} />}
          </Button>

          <Button
            onClick={() => setOpenAdminAnalytics(!openAdminAnalytics)}
            variant="light"
            className="adminAnalyticsToggleButton"
          >
            {openAdminAnalytics ? 'Close Analytics Section' : 'Open Analytics Section'}
            {openAdminAnalytics
              ? <FontAwesomeIcon icon={faCaretUp} style={{ marginLeft: 10 }} />
              : <FontAwesomeIcon icon={faCaretDown} style={{ marginLeft: 10 }} />}
          </Button>
        </div>

        {openAdminBook ? <AdminBook /> : null}
        {openAdminAnalytics ? <AdminAnalytics /> : null}
      </div>
    </div>
  );
}

export default connect(null, null)(AdminDashboard);

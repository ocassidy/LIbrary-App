import React from 'react';
import { connect } from 'react-redux';
import {
  Button, Container, Jumbotron,
} from 'react-bootstrap';
import './AdminAnalytics.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar } from '@fortawesome/free-solid-svg-icons';
import { push } from 'connected-react-router';

function AdminAnalytics(props) {
  const { gotoBookAnalytics } = props;
  return (
    <div className="adminAnalyticsContainer">
      <Jumbotron className="analyticsJumbotron">
        <Container className="bookJumbotronContainer">
          <FontAwesomeIcon size="2x" icon={faChartBar} style={{ marginRight: 10 }} />
          <h3 className="bookJumbotronContainerTitleText">Book Analytics</h3>
          <Button
            size="lg"
            className="bookJumbotronContainerButton"
            variant="danger"
            onClick={() => gotoBookAnalytics()}
          >
            View Book Analytics
          </Button>
        </Container>
      </Jumbotron>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  gotoBookAnalytics: () => {
    dispatch(push('/admin/analytics/books'));
  },
});

export default connect(null, mapDispatchToProps)(AdminAnalytics);

import React, { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import NavBar from '../Shared/NavBar';
import { logout } from '../../redux/actions';
import './Profile.css';

function Profile(props) {
  const [isLoading, setIsLoading] = useState(true);

  const { currentUser, onHandleLogout } = props;

  useEffect(() => {
    setIsLoading(false);
  }, [currentUser]);

  return (
    <div>
      {isLoading && !currentUser
        ? (
          <div>
            <Spinner animation="border" role="status" />
            <div>
              Loading Please Wait...
            </div>
          </div>
        )
        : (
          <div className="profileDiv">
            <NavBar />
            {currentUser ? `Hi ${currentUser.username}` : null}
            <div>
              <Button onClick={() => onHandleLogout()}>Logout</Button>
            </div>
          </div>
        )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  currentUser: state.userDetails.currentUser,
  isAuthenticated: state.userDetails.isAuthenticated,
  isLoading: state.userDetails.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  onHandleLogout: () => {
    dispatch(logout());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

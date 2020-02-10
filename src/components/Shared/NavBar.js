import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './NavBar.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { logout } from '../../redux/actions';

function NavBar(props) {
  const { currentUser, onHandleLogout } = props;

  return (
    <div className="navbarDiv">
      <Navbar sticky="top" bg="light" variant="light">
        <Navbar.Brand href="/">Library</Navbar.Brand>
        <Nav className="mr-auto">
          <Link className="nav-link" to={`/user/profile/${currentUser.username}`}>Profile</Link>
          <Link className="nav-link" to="/books">Books</Link>
          <Link className="nav-link" to="/search">Search</Link>
        </Nav>
        <Button variant="outline-dark" onClick={() => onHandleLogout()}>Logout</Button>
      </Navbar>
    </div>
  );
}

const mapStateToProps = (state) => ({
  currentUser: state.userDetails.currentUser,
  isAuthenticated: state.userDetails.isAuthenticated,
  hasLoadedUser: state.userDetails.hasLoadedUser,
});

const mapDispatchToProps = (dispatch) => ({
  onHandleLogout: () => {
    dispatch(logout());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);

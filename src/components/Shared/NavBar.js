import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './NavBar.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, NavDropdown } from 'react-bootstrap';
import { push } from 'connected-react-router';
import { logout } from '../../redux/actions';

function NavBar(props) {
  const {
    currentUser, onHandleLogout, isAdmin, onHandleLogin,
  } = props;

  return (
    <div className="navbarDiv">
      <Navbar sticky="top" bg="light" variant="light">
        <Navbar.Brand href="/">Library</Navbar.Brand>
        <Nav className="mr-auto">
          {currentUser ? <Link className="nav-link" to={`/user/profile/${currentUser.username}`}>Profile</Link> : null}
          <Link className="nav-link" to="/books">Books</Link>
          {isAdmin === true
            ? (
              <NavDropdown title="Admin" id="basic-nav-dropdown">
                <Link className="dropdown-item" to="/admin/books">Book</Link>
                <Link className="dropdown-item" to="/admin/users">Users</Link>
              </NavDropdown>
            )
            : null}

          {isAdmin === true
            ? (
              <NavDropdown title="Analytics" id="basic-nav-dropdown">
                <Link className="dropdown-item" to="/analytics/books">Book</Link>
                <Link className="dropdown-item" to="/analytics/users">Users</Link>
              </NavDropdown>
            ) : null}
        </Nav>
        {currentUser
          ? <Button variant="outline-dark" onClick={() => onHandleLogout()}>Logout</Button>
          : <Button variant="outline-dark" onClick={() => onHandleLogin()}>Login</Button>}
      </Navbar>
    </div>
  );
}

const mapStateToProps = (state) => ({
  currentUser: state.userDetails.currentUser,
  isAuthenticated: state.userDetails.isAuthenticated,
  hasLoadedUser: state.userDetails.hasLoadedUser,
  isAdmin: state.userDetails.isAdmin,
});

const mapDispatchToProps = (dispatch) => ({
  onHandleLogout: () => {
    dispatch(logout());
  },
  onHandleLogin: () => {
    dispatch(push('/login'));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);

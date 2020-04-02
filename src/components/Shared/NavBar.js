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
  const { currentUser, onHandleLogout, isAdmin, gotoLogin, gotoRegister} = props;

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
                <Link className="dropdown-item" to="/admin/dashboard">Dashboard</Link>
              </NavDropdown>
            )
            : null}
        </Nav>
        {currentUser
          ? <Button className="navBarButton" variant="outline-dark" onClick={() => onHandleLogout()}>Logout</Button>
          : <Button className="navBarButton" variant="outline-dark" onClick={() => gotoLogin()}>Login</Button>}
        {currentUser
          ? null
          : <Button className="navBarButton" variant="outline-dark" onClick={() => gotoRegister()}>Register</Button>}
      </Navbar>
    </div>
  );
}

const mapStateToProps = (state) => ({
  currentUser: state.authDetails.currentUser,
  isAuthenticated: state.authDetails.isAuthenticated,
  hasLoadedUser: state.authDetails.hasLoadedUser,
  isAdmin: state.authDetails.isAdmin,
});

const mapDispatchToProps = (dispatch) => ({
  onHandleLogout: () => {
    dispatch(logout());
  },
  gotoLogin: () => {
    dispatch(push('/login'));
  },
  gotoRegister: () => {
    dispatch(push('/login'));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);

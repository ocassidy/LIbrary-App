import React from 'react';
import './NavBar.css';
import NavBar from './NavBar';

function Forbidden() {
  return (
    <div>
      <NavBar />
      <h2>403 Forbidden</h2>
      You do not have permission to access this page
      <div>
        <a href="/">Click here to return home</a>
      </div>
    </div>
  );
}

export default Forbidden;

import React from 'react';
import './NavBar.css';

function NotFound() {
  return (
    <div>
      <h2>404 Not Found</h2>
      Sorry we could not find the page you were looking for.
      <div>
        <a href="/">Click here to return home</a>
      </div>
    </div>
  );
}

export default NotFound;

import React from 'react';

function Forbidden() {
  return (
    <div className="text-center">
      <div className="h2">403 Forbidden</div>
      You do not have permission to access this page
      <div>
        <a href="/">Click here to return home</a>
      </div>
    </div>
  );
}

export default Forbidden;

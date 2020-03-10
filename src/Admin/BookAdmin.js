import React from 'react';
import { connect } from 'react-redux';
import NavBar from '../components/Shared/NavBar';


function BookAdmin(props) {
  return (
    <div>
      <NavBar />
      Test
    </div>
  );
}

export default connect(null, null)(BookAdmin);

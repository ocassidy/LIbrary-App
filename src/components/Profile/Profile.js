import React, {Component} from 'react'

export default class Profile extends Component {
  render() {
    console.log('inside protected route');
    return (
      <div className="loginForm">
        <h2>Dashboard</h2>
        <div className="formInfoText">
          Hello {this.props.username ? this.props.username : undefined} dashboard.
        </div>
      </div>
    );
  }
}
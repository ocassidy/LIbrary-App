import React, {Component} from 'react';
import Spinner from 'react-bootstrap/Spinner';
import {Button} from "react-bootstrap";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    if (this.props.currentUser) {
      this.setState({
        isLoading: false,
      });
    } else if (this.props.currentUser === null) {
      this.setState({
        isLoading: false,
      });
    }
  }

  render() {
    const {currentUser, isLoading, onHandleLogout} = this.props;
    return (
      <div>
        {isLoading && !currentUser
          ? (
            <div>
              <Spinner animation="border" role="status" className="isLoadingSpinner"/>
              <div>
                Loading Please Wait...
              </div>
            </div>
          )
          : (
            <div>
              {currentUser ? `Hi ${currentUser.username}` : null}
              <div>
                <Button onClick={() => onHandleLogout()}>Logout</Button>
              </div>
            </div>
          )}
      </div>
    );
  }
}

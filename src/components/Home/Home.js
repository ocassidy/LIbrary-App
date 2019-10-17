import React, {Component} from 'react';
import Spinner from "react-bootstrap/Spinner";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      error: false
    }
  }

  async componentDidMount() {
    await this.props.location.state.currentUser;

    if (this.props.location.state.currentUser) {
      this.setState({
        isLoading: false
      })
    }
    else if (this.props.location.state.currentUser === null) {
      this.setState({
        isLoading: false,
        error: true
      })
    }
  }

  render() {
    const currentUser = this.props.location.state.currentUser;
    return (
      <div>
        {this.state.isLoading ?
          <div>
            <Spinner animation="border" role="status" className="isLoadingSpinner"/>
            <div>
              Loading Please Wait...
            </div>
          </div>
          :
          <div>
            Hi {currentUser ? currentUser : null}!
          </div>
        }
      </div>
    )
  }
}

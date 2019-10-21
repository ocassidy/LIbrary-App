import React, { Component } from 'react';
import Spinner from 'react-bootstrap/Spinner';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  async componentDidMount() {
    const { props, setState } = this;
    await props.location.state.currentUser;

    if (props.location.state.currentUser) {
      this.setState({
        isLoading: false,
      });
    } else if (props.location.state.currentUser === null) {
      setState({
        isLoading: false,
      });
    }
  }

  render() {
    const { props, state } = this;
    const { currentUser } = props.location.state;
    return (
      <div>
        {state.isLoading
          ? (
            <div>
              <Spinner animation="border" role="status" className="isLoadingSpinner" />
              <div>
              Loading Please Wait...
              </div>
            </div>
          )
          : (
            <div>
              Hi
              { currentUser || null }
            </div>
          )}
      </div>
    );
  }
}

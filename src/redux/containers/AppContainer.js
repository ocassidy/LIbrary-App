import {connect} from 'react-redux';
import App from '../../App';
import {getCurrentUser} from '../actions';

const mapStateToProps = (state) => {
  return {
    currentUser: state.userDetails.currentUser,
    isAuthenticated: state.userDetails.isAuthenticated,
    isLoading: state.userDetails.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onStartAppCheckForCurrentUser: () => {
    dispatch(getCurrentUser());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

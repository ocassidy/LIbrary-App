import { connect } from 'react-redux';
import App from '../../App';
import { getCurrentUser } from '../actions';

const mapStateToProps = (state) => ({
  currentUser: state.login[0] ? state.login[0].currentUser : null,
  isAuthenticated: state.login[0] ? state.login[0].isAuthenticated : false,
  isLoading: state.login[0] ? state.login[0].isLoading : false,
});

const mapDispatchToProps = (dispatch) => ({
  onStartAppCheckForCurrentUser: () => {
    dispatch(getCurrentUser());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

import { connect } from 'react-redux';
import Profile from '../../components/Profile/Profile';
import { logout } from '../actions';

const mapStateToProps = (state) => ({
  currentUser: state.userDetails.currentUser,
  isAuthenticated: state.userDetails.isAuthenticated,
  isLoading: state.userDetails.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  onHandleLogout: () => {
    dispatch(logout());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

import {connect} from 'react-redux';
import {postLogin} from '../actions';
import Login from '../../components/Login/Login';

const mapStateToProps = (state) => {
  return {
    currentUser: state.userDetails.currentUser,
    isAuthenticated: state.userDetails.isAuthenticated,
    hasLoadedUser: state.userDetails.hasLoadedUser,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onHandleLogin: (usernameOrEmail, password) => {
    dispatch(postLogin(usernameOrEmail, password));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

import { connect } from 'react-redux';
import { postLogin } from '../actions';
import Login from '../../components/Login/Login';

const mapStateToProps = (state) => ({
  currentUser: state.login[0] ? state.login[0].currentUser : null,
  isAuthenticated: state.login[0] ? state.login[0].isAuthenticated : false,
  isLoading: state.login[0] ? state.login[0].isLoading : false,
});

const mapDispatchToProps = (dispatch) => ({
  onHandleLogin: (usernameOrEmail, password) => {
    dispatch(postLogin(usernameOrEmail, password));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

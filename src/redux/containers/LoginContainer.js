import {connect} from 'react-redux'
import {getCurrentUser, postLogin} from '../actions'
import Login from '../../components/Login/Login'

const mapStateToProps = (state, props) => {
  console.log('inside mapStateToProps', state, props);
  return {
    token: localStorage.getItem('ACCESS_TOKEN'),
    data: {usernameOrEmail: state.usernameOrEmail, password: state.password}
  }
};

const mapDispatchToProps = (dispatch) => {
  console.log('inside mapDispatchToProps');
  return {
    onGetCurrentUser: (token) => {
      dispatch(getCurrentUser(localStorage.getItem('ACCESS_TOKEN')));
    },
    onHandleLogin: (usernameOrEmail, password) => {
      console.log('inside onHandleLogin container', usernameOrEmail, password);
      dispatch(postLogin(usernameOrEmail, password));
      dispatch(getCurrentUser(localStorage.getItem('ACCESS_TOKEN')));
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)

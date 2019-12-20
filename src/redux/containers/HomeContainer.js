import {connect} from 'react-redux';
import Home from '../../components/Home/Home';
import {logout} from "../actions";

const mapStateToProps = (state) => {
  return {
    currentUser: state.userDetails.currentUser,
    isAuthenticated: state.userDetails.isAuthenticated,
    isLoading: state.userDetails.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onHandleLogout: () => {
    dispatch(logout());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);

import { connect } from 'react-redux';
import { getCurrentUser } from '../actions';
import ProtectedRoute from '../../components/ProtectedRoute/ProtectedRoute';

const mapDispatchToProps = (dispatch) => ({
  onStartAppCheckForCurrentUser: () => {
    dispatch(getCurrentUser());
  },
});

export default connect(null, mapDispatchToProps)(ProtectedRoute());

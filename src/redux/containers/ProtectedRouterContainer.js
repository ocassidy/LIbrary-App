import { connect } from 'react-redux';
import ProtectedRoute from '../../components/ProtectedRoute/ProtectedRoute';

const mapStateToProps = (state) => ({
  currentUser: state.userDetails.currentUser,
  isAuthenticated: state.userDetails.isAuthenticated,
  hasLoadedUser: state.userDetails.hasLoadedUser,
});

export default connect(mapStateToProps, null)(ProtectedRoute);

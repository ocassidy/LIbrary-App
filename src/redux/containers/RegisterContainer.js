import { connect } from 'react-redux';
import { postRegister } from '../actions';
import Register from '../../components/Register/Register';

const mapDispatchToProps = (dispatch) => ({
  onHandleRegister: (registerRequest) => {
    dispatch(postRegister(registerRequest));
  },
});

export default connect(null, mapDispatchToProps)(Register);

import {postRegister} from "../actions";
import {connect} from "react-redux";
import Register from "../../components/Register/Register";

const mapDispatchToProps = (dispatch) => {
  return {
    onHandleRegister: (registerRequest) => {
      dispatch(postRegister(registerRequest));
    }
  }
};

export default connect(null, mapDispatchToProps)(Register)

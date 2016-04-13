import { bindActionCreators } from 'redux';
import { signUpRequest, signOutRequest, signInRequest } from './duck';

export default dispatch => bindActionCreators(
  { signUpRequest, signOutRequest, signInRequest },
  dispatch
);

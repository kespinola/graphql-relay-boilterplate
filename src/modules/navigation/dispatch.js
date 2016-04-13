import { toggleNav, changeRoute } from './duck';
import { bindActionCreators } from 'redux';

export default dispatch => bindActionCreators({ toggleNav, changeRoute }, dispatch);

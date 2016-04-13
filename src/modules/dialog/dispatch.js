import { showDialog, hideDialog } from './duck';

export default scope => dispatch => ({
  showDialog: () => dispatch(showDialog(scope)),
  hideDialog: () => dispatch(hideDialog(scope)),
});

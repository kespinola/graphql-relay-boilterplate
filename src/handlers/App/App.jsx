import Relay from 'react-relay';
import React, { PropTypes } from 'react';
import { compose, isEmpty } from 'ramda';
import {
  AppCanvas,
  AppBar,
  LeftNav,
  MenuItem,
  RaisedButton,
  ToolbarGroup,
  FlatButton,
  IconMenu,
  Avatar,
  List,
  ListItem,
} from 'material-ui';
import { SelectableContainerEnhance } from 'material-ui/lib/hoc/selectable-enhance';
import navControl from './../../modules/navigation/interface';
import authControl from './../../modules/auth/interface';
const SelectableList = SelectableContainerEnhance(List);

function App(props) {
  const {
    children,
    navControls: {
      actions: { toggleNav, changeRoute },
      open,
    },
    auth: {
      actions: { signOutRequest },
    },
    history: { push },
    location: { pathname },
    user,
    isAdmin,
  } = props;
  const goHome = push.bind(null, '/');
  const goSignIn = push.bind(null, '/sign-in');
  const goSignUp = push.bind(null, '/sign-up');
  const goAccount = push.bind(null, '/account');
  const onRequestChangeList = (e, value) => {
    if (value) { changeRoute(value); }
  };

  const { initials } = user;
  return (
    <AppCanvas>
        <AppBar
          onTitleTouchTap={goHome}
          title="Prism"
          onLeftIconButtonTouchTap={toggleNav}
          iconElementRight={!isEmpty(user) ? (
            <ToolbarGroup>
              <IconMenu
                iconButtonElement={
                  <Avatar>{initials && initials}</Avatar>
                }
                anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
                targetOrigin={{ horizontal: 'left', vertical: 'top' }}
              >
                <MenuItem primaryText="Account" onClick={goAccount} />
                <MenuItem primaryText="Logout" onClick={signOutRequest} />
              </IconMenu>
            </ToolbarGroup>
          ) : (
            <ToolbarGroup>
              <FlatButton
                primary
                label="Sign In"
                onClick={goSignIn}
              />
              <RaisedButton
                primary
                label="Sign Up"
                onClick={goSignUp}
              />
            </ToolbarGroup>
          )}
        />
      <LeftNav
        docked={false}
        open={open}
        onRequestChange={toggleNav}
      >
        <SelectableList valueLink={{ value: pathname, requestChange: onRequestChangeList }} >
          {isAdmin && (
            <ListItem
              primaryText="Admin"
              nestedItems={[
                <ListItem primaryText="Users" value="/admin" />,
                <ListItem primaryText="Roles" value="/admin/roles" />,
              ]}
            />
          )}
        </SelectableList>
        </LeftNav>
        <div className="app-container">
          {children}
        </div>
      </AppCanvas>
  );
}

App.propTypes = {
  navControls: PropTypes.object,
  auth: PropTypes.object,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  children: PropTypes.node,
  user: PropTypes.object,
  location: PropTypes.object,
  isAdmin: PropTypes.bool,
};

App.defaultProps = {
  user: {},
};

const ConnectedApp = compose(
  navControl,
  authControl
)(App);

const AppContainer = Relay.createContainer(ConnectedApp, {
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        first_name,
        last_name
      }
    `,
  },
});

export default AppContainer;

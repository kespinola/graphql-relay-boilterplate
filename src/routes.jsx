import React from 'react';
import Relay from 'react-relay';
import useRelay from 'react-router-relay';
import { IndexRoute, Route, browserHistory, Router, applyRouterMiddleware } from 'react-router';

import PassThrough from './handlers/PassThrough';
import App from './handlers/App';
import Home from './handlers/Home';
import SignUp from './handlers/SignUp';
import SignIn from './handlers/SignIn';
import Account from './handlers/Account';
import Users from './handlers/Users';
import Roles from './handlers/Roles';

import { UserQuery } from './modules/user';

export default () => (
  <Router history={browserHistory} render={applyRouterMiddleware(useRelay)} environment={Relay.Store}>
    <Route path="/" component={App} queries={UserQuery} prepareParams={() => ({ userId: 1 })}>
      <IndexRoute component={Home} />
      <Route path="sign-in" component={SignIn} />
      <Route path="sign-up" component={SignUp} />
      <Route path="account" component={Account} />
      <Route path="admin" component={PassThrough}>
        <IndexRoute component={Users} />
        <Route path="roles" component={Roles} />
      </Route>
    </Route>
  </Router>
);

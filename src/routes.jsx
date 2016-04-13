import React from 'react';
import { Route, IndexRoute, Router, browserHistory } from 'react-router';

import PassThrough from './handlers/PassThrough';
import App from './handlers/App';
import Home from './handlers/Home';
import SignUp from './handlers/SignUp';
import SignIn from './handlers/SignIn';
import Account from './handlers/Account';
import Users from './handlers/Users';
import Roles from './handlers/Roles';

export default () => (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
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

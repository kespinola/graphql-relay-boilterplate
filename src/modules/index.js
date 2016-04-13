import { fork } from 'redux-saga/effects';
import { combineReducers } from 'redux';

import navigationReducer from './navigation/duck';
import dialogReducer from './dialog/duck';
import roleReducer from './role/duck';
import authReducer from './auth/duck';
import { reducer as formReducer } from 'redux-form';
import { routeReducer } from 'react-router-redux';

import authSaga from './auth/saga';
import roleSaga from './role/saga';
import navigationSaga from './navigation/saga';

export const saga = function* () {
  yield [
    fork(navigationSaga),
    fork(authSaga),
    fork(roleSaga),
  ];
};

export const reducer = combineReducers({
  auth: authReducer,
  dialog: dialogReducer,
  form: formReducer,
  navigation: navigationReducer,
  role: roleReducer,
  routing: routeReducer,
});

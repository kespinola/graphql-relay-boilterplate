import { put, fork } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { takeEvery } from 'redux-saga';
import { CREATE_ROLE, DELETE_ROLE, TOGGLE_USER } from './duck';

function* createRole({ payload }) {
}

function* deleteRole({ payload }) {
  yield put(push('/roles'));
}

function* toggleUserInRole({ payload: { userId, name } }) {

}

function* watchCreateRole() {
  while(true) {
    yield takeEvery(CREATE_ROLE, createRole);
  }
}

function* watchDeleteRole() {
  while(true) {
    yield takeEvery(DELETE_ROLE, deleteRole);
  }
}

function* watchToggleUserInRole() {
  while(true) {
    yield takeEvery(TOGGLE_USER, toggleUserInRole);
  }
}

function* roleSaga() {
  yield [
    fork(watchCreateRole),
    fork(watchDeleteRole),
    fork(watchToggleUserInRole),
  ];
}

export default roleSaga;

import { put, fork } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import { push } from 'react-router-redux';
import { SIGN_UP_REQUEST, SIGN_OUT_REQUEST, SIGN_IN_REQUEST } from './duck';
import superagent from 'superagent';
import aws4 from 'aws4';
import constants from './../../constants';

const {
  AMAZON_GATEWAY_URL,
  SERVERLESS_STAGE,
  AWS_CRED,
} = constants;
const serverlessUrl = `${AMAZON_GATEWAY_URL}/${SERVERLESS_STAGE}`;
const authorization = aws4.sign({ host: AMAZON_GATEWAY_URL }, AWS_CRED).headers;

function* signUp({ payload }) {
  console.log(aws4.sign(AMAZON_GATEWAY_URL, AWS_CRED));
  const response =
    yield superagent
      .post(`${serverlessUrl}/signup`)
      .set('Authorization', authorization)
      .withCredentials()
      .send({ user: payload });
  debugger;

  yield put(push('/'));
}

function* signOut() {
  yield put(push('/'));
}

function* signIn({ payload: { email, password } }) {
  yield put(push('/'));
}

function* watchSignUpSaga() {
  while(true) {
    yield takeLatest(SIGN_UP_REQUEST, signUp);
  }
}

function* watchSignOutSaga() {
  while(true) {
    yield takeLatest(SIGN_OUT_REQUEST, signOut);
  }
}

function* watchSignInSaga() {
  while(true) {
    yield takeLatest(SIGN_IN_REQUEST, signIn);
  }
}

function* authSaga() {
  yield [
    fork(watchSignUpSaga),
    fork(watchSignInSaga),
    fork(watchSignOutSaga),
  ];
}
export default authSaga;

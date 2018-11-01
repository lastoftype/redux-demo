import { put, all, takeLatest, fork } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';

function* getUsers() {
  yield takeLatest('GET_USERS', function*(action) {
    try {
      const users = yield fetch('http://localhost:8080/users').then(response => response.json());
      yield put({
        type: 'GET_USERS_SUCCEEDED',
        payload: users,
      });
    } catch (e) {
      yield put({ type: 'GET_USERS_FAILED', message: e.message });
    }
  });
}

function* getSingleUser() {
  yield takeLatest('GET_SINGLE_USER', function*(action) {
    try {
      const user = yield fetch(`http://localhost:8080/users/${action.id}/`).then(response => response.json());
      yield put({
        type: 'GET_SINGLE_USER_SUCCEEDED',
        payload: user,
      });
    } catch (e) {
      yield put({ type: 'GET_SINGLE_USER_FAILED', message: e.message });
    }
  });
}

function* mySaga() {
  yield all([fork(getUsers), fork(getSingleUser)]);
}

export default mySaga;

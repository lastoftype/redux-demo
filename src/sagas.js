import { put, call, take, takeLatest } from "redux-saga/effects";
import fetch from "isomorphic-fetch";

function* getUsers(action) {
  try {
    const users = yield call(fetch, "http://localhost:8080/users");
    const userInfo = users.json();
    yield put({
      type: "GET_USERS_SUCCEEDED",
      payload: [{ name: "jon", id: 1, name: "joe", id: 2 }]
    });
  } catch (e) {
    yield put({ type: "GET_USERS_FAILED", message: e.message });
  }
}

function* mySaga() {
  yield takeLatest("GET_USERS", getUsers);
}

export default mySaga;

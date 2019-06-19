import { call, put } from "redux-saga/effects";

// worker saga: makes the api call when watcher saga sees the action
function* userLogin({ api, action }, { accessToken }) {
  try {
    const response = yield call(api.loginUser, accessToken);
    yield put(action.success(response.data));
  } catch (error) {
    // // dispatch a failure action to the store with the error
    yield put(action.failure(error));
  }
}

export default {
  userLogin
};

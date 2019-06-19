import { call, put } from "redux-saga/effects";

function* getAllFeedback({ api, action }) {
  try {
    const response = yield call(api.getAllFeedback);
    yield put(action.success(response.data.feedback));
  } catch (error) {
    // // dispatch a failure action to the store with the error
    yield put(action.failure(error));
  }
}

function* respondToFeedback({ api, action }, { payload }) {
  const { feedbackId, message } = payload;
  try {
    const response = yield call(api.respondToFeedback, feedbackId, message);
    yield put(action.success(response.data.response));
  } catch (error) {
    console.log(error);
    // // dispatch a failure action to the store with the error
    yield put(action.failure(error));
  }
}

function* messageAll({ api, action }, { payload }) {
  const { message } = payload;
  try {
    const response = yield call(api.messageAll, message);
    yield put(action.success(response.data));
  } catch (error) {
    console.log(error);
    // // dispatch a failure action to the store with the error
    yield put(action.failure(error));
  }
}

function* getLogs({ api, action }) {
  try {
    const response = yield call(api.getLogs);
    yield put(action.success(response.data.logs));
  } catch (error) {
    // // dispatch a failure action to the store with the error
    yield put(action.failure(error));
  }
}

export default {
  getAllFeedback,
  respondToFeedback,
  messageAll,
  getLogs
};

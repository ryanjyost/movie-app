import { call, put } from "redux-saga/effects";
import { actions as Actions } from "../redux/user";

function* userLogin({ api, action }, { payload }) {
  const { accessToken, platform } = payload;

  try {
    const response = yield call(api.loginUser, accessToken, platform);
    yield put(action.success(response.data.user, response.data.group));
  } catch (error) {
    yield put(action.failure(error));
  }
}

function* predictMovie({ api, action }, { payload }) {
  const { movieId, userId, prediction } = payload;
  try {
    const response = yield call(api.predictMovie, movieId, userId, prediction);
    yield put(action.success(response.data.user));
  } catch (error) {
    yield put(action.failure(error));
  }
}

function* getSeasonRankings({ api, action }, { payload }) {
  const { groupId, seasonId } = payload;
  try {
    const response = yield call(api.getSeasonRankings, groupId, seasonId);
    yield put(action.success(response.data.rankings));
  } catch (error) {
    yield put(action.failure(error));
  }
}

function* getOverallRankings({ api, action }, { payload }) {
  const { groupId } = payload;
  try {
    const response = yield call(api.getOverallRankings, groupId);
    yield put(action.success(response.data.rankings));
  } catch (error) {
    yield put(action.failure(error));
  }
}

function* getUser({ api, action }, { payload }) {
  const { userId } = payload;
  try {
    const response = yield call(api.getUser, userId);
    yield put(action.success(response.data.user));
  } catch (error) {
    yield put(action.failure(error));
  }
}

function* getUserOverall({ api, action }, { payload }) {
  const { userId } = payload;
  try {
    const response = yield call(api.getUserOverall, userId);
    yield put(action.success(response.data.overall));
  } catch (error) {
    yield put(action.failure(error));
  }
}

function* createSlackChannel({ api, action }, { payload }) {
  const { code } = payload;
  try {
    const response = yield call(api.createSlackChannel, code);
    yield put(action.success(response.data.user, response.data.group));
  } catch (error) {
    yield put(action.failure(error));
  }
}

export default {
  userLogin,
  predictMovie,
  getSeasonRankings,
  getOverallRankings,
  getUser,
  getUserOverall,
  createSlackChannel
};

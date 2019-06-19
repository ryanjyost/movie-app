import { call, put } from "redux-saga/effects";

function* getMovies({ api, action }) {
  try {
    const response = yield call(api.getMovies);
    yield put(
      action.success(
        response.data.movies,
        response.data.moviePredictionCutoffDate
      )
    );
  } catch (error) {
    // // dispatch a failure action to the store with the error
    yield put(action.failure(error));
  }
}

function* addMovie({ api, action }, { payload }) {
  const { movie } = payload;
  try {
    const response = yield call(api.addMovie, movie);
    yield put(action.success(response.data.movies));
  } catch (error) {
    // // dispatch a failure action to the store with the error
    yield put(action.failure(error));
  }
}

function* editMovie({ api, action }, { payload }) {
  const { movieId, updatedData } = payload;
  try {
    const response = yield call(api.editMovie, movieId, updatedData);
    yield put(action.success(response.data.movies));
  } catch (error) {
    // // dispatch a failure action to the store with the error
    yield put(action.failure(error));
  }
}

export default {
  getMovies,
  addMovie,
  editMovie
};

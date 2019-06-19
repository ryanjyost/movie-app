import { takeLatest, takeLeading, all } from "redux-saga/effects";

import createMovieMediumApi from "../services/MovieMediumApi";

// SAGAS
import UserSagas from "../sagas/user";
import AdminSagas from "../sagas/admin";
import MovieSagas from "../sagas/movies";

// REDUX
import { Actions } from "../redux";
const { getMovies, addMovie, editMovie } = Actions.movies;
const { userLogin } = Actions.user;
const {
  getAllFeedback,
  respondToFeedback,
  messageAll,
  getLogs
} = Actions.admin;

const api = createMovieMediumApi();

const generateWatcher = (action, sagas) => {
  return takeLeading(action.types.request, sagas[action.key], {
    api,
    action
  });
};

export default function*() {
  yield all([
    //movies
    generateWatcher(getMovies, MovieSagas),
    generateWatcher(addMovie, MovieSagas),
    generateWatcher(editMovie, MovieSagas),
    // users
    generateWatcher(userLogin, UserSagas),
    //admin
    generateWatcher(getAllFeedback, AdminSagas),
    generateWatcher(respondToFeedback, AdminSagas),
    generateWatcher(messageAll, AdminSagas),
    generateWatcher(getLogs, AdminSagas)
  ]);
}

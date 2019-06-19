import { combineReducers } from "redux";
import { createStore, applyMiddleware, compose } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

// reducers
import styles from "./styles";
import user from "./user";
import admin from "./admin";
import movies from "./movies";

import { actions as StylesActions } from "./styles";
import { actions as UserActions } from "./user";
import { actions as AdminActions } from "./admin";
import { actions as MovieActions } from "./movies";

export const Actions = {
  styles: StylesActions,
  user: UserActions,
  admin: AdminActions,
  movies: MovieActions
};

const createRootReducer = history =>
  combineReducers({
    styles,
    user,
    admin,
    movies
  });

export default function configureStore(sagaMiddleware) {
  const store = createStore(
    createRootReducer(),
    composeWithDevTools(applyMiddleware(sagaMiddleware))
  );

  return store;
}

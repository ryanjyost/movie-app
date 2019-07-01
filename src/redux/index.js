import { combineReducers } from "redux";
import { createStore, applyMiddleware, compose } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { persist } from "./persist";

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

const persistConfig = {
  key: "root",
  storage,
  whitelist: [] // only navigation will be persisted
};

const createRootReducer = history =>
  combineReducers({
    styles,
    user,
    admin,
    movies
  });

const persistedReducer = persist("root", [], createRootReducer());

export default function configureStore(sagaMiddleware) {
  const store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
  );

  let persistor = persistStore(store);

  return { store, persistor };
}

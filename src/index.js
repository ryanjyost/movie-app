import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Main from "./components/Main";
import {
  Route,
  Switch,
  Redirect,
  BrowserRouter as Router
} from "react-router-dom";

import * as serviceWorker from "./serviceWorker";

import createSagaMiddleware from "redux-saga";
import { Provider } from "react-redux";

import sagas from "./sagas";
import configureStore, { history } from "./redux";

// import { watcherSaga } from "./sagas";

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();
const store = configureStore(sagaMiddleware);

// // run the saga
sagaMiddleware.run(sagas);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Main />
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

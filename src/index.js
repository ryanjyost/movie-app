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
import { ThemeProvider } from "@material-ui/styles";
import { theme } from "./components/theme";
import ScrollToTop from "./components/hoc/ScrollToTop";
import { PersistGate } from "redux-persist/integration/react";

import * as serviceWorker from "./serviceWorker";

import createSagaMiddleware from "redux-saga";
import { Provider } from "react-redux";

import sagas from "./sagas";
import configureStore from "./redux";

// import { watcherSaga } from "./sagas";

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();
const { store, persistor } = configureStore(sagaMiddleware);

// // run the saga
sagaMiddleware.run(sagas);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <ScrollToTop>
          <ThemeProvider theme={theme}>
            <Main />
          </ThemeProvider>
        </ScrollToTop>
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

// if ("serviceWorker" in navigator) {
//   window.addEventListener("load", function() {
//     navigator.serviceWorker.register(`${process.env.PUBLIC_URL}/sw.js`).then(
//       function(registration) {
//         // Registration was successful
//         console.log(
//           "ServiceWorker registration successful with scope: ",
//           registration.scope
//         );
//       },
//       function(err) {
//         // registration failed :(
//         console.log("ServiceWorker registration failed: ", err);
//       }
//     );
//   });
// }

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

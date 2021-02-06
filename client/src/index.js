import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import { Provider } from "react-redux";
import store, { history } from "./store/store.config";
import { ConnectedRouter } from "connected-react-router";
import * as serviceWorker from "./serviceWorker";
import AppRouter from "./AppRouter";

const app = (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <AppRouter />
    </ConnectedRouter>
  </Provider>
);
ReactDOM.render(app, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

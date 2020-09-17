// eslint-disable-next-line no-unused-vars
import { createBrowserHistory } from "history";
import { applyMiddleware, compose, createStore } from "redux";
import { routerMiddleware } from "connected-react-router";
import thunkMiddleware from "redux-thunk";
import reduxLoggerMiddleware from "redux-logger";
import createRootReducer from "./reducers";

export const history = createBrowserHistory();

export default function configureStore(preloadedState: any) {
  const store = createStore(
    createRootReducer(history),
    preloadedState,
    compose(
      applyMiddleware(
        routerMiddleware(history),
        thunkMiddleware,
        reduxLoggerMiddleware,
      )
    )
  );

  return store;
}

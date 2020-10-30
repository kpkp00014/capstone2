import { createBrowserHistory } from "history";
import createSagaMiddleWare from "redux-saga";
import { routerMiddleware } from "connected-react-router";
import { createStore, compose, applyMiddleware } from "redux";

import createRootReducer from "./redux/reducers/index";
import rootSaga from "./redux/sagas/index";

export const history = createBrowserHistory();
const sagaMiddleWare = createSagaMiddleWare();

// initial state
const initialState = {};

const middlewares = [sagaMiddleWare, routerMiddleware(history)];

const devtools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

const composeEnhancer =
  process.env.NODE_ENV === "production" ? compose : devtools || compose;

const store = createStore(
  createRootReducer(history),
  initialState,
  composeEnhancer(applyMiddleware(...middlewares))
);
sagaMiddleWare.run(rootSaga);

export default store;

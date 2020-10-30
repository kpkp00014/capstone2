import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import authReducer from "./authReducer";
import storageReducer from "./storageReducer";
import projectReducer from "./projectReducer";

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    storage: storageReducer,
    project: projectReducer,
  });

export default createRootReducer;

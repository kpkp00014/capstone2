import { all, fork } from "redux-saga/effects";
import axios from "axios";

import dotenv from "dotenv";

import authSaga from "./authSaga";
import storageSaga from "./storageSaga";
import projectSaga from "./projectSaga";
dotenv.config();
import { REACT_APP_BASIC_SERVER_URL } from "../../../config";
axios.defaults.baseURL = REACT_APP_BASIC_SERVER_URL;

export default function* rootSage() {
  yield all([fork(authSaga)]);
  yield all([fork(storageSaga)]);
  yield all([fork(projectSaga)]);
}

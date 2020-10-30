import axios from "axios";
import { all, call, put, takeEvery, fork } from "redux-saga/effects";
import {
  CLEAR_ERROR_FAILURE,
  CLEAR_ERROR_REQUEST,
  CLEAR_ERROR_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  USER_LOADING_FAILURE,
  USER_LOADING_REQUEST,
  USER_LOADING_SUCCESS,
} from "../types";

// clear error
function* clearError() {
  try {
    yield put({
      type: CLEAR_ERROR_SUCCESS,
    });
  } catch (e) {
    yield put({
      type: CLEAR_ERROR_FAILURE,
    });
  }
}
function* watchClearError() {
  yield takeEvery(CLEAR_ERROR_REQUEST, clearError);
}

// register user
const registerUserAPI = (req) => {
  return axios.post("api/user", req);
};
function* registerUser(action) {
  try {
    const result = yield call(registerUserAPI, action.payload);
    yield put({
      type: REGISTER_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: REGISTER_FAILURE,
      payload: e.response,
    });
  }
}
function* watchRegisterUser() {
  yield takeEvery(REGISTER_REQUEST, registerUser);
}

// user loading
const userLoadingAPI = (token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (token) {
    config.headers["x-auth-token"] = token;
  }
  return axios.get("api/auth/user", config);
};
function* userLoading(action) {
  try {
    const result = yield call(userLoadingAPI, action.payload);
    yield put({
      type: USER_LOADING_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: USER_LOADING_FAILURE,
      payload: e.response,
    });
  }
}
function* watchUserLoading() {
  yield takeEvery(USER_LOADING_REQUEST, userLoading);
}

// login user
const loginUserAPI = (loginData) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios.post("api/auth", loginData, config);
};
function* loginUser(action) {
  try {
    const result = yield call(loginUserAPI, action.payload);
    yield put({
      type: LOGIN_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: LOGIN_FAILURE,
      payload: e.response,
    });
  }
}
function* watchLoginUser() {
  yield takeEvery(LOGIN_REQUEST, loginUser);
}

// logout user
function* logoutUser(action) {
  try {
    yield put({
      type: LOGOUT_SUCCESS,
    });
  } catch (e) {
    yield put({
      type: LOGOUT_FAILURE,
      payload: e.response,
    });
  }
}
function* watchLogoutUser() {
  yield takeEvery(LOGOUT_REQUEST, logoutUser);
}

// export
export default function* authSaga() {
  yield all([
    fork(watchClearError),
    fork(watchRegisterUser),
    fork(watchLoginUser),
    fork(watchLogoutUser),
    fork(watchUserLoading),
  ]);
}

import axios from "axios";
import { push } from "connected-react-router";
import { all, call, put, takeEvery, fork } from "redux-saga/effects";
import {
  FILE_UPLOAD_FAILURE,
  FILE_UPLOAD_REQUEST,
  FILE_UPLOAD_SUCCESS,
  STORAGE_IMAGE_DELETE_FAILURE,
  STORAGE_IMAGE_DELETE_REQUEST,
  STORAGE_IMAGE_DELETE_SUCCESS,
  STORAGE_LOADING_FAILURE,
  STORAGE_LOADING_REQUEST,
  STORAGE_LOADING_SUCCESS,
} from "../types";

// storage loading
const storageLoadingAPI = (token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (token) {
    config.headers["x-auth-token"] = token;
  }
  return axios.get("api/storage", config);
};
function* storageLoading(action) {
  try {
    const result = yield call(storageLoadingAPI, action.payload);
    yield put({
      type: STORAGE_LOADING_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: STORAGE_LOADING_FAILURE,
      payload: e.response,
    });
  }
  yield push("/storage");
}
function* watchStorageLoading() {
  yield takeEvery(STORAGE_LOADING_REQUEST, storageLoading);
}

// file upload
const fileUploadAPI = (payload) => {
  const token = payload.token ? payload.token : null;
  const data = new FormData();
  data.append("file", payload.file);
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  if (token) {
    config.headers["x-auth-token"] = token;
  }
  return axios.post("api/storage/upload", data, config);
};
function* fileUpload(action) {
  try {
    const result = yield call(fileUploadAPI, action.payload);
    yield put({
      type: FILE_UPLOAD_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: FILE_UPLOAD_FAILURE,
      payload: e.response,
    });
  }
  window.location.reload();
}
function* watchFileUpload() {
  yield takeEvery(FILE_UPLOAD_REQUEST, fileUpload);
}

// storage image delete
const storageDeleteAPI = (payload) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (payload.token) {
    config.headers["x-auth-token"] = payload.token;
  }
  return axios.post("api/storage/delete", payload, config);
};
function* storageDelete(action) {
  try {
    const result = yield call(storageDeleteAPI, action.payload);
    yield put({
      type: STORAGE_IMAGE_DELETE_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: STORAGE_IMAGE_DELETE_FAILURE,
      payload: e.response,
    });
  }
  window.location.reload();
}
function* watchStorageDelete() {
  yield takeEvery(STORAGE_IMAGE_DELETE_REQUEST, storageDelete);
}

export default function* storageSaga() {
  yield all([
    fork(watchStorageLoading),
    fork(watchFileUpload),
    fork(watchStorageDelete),
  ]);
}

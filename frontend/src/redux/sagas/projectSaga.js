import axios from "axios";
import { all, call, put, takeEvery, fork } from "redux-saga/effects";
import {
  CURRENT_PROJECT_CLEAR_FAILURE,
  CURRENT_PROJECT_CLEAR_REQUEST,
  CURRENT_PROJECT_CLEAR_SUCCESS,
  PROJECT_EXPORT_FAILURE,
  PROJECT_EXPORT_REQUEST,
  PROJECT_EXPORT_SUCCESS,
  PROJECT_INIT_FAILURE,
  PROJECT_INIT_REQUEST,
  PROJECT_INIT_SUCCESS,
  PROJECT_ITEM_DELETE_FAILURE,
  PROJECT_ITEM_DELETE_REQUEST,
  PROJECT_ITEM_DELETE_SUCCESS,
  PROJECT_ITEM_LIST_FAILURE,
  PROJECT_ITEM_LIST_REQUEST,
  PROJECT_ITEM_LIST_SUCCESS,
  PROJECT_ITEM_UPLOAD_FAILURE,
  PROJECT_ITEM_UPLOAD_REQUEST,
  PROJECT_ITEM_UPLOAD_SUCCESS,
  PROJECT_LIST_FAILURE,
  PROJECT_LIST_REQUEST,
  PROJECT_LIST_SUCCESS,
  PROJECT_SELECT_FAILURE,
  PROJECT_SELECT_REQUEST,
  PROJECT_SELECT_SUCCESS,
  PROJECT_TERMINATE_FAILURE,
  PROJECT_TERMINATE_REQUEST,
  PROJECT_TERMINATE_SUCCESS,
} from "../types";

// clear current project
function* clearProject() {
  try {
    yield put({
      type: CURRENT_PROJECT_CLEAR_SUCCESS,
    });
  } catch (e) {
    yield put({
      type: CURRENT_PROJECT_CLEAR_FAILURE,
    });
  }
}
function* watchClearProject() {
  yield takeEvery(CURRENT_PROJECT_CLEAR_REQUEST, clearProject);
}

// project init
const projectInitAPI = (payload) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (payload.token) {
    config.headers["x-auth-token"] = payload.token;
  }

  return axios.post("api/project/init", payload, config);
};
function* projectInit(action) {
  try {
    const result = yield call(projectInitAPI, action.payload);
    yield put({
      type: PROJECT_INIT_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: PROJECT_INIT_FAILURE,
      payload: e.response,
    });
  }
  window.location.reload();
}
function* watchProjectInit() {
  yield takeEvery(PROJECT_INIT_REQUEST, projectInit);
}

// project list
const projectListAPI = (token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (token) {
    config.headers["x-auth-token"] = token;
  }
  return axios.get("api/project/list", config);
};
function* projectList(action) {
  try {
    const result = yield call(projectListAPI, action.payload);
    yield put({
      type: PROJECT_LIST_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: PROJECT_LIST_FAILURE,
      payload: e.response,
    });
  }
}
function* watchProjectList() {
  yield takeEvery(PROJECT_LIST_REQUEST, projectList);
}

// project select
function* projectSelect(action) {
  try {
    yield put({
      type: PROJECT_SELECT_SUCCESS,
      payload: action.payload.project,
    });
  } catch (e) {
    yield put({
      type: PROJECT_SELECT_FAILURE,
      payload: e.response,
    });
  }
}
function* watchProjectSelect() {
  yield takeEvery(PROJECT_SELECT_REQUEST, projectSelect);
}

// project item add request
const projectItemAddAPI = (payload) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (payload.token) {
    config.headers["x-auth-token"] = payload.token;
  }
  return axios.post("api/project/add", payload, config);
};
function* projectItemAdd(action) {
  try {
    const result = yield call(projectItemAddAPI, action.payload);
    yield put({
      type: PROJECT_ITEM_UPLOAD_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: PROJECT_ITEM_UPLOAD_FAILURE,
      payload: e.response,
    });
  }
}
function* watchProjectItemAdd() {
  yield takeEvery(PROJECT_ITEM_UPLOAD_REQUEST, projectItemAdd);
}

// project item add request
const projectItemListAPI = (payload) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (payload.token) {
    config.headers["x-auth-token"] = payload.token;
  }
  return axios.post("api/project/item", payload, config);
};
function* projectItemList(action) {
  try {
    const result = yield call(projectItemListAPI, action.payload);
    yield put({
      type: PROJECT_ITEM_LIST_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: PROJECT_ITEM_LIST_FAILURE,
      payload: e.response,
    });
  }
}
function* watchProjectItemList() {
  yield takeEvery(PROJECT_ITEM_LIST_REQUEST, projectItemList);
}

// project terminate request
const projectTerminateAPI = (payload) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (payload.token) {
    config.headers["x-auth-token"] = payload.token;
  }
  return axios.post("api/project/terminate", payload, config);
};
function* projectTerminate(action) {
  try {
    const result = yield call(projectTerminateAPI, action.payload);
    yield put({
      type: PROJECT_TERMINATE_SUCCESS,
      payload: result.data,
    });
    window.location.reload();
  } catch (e) {
    yield put({
      type: PROJECT_TERMINATE_FAILURE,
      payload: e.response,
    });
  }
}
function* watchProjectTerminate() {
  yield takeEvery(PROJECT_TERMINATE_REQUEST, projectTerminate);
}

// project export request
const projectExportAPI = (payload) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (payload.token) {
    config.headers["x-auth-token"] = payload.token;
  }
  return axios.post("api/project/export", payload, config);
};
function* projectExport(action) {
  try {
    const result = yield call(projectExportAPI, action.payload);
    yield put({
      type: PROJECT_EXPORT_SUCCESS,
      payload: result.data,
    });
    window.location.reload();
  } catch (e) {
    yield put({
      type: PROJECT_EXPORT_FAILURE,
      payload: e.response,
    });
  }
}
function* watchProjectExport() {
  yield takeEvery(PROJECT_EXPORT_REQUEST, projectExport);
}

// project item delete
const projectItemDeleteAPI = (payload) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (payload.token) {
    config.headers["x-auth-token"] = payload.token;
  }
  return axios.post("api/project/delete", payload, config);
};
function* projectItemDelete(action) {
  try {
    const result = yield call(projectItemDeleteAPI, action.payload);
    yield put({
      type: PROJECT_ITEM_DELETE_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: PROJECT_ITEM_DELETE_FAILURE,
      payload: e.response,
    });
  }
}
function* watchProjectItemDelete() {
  yield takeEvery(PROJECT_ITEM_DELETE_REQUEST, projectItemDelete);
}

export default function* projectSaga() {
  yield all([
    fork(watchProjectInit),
    fork(watchProjectList),
    fork(watchProjectSelect),
    fork(watchProjectItemAdd),
    fork(watchProjectItemList),
    fork(watchClearProject),
    fork(watchProjectTerminate),
    fork(watchProjectExport),
    fork(watchProjectItemDelete),
  ]);
}

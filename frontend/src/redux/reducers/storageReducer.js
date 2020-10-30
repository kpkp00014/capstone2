import {
  STORAGE_IMAGE_DELETE_FAILURE,
  STORAGE_IMAGE_DELETE_REQUEST,
  STORAGE_IMAGE_DELETE_SUCCESS,
  STORAGE_LOADING_FAILURE,
  STORAGE_LOADING_REQUEST,
  STORAGE_LOADING_SUCCESS,
} from "../types";

const initialState = {
  isLoading: false,
  prefix: "",
  files: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case STORAGE_LOADING_REQUEST:
      return {
        ...state,
        isLoading: true,
        files: [],
      };
    case STORAGE_LOADING_SUCCESS:
      return {
        ...state,
        isLoading: false,
        files: [...state.files, ...action.payload.Contents],
      };
    case STORAGE_LOADING_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case STORAGE_IMAGE_DELETE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case STORAGE_IMAGE_DELETE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        files: [...action.payload.Contents],
      };
    case STORAGE_IMAGE_DELETE_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
}

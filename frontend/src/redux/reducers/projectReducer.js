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

const initialState = {
  project: null,
  isLoading: false,
  projectLists: [],
  projectItems: [],
};

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case CURRENT_PROJECT_CLEAR_REQUEST:
    case CURRENT_PROJECT_CLEAR_SUCCESS:
    case CURRENT_PROJECT_CLEAR_FAILURE:
      return {
        ...state,
        project: null,
        projectItems: [],
      };
    case PROJECT_INIT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case PROJECT_INIT_SUCCESS:
      return { ...state, isLoading: false };
    case PROJECT_INIT_FAILURE:
      return { ...state, isLoading: false };
    case PROJECT_LIST_REQUEST:
      return {
        ...state,
        isLoading: true,
        projectLists: [],
      };
    case PROJECT_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        projectLists: action.payload,
      };
    case PROJECT_LIST_FAILURE:
      return {
        ...state,
        isLoading: false,
        project: null,
        projectLists: [],
      };
    case PROJECT_SELECT_REQUEST:
      return {
        isLoading: true,
        ...state,
      };
    case PROJECT_SELECT_SUCCESS:
      return {
        ...state,
        project: action.payload,
        isLoading: false,
      };
    case PROJECT_SELECT_FAILURE:
      return {
        ...state,
        isLoading: false,
        project: null,
      };
    case PROJECT_ITEM_LIST_REQUEST:
    case PROJECT_ITEM_UPLOAD_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case PROJECT_ITEM_LIST_SUCCESS:
    case PROJECT_ITEM_UPLOAD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        projectItems: action.payload,
      };
    case PROJECT_ITEM_LIST_FAILURE:
    case PROJECT_ITEM_UPLOAD_FAILURE:
      return {
        ...state,
        isLoading: false,
        project: null,
      };
    case PROJECT_TERMINATE_REQUEST:
    case PROJECT_TERMINATE_SUCCESS:
    case PROJECT_TERMINATE_FAILURE:
      return {
        ...state,
        isLoading: false,
        project: null,
        projectLists: [],
        projectItems: [],
      };
    case PROJECT_EXPORT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case PROJECT_EXPORT_SUCCESS:
    case PROJECT_EXPORT_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case PROJECT_ITEM_DELETE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case PROJECT_ITEM_DELETE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        projectItems: [...action.payload],
      };
    case PROJECT_ITEM_DELETE_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default projectReducer;

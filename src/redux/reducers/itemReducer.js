// itemReducer.js

import {
  GET_ALL_ITEMS_SUCCESS,
  GET_ALL_UNITS_SUCCESS,
  GET_ITEM_BY_ID_SUCCESS,
  ADD_ITEM_SUCCESS,
  UPDATE_ITEM_SUCCESS,
  DELETE_ITEM_SUCCESS,
  API_FAILURE,
} from "../actions/itemActions";

const initialState = {
  items: [],
  units: [],
  selectedItem: null,
  error: null,
};

const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_ITEMS_SUCCESS:
      return {
        ...state,
        items: action.payload,
        error: null,
      };

    case GET_ALL_UNITS_SUCCESS:
      return {
        ...state,
        units: action.payload,
        error: null,
      };

    case GET_ITEM_BY_ID_SUCCESS:
      return {
        ...state,
        selectedItem: action.payload,
        error: null,
      };

    case ADD_ITEM_SUCCESS:
      return {
        ...state,
        error: null,
      };

    case UPDATE_ITEM_SUCCESS:
      return {
        ...state,
        error: null,
      };

    case DELETE_ITEM_SUCCESS:
      return {
        ...state,
        error: null,
      };

    case API_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default itemReducer;

// storeReducer.js

import {
  FETCH_STORES_SUCCESS,
  FETCH_STORE_SUCCESS,
  CREATE_STORE_SUCCESS,
  UPDATE_STORE_SUCCESS,
  DELETE_STORE_SUCCESS,
} from '../actions/storeAction';

const initialState = {
  stores: [],
  currentStore: null,
};

const storeReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STORES_SUCCESS:
      return {
        ...state,
        stores: action.payload,
      };

    case FETCH_STORE_SUCCESS:
      return {
        ...state,
        currentStore: action.payload,
      };

    case CREATE_STORE_SUCCESS:
      return {
        ...state,
        stores: [...state.stores, action.payload],
        currentStore: action.payload,
      };

    case UPDATE_STORE_SUCCESS:
      return {
        ...state,
        stores: state.stores.map((store) =>
          store.id === action.payload.id ? action.payload : store
        ),
        currentStore: action.payload,
      };

    case DELETE_STORE_SUCCESS:
      return {
        ...state,
        stores: state.stores.filter((store) => store.id !== state.currentStore.id),
        currentStore: null,
      };

    default:
      return state;
  }
};

export default storeReducer;

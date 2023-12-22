// MechanicReducer.js

import {
  FETCH_MECHANICS_SUCCESS,
  FETCH_MECHANIC_SUCCESS,
  CREATE_MECHANIC_SUCCESS,
  UPDATE_MECHANIC_SUCCESS,
  DELETE_MECHANIC_SUCCESS,
} from '../actions/mechanicActions';

const initialState = {
  mechanics: [], 
  mechanic: null,
};

const mechanicReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MECHANICS_SUCCESS:
      return {
        ...state,
        mechanics: action.payload,
      };
    case FETCH_MECHANIC_SUCCESS:
      return {
        ...state,
        mechanic: action.payload,
      };
    case CREATE_MECHANIC_SUCCESS:
      return {
        ...state,
        mechanics: [...state.mechanics, action.payload],
      };
    case UPDATE_MECHANIC_SUCCESS:
      return {
        ...state,
        mechanic: action.payload,
      };
    case DELETE_MECHANIC_SUCCESS:
      return {
        ...state,
        mechanic: null,
      };
    default:
      return state;
  }
};

export default mechanicReducer;

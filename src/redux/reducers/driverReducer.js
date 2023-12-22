import {
    FETCH_DRIVERS_SUCCESS,
    FETCH_DRIVER_SUCCESS,
    CREATE_DRIVER_SUCCESS,
    UPDATE_DRIVER_SUCCESS,
    DELETE_DRIVER_SUCCESS,
  } from '../actions/driverActions';
  
  const initialState = {
    drivers: [],
    driver: null,
  };
  
  const driverReducer = (state = initialState, action) => {
    
    switch (action.type) {
      case FETCH_DRIVERS_SUCCESS:
        return {
          ...state,
          drivers: action.payload,
        };
      case FETCH_DRIVER_SUCCESS:
        return {
          ...state,
          driver: action.payload,
        };
      case CREATE_DRIVER_SUCCESS:
        return {
          ...state,
          drivers: [...state.drivers, action.payload],
        };
      case UPDATE_DRIVER_SUCCESS:
        return {
          ...state,
          driver: action.payload,
        };
      case DELETE_DRIVER_SUCCESS:
        return {
          ...state,
          driver: null,
        };
      default:
        return state;
    }
  };
  
  export default driverReducer;
  
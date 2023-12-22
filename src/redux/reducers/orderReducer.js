import {
    FETCH_ORDERS_SUCCESS,
    FETCH_ORDER_SUCCESS,
    CREATE_ORDER_SUCCESS,
    UPDATE_ORDER_SUCCESS,
    DELETE_ORDER_SUCCESS,
  } from '../actions/orderAction';
  
  const initialState = {
    orders: [],
    currentOrder: null,
  };
  
  const orderReducer = (state = initialState, action) => {
  
    switch (action.type) {
      case FETCH_ORDERS_SUCCESS:
        return {
          ...state,
          orders: action.payload,
        };
      case FETCH_ORDER_SUCCESS:
        return {
          ...state,
          currentOrder: action.payload,
        };
      case CREATE_ORDER_SUCCESS:
        window.location.reload();
        return {
          ...state,
          orders: [...state.orders, action.payload],
        };
      case UPDATE_ORDER_SUCCESS:
        return {
          ...state,
          currentOrder: action.payload,
        };
      case DELETE_ORDER_SUCCESS:
        return {
          ...state,
          currentOrder: null,
        };
      default:
        return state;
    }
  };
  
  export default orderReducer;
  
import {
    FETCH_INVOICES_SUCCESS,
    FETCH_INVOICE_SUCCESS,
    ADD_INVOICE_SUCCESS,
  } from '../actions/invoiceActions';
  
  const initialState = {
    invoices: [],
    currentInvoice: null,
  };
  
  const invoiceReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_INVOICES_SUCCESS:
        return {
          ...state,
          invoices: action.payload,
        };
      case FETCH_INVOICE_SUCCESS:
        return {
          ...state,
          currentInvoice: action.payload,
        };
      case ADD_INVOICE_SUCCESS:
        return {
          ...state,
          invoices: [...state.invoices, action.payload],
        };
      default:
        return state;
    }
  };
  
  export default invoiceReducer;
  
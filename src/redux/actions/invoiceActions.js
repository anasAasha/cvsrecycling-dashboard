import axios from 'axios';
import { toast } from 'react-toastify';

import config from '../../config';

const apiUrl = config.apiUrl;

// Action Types
export const FETCH_INVOICES_SUCCESS = 'FETCH_INVOICES_SUCCESS';
export const FETCH_INVOICE_SUCCESS = 'FETCH_INVOICE_SUCCESS';
export const ADD_INVOICE_SUCCESS = 'ADD_INVOICE_SUCCESS';

// Action Creators
export const fetchInvoicesSuccess = (invoices) => ({
  type: FETCH_INVOICES_SUCCESS,
  payload: invoices,
});

export const fetchInvoiceSuccess = (invoice) => ({
  type: FETCH_INVOICE_SUCCESS,
  payload: invoice,
});

export const addInvoiceSuccess = (invoice) => ({
  type: ADD_INVOICE_SUCCESS,
  payload: invoice,
});

// Async Action Creators
export const getAllInvoices = () => async (dispatch) => {
  try {
    const response = await axios.get(`${apiUrl}/invoice/dashboard/all`);
    console.log('API Response:', response.data);
    dispatch(fetchInvoicesSuccess(response.data.Invoice));
  } catch (error) {
    console.error('API Error:', error);
    toast.error('Failed to fetch invoices');
  }
};

export const addInvoice = (invoiceData) => async (dispatch) => {
  try {
    const response = await axios.post(`${apiUrl}/invoice/add`, invoiceData);
    dispatch(addInvoiceSuccess(response.data.Invoice));
    toast.success('Invoice added successfully');
  } catch (error) {
    console.error('API Error:', error);
    toast.error('Failed to add invoice');
  }
};

export const getInvoiceById = (invoiceId) => async (dispatch) => {
  try {
    const response = await axios.get(`${apiUrl}/invoice/dashboard/getbyid/${invoiceId}`);
    dispatch(fetchInvoiceSuccess(response.data.Invoice));
    toast.success('Invoice fetched successfully');
  } catch (error) {
    console.error('API Error:', error);
    toast.error('Failed to fetch invoice');
  }
};

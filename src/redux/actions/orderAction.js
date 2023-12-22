import axios from 'axios';
import { toast } from 'react-toastify';

import config from '../../config';

const apiUrl = config.apiUrl;

// Action Types
export const FETCH_ORDERS_SUCCESS = 'FETCH_ORDERS_SUCCESS';
export const FETCH_ORDER_SUCCESS = 'FETCH_ORDER_SUCCESS';
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const UPDATE_ORDER_SUCCESS = 'UPDATE_ORDER_SUCCESS';
export const DELETE_ORDER_SUCCESS = 'DELETE_ORDER_SUCCESS';

// Action Creators
export const fetchOrdersSuccess = (orders) => ({
  type: FETCH_ORDERS_SUCCESS,
  payload: orders,
});

export const fetchOrderSuccess = (order) => ({
  type: FETCH_ORDER_SUCCESS,
  payload: order,
});

export const createOrderSuccess = (order) => ({
  type: CREATE_ORDER_SUCCESS,
  payload: order,
});

export const updateOrderSuccess = (order) => ({
  type: UPDATE_ORDER_SUCCESS,
  payload: order,
});

export const deleteOrderSuccess = () => ({
  type: DELETE_ORDER_SUCCESS,
});

// Async Action Creators
export const getAllOrders = () => async (dispatch) => {
  try {
    const response = await axios.get(`${apiUrl}/order/all`);
    
    
    dispatch(fetchOrdersSuccess(response.data.Orders));
    
  } catch (error) {
    console.error('API Error:', error);
    toast.error('Failed to fetch orders');
    // Handle error
  }
};

// export const getOrderById = (orderId) => async (dispatch) => {
//   try {
//     const response = await axios.get(`${apiUrl}/orders/byId/${orderId}`);
//     dispatch(fetchOrderSuccess(response.data.Order));
//     toast.success('Order fetched successfully');
//   } catch (error) {
//     console.error('API Error:', error);
//     toast.error('Failed to fetch order');
//     // Handle error
//   }
// };

export const createOrder = (orderData) => async (dispatch) => {
  try {
    const response = await axios.post(`${apiUrl}/order/dashboard/add`, orderData);
    dispatch(createOrderSuccess(response.data.Order));
    toast.success('Order created successfully');
  } catch (error) {
    console.error('API Error:', error);
    toast.error('Failed to create order');
    // Handle error
  }
};

export const updateOrder = (orderId, orderData) => async (dispatch) => {
  try {
    const response = await axios.put(`${apiUrl}/order/dashboard/update/${orderId}`, orderData);
    dispatch(updateOrderSuccess(response.data.Order));
    toast.success('Order updated successfully', { autoClose: 2000 });
  } catch (error) {
    console.error('API Error:', error);
    toast.error('Failed to update order');
    // Handle error
  }
};

export const deleteOrder = (orderId) => async (dispatch) => {
  try {
    const shouldDelete = window.confirm('Are you sure you want to delete this order?');

    if (!shouldDelete) {
      return; // If the user cancels, do nothing
    }
    await axios.delete(`${apiUrl}/order/delete/${orderId}`);
    dispatch(deleteOrderSuccess());
    toast.success('Order deleted successfully');
  } catch (error) {
    console.error('API Error:', error);
    toast.error('Failed to delete order');
    // Handle error
  }
};

// ItemAction.js

import axios from 'axios';
import { toast } from 'react-toastify';
import config from '../../config';
const apiUrl = config.apiUrl;
// Action Types
export const GET_ALL_ITEMS_SUCCESS = 'GET_ALL_ITEMS_SUCCESS';
export const GET_ALL_UNITS_SUCCESS = 'GET_ALL_UNITS_SUCCESS';
export const GET_ITEM_BY_ID_SUCCESS = 'GET_ITEM_BY_ID_SUCCESS';
export const ADD_ITEM_SUCCESS = 'ADD_ITEM_SUCCESS';
export const UPDATE_ITEM_SUCCESS = 'UPDATE_ITEM_SUCCESS';
export const DELETE_ITEM_SUCCESS = 'DELETE_ITEM_SUCCESS';
export const API_FAILURE = 'API_FAILURE';

// Action Creators
export const getAllItemsSuccess = (items) => ({
  type: GET_ALL_ITEMS_SUCCESS,
  payload: items,
});

export const getAllUnitsSuccess = (units) => ({
  type: GET_ALL_UNITS_SUCCESS,
  payload: units,
});

export const getItemByIdSuccess = (item) => ({
  type: GET_ITEM_BY_ID_SUCCESS,
  payload: item,
});

export const addItemSuccess = () => ({
  type: ADD_ITEM_SUCCESS,
});

export const updateItemSuccess = () => ({
  type: UPDATE_ITEM_SUCCESS,
});

export const deleteItemSuccess = () => ({
  type: DELETE_ITEM_SUCCESS,
});

export const apiFailure = (error) => ({
  type: API_FAILURE,
  payload: error,
});

// Thunk to Get All Items
export const getAllItems = () => async (dispatch) => {
  try {
    const response = await axios.get(`${apiUrl}/items/all`);
    dispatch(getAllItemsSuccess(response.data.Items));
  } catch (error) {
    dispatch(apiFailure(error.message));
  }
};

// Thunk to Get All Units
export const getAllUnits = () => async (dispatch) => {
  try {
    const response = await axios.get(`${apiUrl}/items/units/all`);
    dispatch(getAllUnitsSuccess(response.data.UnitsOfWeight));
  } catch (error) {
    dispatch(apiFailure(error.message));
  }
};

// Thunk to Get Item by ID
export const getItemById = (itemId) => async (dispatch) => {
  try {
    const response = await axios.get(`${apiUrl}/items/byId/${itemId}`);
    dispatch(getItemByIdSuccess(response.data.Items[0]));
  } catch (error) {
    dispatch(apiFailure(error.message));
  }
};

// Thunk to Add Item
export const addItem = (itemData) => async (dispatch) => {
 
  try {
    await axios.post(`${apiUrl}/items/addItems`, itemData);
    dispatch(addItemSuccess());
    toast.success('Item added successfully');
  } catch (error) {
    dispatch(apiFailure(error.message));
    
    toast.error(error.response.data.message);
  }
};

// Thunk to Update Item
export const updateItem = (itemId, itemData) => async (dispatch) => {
  try {
    await axios.put(`${apiUrl}/items/update/${itemId}`, itemData);
    dispatch(updateItemSuccess());
    toast.success('Item updated successfully');
  } catch (error) {
    dispatch(apiFailure(error.message));
    toast.error(error.response.data.message);
    
  }
};

// Thunk to Delete Item
export const deleteItem = (itemId) => async (dispatch) => {
  try {
    await axios.delete(`${apiUrl}/items/delete/${itemId}`);
    dispatch(deleteItemSuccess());
    toast.success('Item deleted successfully');
  } catch (error) {
    dispatch(apiFailure(error.message));
    toast.error(error.response.data.message);
  }
};

import axios from 'axios';
import { toast } from 'react-toastify';

import config from '../../config';

const apiUrl = config.apiUrl;

// Action Types
export const FETCH_STORES_SUCCESS = 'FETCH_STORES_SUCCESS';
export const FETCH_STORE_SUCCESS = 'FETCH_STORE_SUCCESS';
export const CREATE_STORE_SUCCESS = 'CREATE_STORE_SUCCESS';
export const UPDATE_STORE_SUCCESS = 'UPDATE_STORE_SUCCESS';
export const DELETE_STORE_SUCCESS = 'DELETE_STORE_SUCCESS';

// Action Creators
export const fetchStoreSuccess = (stores) => ({
  type: FETCH_STORES_SUCCESS,
  payload: stores,
});

export const fetchStoreByIdSuccess = (store) => ({
  type: FETCH_STORE_SUCCESS,
  payload: store,
});

export const createStoreSuccess = (store) => ({
  type: CREATE_STORE_SUCCESS,
  payload: store,
});

export const updateStoreSuccess = (store) => ({
  type: UPDATE_STORE_SUCCESS,
  payload: store,
});

export const deleteStoreSuccess = () => ({
  type: DELETE_STORE_SUCCESS,
});

export const getAllStores = () => async (dispatch) => {
  try {
    const axiosConfig = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${apiUrl}/store/all`,
      headers: {},
    };
   
    const response = await axios.request(axiosConfig);
    console.log(response)
    dispatch(fetchStoreSuccess(response.data.store));
   
  } catch (error) {
    console.error(error);
    toast.error('Failed to fetch stores data');
  }
};

export const getStoreById = (storeId) => async (dispatch) => {
  try {
    const axiosConfig = {
      method: 'get',
      url: `${apiUrl}/store/byId/${storeId}`,
      headers: {},
    };
    const response = await axios.request(axiosConfig);
    dispatch(fetchStoreByIdSuccess(response.data));
    toast.success('Store data fetched successfully');
  } catch (error) {
    console.error(error);
    toast.error('Failed to fetch store data');
  }
};

export const createStore = (storeData) => async (dispatch) => {
  try {
    const axiosConfig = {
      method: 'post',
      url: `${apiUrl}/store/add`,
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify(storeData),
    };
    const response = await axios.request(axiosConfig);
    dispatch(createStoreSuccess(response.data));
    toast.success('Store created successfully');
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

export const updateStore = (storeId, storeData) => async (dispatch) => {

  try {
    const axiosConfig = {
      method: 'put',
      url: `${apiUrl}/store/update/${storeId}`,
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify(storeData),
    };
    const response = await axios.request(axiosConfig);
    dispatch(updateStoreSuccess(response.data));
    toast.success('Store updated successfully');
  } catch (error) {
  
    toast.error(error.response.data.message);
  }
};

export const deleteStore = (storeId) => async (dispatch) => {

  try {
    const axiosConfig = {
      method: 'delete', 
      url: `${apiUrl}/store/delete/${storeId}`,
      headers: {},
    };
    await axios.request(axiosConfig);
    dispatch(deleteStoreSuccess());
    toast.success('Store deleted successfully');
  } catch (error) {
   
    toast.error(error.response.data.message);
  }
};

import axios from 'axios';
import { toast } from 'react-toastify';

import config from '../../config';

const apiUrl = config.apiUrl;

// Action Types
export const FETCH_DRIVERS_SUCCESS = 'FETCH_DRIVERS_SUCCESS';
export const FETCH_DRIVER_SUCCESS = 'FETCH_DRIVER_SUCCESS';
export const CREATE_DRIVER_SUCCESS = 'CREATE_DRIVER_SUCCESS';
export const UPDATE_DRIVER_SUCCESS = 'UPDATE_DRIVER_SUCCESS';
export const DELETE_DRIVER_SUCCESS = 'DELETE_DRIVER_SUCCESS';

// Action Creators
export const fetchDriverSuccess = (drivers) => ({
  type: FETCH_DRIVERS_SUCCESS,
  payload: drivers,
});

export const fetchdriversuccess = (driver) => ({
  type: FETCH_DRIVER_SUCCESS,
  payload: driver,
});

export const createdriversuccess = (driver) => ({
  type: CREATE_DRIVER_SUCCESS,
  payload: driver,
});

export const updatedriversuccess = (driver) => ({
  type: UPDATE_DRIVER_SUCCESS,
  payload: driver,
});

export const deletedriversuccess = () => ({
  type: DELETE_DRIVER_SUCCESS,
});

export const getAllDrivers = () => async (dispatch) => {
  try {
    const axiosConfig = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${apiUrl}/driver/all`,
      headers: {},
    };
   
    const response = await axios.request(axiosConfig);
  
    dispatch(fetchDriverSuccess(response.data.Driver));
   
  } catch (error) {
    console.error(error);
    toast.error('Failed to fetch drivers data');
  }
};

export const getDriverById = (driverId) => async (dispatch) => {
  try {
    const axiosConfig = {
      method: 'get',
      url: `${apiUrl}/driver/byId/${driverId}`,
      headers: {},
    };
    const response = await axios.request(axiosConfig);
    dispatch(fetchdriversuccess(response.data));
    toast.success('driver data fetched successfully');
  } catch (error) {
    console.error(error);
    toast.error('Failed to fetch driver data');
  }
};

export const createDriver = (driverData) => async (dispatch) => {
  try {
    const axiosConfig = {
      method: 'post',
      url: `${apiUrl}/driver/add`,
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify(driverData),
    };
    const response = await axios.request(axiosConfig);
    dispatch(createdriversuccess(response.data));
    toast.success('driver created successfully');
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

export const updateDriver = (driverId, driverData) => async (dispatch) => {

  try {
    const axiosConfig = {
      method: 'put',
      url: `${apiUrl}/driver/update/${driverId}`,
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify(driverData),
    };
    const response = await axios.request(axiosConfig);
    dispatch(updatedriversuccess(response.data));
    toast.success('driver updated successfully');
  } catch (error) {
  
    toast.error(error.response.data.message);
  }
};

export const deleteDriver = (driverId) => async (dispatch) => {

  try {
    const axiosConfig = {
      method: 'delete', 
      url: `${apiUrl}/driver/delete/${driverId}`,
      headers: {},
    };
    await axios.request(axiosConfig);
    dispatch(deletedriversuccess());
    toast.success('driver deleted successfully');
  } catch (error) {
   
    toast.error(error.response.data.message);
  }
};

import axios from 'axios';
import { toast } from 'react-toastify';

import config from '../../config';

const apiUrl = config.apiUrl;

// Action Types
export const FETCH_MECHANICS_SUCCESS = 'FETCH_MECHANICS_SUCCESS';
export const FETCH_MECHANIC_SUCCESS = 'FETCH_MECHANIC_SUCCESS';
export const CREATE_MECHANIC_SUCCESS = 'CREATE_MECHANIC_SUCCESS';
export const UPDATE_MECHANIC_SUCCESS = 'UPDATE_MECHANIC_SUCCESS';
export const DELETE_MECHANIC_SUCCESS = 'DELETE_MECHANIC_SUCCESS';

// Action Creators
export const fetchMechanicsSuccess = (mechanics) => ({
  type: FETCH_MECHANICS_SUCCESS,
  payload: mechanics,
});

export const fetchMechanicSuccess = (mechanic) => ({
  type: FETCH_MECHANIC_SUCCESS,
  payload: mechanic,
});

export const createMechanicSuccess = (mechanic) => ({
  type: CREATE_MECHANIC_SUCCESS,
  payload: mechanic,
});

export const updateMechanicSuccess = (mechanic) => ({
  type: UPDATE_MECHANIC_SUCCESS,
  payload: mechanic,
});

export const deleteMechanicSuccess = () => ({
  type: DELETE_MECHANIC_SUCCESS,
});

export const getAllMechanics = () => async (dispatch) => {
  try {
    const axiosConfig = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${apiUrl}/mechanics/all`,
      headers: {},
    };
    const response = await axios.request(axiosConfig);
    dispatch(fetchMechanicsSuccess(response.data.Mechanic));
   
  } catch (error) {
    console.error(error);
    toast.error('Failed to fetch mechanics data');
  }
};

export const getMechanicById = (mechanicId) => async (dispatch) => {
  try {
    const axiosConfig = {
      method: 'get',
      url: `${apiUrl}/mechanics/byId/${mechanicId}`,
      headers: {},
    };
    const response = await axios.request(axiosConfig);
    dispatch(fetchMechanicSuccess(response.data));
    toast.success('Mechanic data fetched successfully');
  } catch (error) {
    console.error(error);
    toast.error('Failed to fetch mechanic data');
  }
};

export const createMechanic = (mechanicData) => async (dispatch) => {
  try {
    const axiosConfig = {
      method: 'post',
      url: `${apiUrl}/mechanics/add`,
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify(mechanicData),
    };
    const response = await axios.request(axiosConfig);
    dispatch(createMechanicSuccess(response.data));
    toast.success('Mechanic created successfully');
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

export const updateMechanic = (mechanicId, mechanicData) => async (dispatch) => {

  try {
    const axiosConfig = {
      method: 'put',
      url: `${apiUrl}/mechanics/update/${mechanicId}`,
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify(mechanicData),
    };
    const response = await axios.request(axiosConfig);
    dispatch(updateMechanicSuccess(response.data));
    toast.success('Mechanic updated successfully');
  } catch (error) {
  
    toast.error(error.response.data.message);
  }
};

export const deleteMechanic = (mechanicId) => async (dispatch) => {

  try {
    const axiosConfig = {
      method: 'delete', 
      url: `${apiUrl}/mechanics/delete/${mechanicId}`,
      headers: {},
    };
    await axios.request(axiosConfig);
    dispatch(deleteMechanicSuccess());
    toast.success('Mechanic deleted successfully');
  } catch (error) {
   
    toast.error(error.response.data.message);
  }
};

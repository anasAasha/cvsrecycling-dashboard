// adminActions.js

import axios from 'axios';
import config from '../../config';
import {
  ADMIN_LOGIN_REQUEST,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_FAILURE,
  ADMIN_REGISTER_REQUEST,
  ADMIN_REGISTER_SUCCESS,
  ADMIN_REGISTER_FAILURE,
  LOGOUT,
} from '../utils/adminTypes';
import { setAdminToken, removeAdminToken } from '../utils/sessionUtils';

// Admin Login
export const loginAdminRequest = () => {
  return {
    type: ADMIN_LOGIN_REQUEST,
  };
};

export const loginAdminSuccess = (adminData) => {
  return {
    type: ADMIN_LOGIN_SUCCESS,
    payload: adminData,
  };
};

export const loginAdminFailure = (error) => {
  return {
    type: ADMIN_LOGIN_FAILURE,
    payload: error,
  };
};

export const loginAdmin = (userData) => {
  return (dispatch) => {
    dispatch(loginAdminRequest());
    axios
      .post(`${config.apiUrl}/auth/loginAdmin`, userData)
      .then((response) => {
        const { token, adminData } = response.data;
        setAdminToken(token);
        dispatch(loginAdminSuccess(adminData));
      })
      .catch((error) => {
        dispatch(loginAdminFailure(error.message));
      });
  };
};

// Admin Registration
export const adminRegisterRequest = () => {
  return {
    type: ADMIN_REGISTER_REQUEST,
  };
};

export const adminRegisterSuccess = () => {
  return {
    type: ADMIN_REGISTER_SUCCESS,
  };
};

export const adminRegisterFailure = (error) => {
  return {
    type: ADMIN_REGISTER_FAILURE,
    payload: error,
  };
};

export const adminRegister = (adminData) => {
  return (dispatch) => {
    dispatch(adminRegisterRequest());
    axios
      .post(`${config.apiUrl}/auth/adminRegister`, adminData)
      .then(() => {
        dispatch(adminRegisterSuccess());
      })
      .catch((error) => {
        dispatch(adminRegisterFailure(error.message));
      });
  };
};

// Logout action creator
export const logout = () => {
  removeAdminToken();
  return { type: LOGOUT };
};

// adminReducer.js

import {
    ADMIN_LOGIN_REQUEST,
    ADMIN_LOGIN_SUCCESS,
    ADMIN_LOGIN_FAILURE,
    ADMIN_REGISTER_REQUEST,
    ADMIN_REGISTER_SUCCESS,
    ADMIN_REGISTER_FAILURE,
    LOGOUT,
  } from '../utils/adminTypes';
  import { getAdminToken } from '../utils/sessionUtils';
  
  const initialState = {
    adminData: null,
    loading: false,
    error: null,
    token: getAdminToken() || null,
  };
  
  const adminReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADMIN_LOGIN_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case ADMIN_LOGIN_SUCCESS:
        return {
          ...state,
          adminData: action.payload,
          loading: false,
          error: null,
          token: getAdminToken(),
        };
      case ADMIN_LOGIN_FAILURE:
        return {
          ...state,
          adminData: null,
          loading: false,
          error: action.payload,
        };
      case ADMIN_REGISTER_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case ADMIN_REGISTER_SUCCESS:
        return {
          ...state,
          loading: false,
          error: null,
        };
      case ADMIN_REGISTER_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case LOGOUT:
        return {
          ...state,
          adminData: null,
          token: null,
        };
      default:
        return state;
    }
  };
  
  export default adminReducer;
  
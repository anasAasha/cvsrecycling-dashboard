// uploadActions.js

import axios from 'axios';

import config from '../../config';

const apiUrl = config.apiUrl;
export const UPLOAD_REQUEST = 'UPLOAD_REQUEST';
export const UPLOAD_SUCCESS = 'UPLOAD_SUCCESS';
export const UPLOAD_FAILURE = 'UPLOAD_FAILURE';
const uploadRequest = () => ({
  type: UPLOAD_REQUEST,
});

const uploadSuccess = (data) => ({
  type: UPLOAD_SUCCESS,
  payload: data,
});

const uploadFailure = (error) => ({
  type: UPLOAD_FAILURE,
  payload: error,
});

export const uploadImage = (file) => {
  return (dispatch) => {
    dispatch(uploadRequest());

    const formData = new FormData();
    formData.append('image', file);

    axios.post(`${apiUrl}/image/add`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        dispatch(uploadSuccess(response.data.image));
        return response.data.image;
      })
      .catch((error) => {
        dispatch(uploadFailure(error.message));
        throw error; 
      });
  };
};

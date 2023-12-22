// uploadReducer.js
import { UPLOAD_REQUEST, UPLOAD_SUCCESS, UPLOAD_FAILURE } from '../actions/uploadActions';

const initialState = {
  uploading: false,
  uploadedData: null,
  error: null,
};

const uploadReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_REQUEST:
      return {
        ...state,
        uploading: true,
        uploadedData: null,
        error: null,
      };
    case UPLOAD_SUCCESS:
      return {
        ...state,
        uploading: false,
        uploadedData: action.payload,
        error: null,
      };
    case UPLOAD_FAILURE:
      return {
        ...state,
        uploading: false,
        uploadedData: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default uploadReducer;

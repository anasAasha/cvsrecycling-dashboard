// contactReducer.js
import {
    SEND_MESSAGE_SUCCESS,
    SEND_MESSAGE_FAILURE,
    GET_ALL_MESSAGES_SUCCESS,
    GET_ALL_MESSAGES_FAILURE,
    GET_ALL_USERS_SUCCESS,
    GET_ALL_USERS_FAILURE,
    DELETE_CHAT_SUCCESS,
    DELETE_CHAT_FAILURE,
  } from '../actions/contactActions';
  
  const initialState = {
    sendMessageError: null,
    getAllMessagesError: null,
    getAllUsersError: null,
    deleteChatError: null,
    messages: [],
    users: [],
  };
  
  const contactReducer = (state = initialState, action) => {
    switch (action.type) {
      case SEND_MESSAGE_SUCCESS:
        return {
          ...state,
          sendMessageError: null,
        };
  
      case SEND_MESSAGE_FAILURE:
        return {
          ...state,
          sendMessageError: action.payload,
        };
  
      case GET_ALL_MESSAGES_SUCCESS:
        return {
          ...state,
          getAllMessagesError: null,
          messages: action.payload.Messages,
        };
  
      case GET_ALL_MESSAGES_FAILURE:
        return {
          ...state,
          getAllMessagesError: action.payload,
          messages: [],
        };
  
      case GET_ALL_USERS_SUCCESS:
        return {
          ...state,
          getAllUsersError: null,
          users: action.payload.Mechanic,
        };
  
      case GET_ALL_USERS_FAILURE:
        return {
          ...state,
          getAllUsersError: action.payload,
          users: [],
        };
  
      case DELETE_CHAT_SUCCESS:
        return {
          ...state,
          deleteChatError: null,
        };
  
      case DELETE_CHAT_FAILURE:
        return {
          ...state,
          deleteChatError: action.payload,
        };
  
      default:
        return state;
    }
  };
  
  export default contactReducer;
  
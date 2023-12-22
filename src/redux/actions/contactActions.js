// contactActions.js
import axios from 'axios';
import config from '../../config';

const apiUrl = config.apiUrl;

// Action Types
export const SEND_MESSAGE_SUCCESS = 'SEND_MESSAGE_SUCCESS';
export const SEND_MESSAGE_FAILURE = 'SEND_MESSAGE_FAILURE';

export const GET_ALL_MESSAGES_SUCCESS = 'GET_ALL_MESSAGES_SUCCESS';
export const GET_ALL_MESSAGES_FAILURE = 'GET_ALL_MESSAGES_FAILURE';

export const GET_ALL_USERS_SUCCESS = 'GET_ALL_USERS_SUCCESS';
export const GET_ALL_USERS_FAILURE = 'GET_ALL_USERS_FAILURE';

export const DELETE_CHAT_SUCCESS = 'DELETE_CHAT_SUCCESS';
export const DELETE_CHAT_FAILURE = 'DELETE_CHAT_FAILURE';

// Action Creators
export const sendMessageSuccess = (result) => ({
  type: SEND_MESSAGE_SUCCESS,
  payload: result,
});

export const sendMessageFailure = (error) => ({
  type: SEND_MESSAGE_FAILURE,
  payload: error,
});

export const getAllMessagesSuccess = (result) => ({
  type: GET_ALL_MESSAGES_SUCCESS,
  payload: result,
});

export const getAllMessagesFailure = (error) => ({
  type: GET_ALL_MESSAGES_FAILURE,
  payload: error,
});

export const getAllUsersSuccess = (result) => ({
  type: GET_ALL_USERS_SUCCESS,
  payload: result,
});

export const getAllUsersFailure = (error) => ({
  type: GET_ALL_USERS_FAILURE,
  payload: error,
});

export const deleteChatSuccess = (result) => ({
  type: DELETE_CHAT_SUCCESS,
  payload: result,
});

export const deleteChatFailure = (error) => ({
  type: DELETE_CHAT_FAILURE,
  payload: error,
});

// Thunk Actions
export const sendMessage = (userId, message, image) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${apiUrl}/contact/dashboard/sendMessage`, {
        userId,
        message,
        image,
      });

      dispatch(sendMessageSuccess(response.data));
    } catch (error) {
      dispatch(sendMessageFailure('Error sending message.'));
    }
  };
};

export const getAllMessages = (userId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${apiUrl}/contact/dashboard/getChat/${userId}`);

      dispatch(getAllMessagesSuccess(response.data));
    } catch (error) {
      dispatch(getAllMessagesFailure('Error fetching messages.'));
    }
  };
};

export const getAllUsers = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${apiUrl}/contact/dashboard/getUsers`);

      dispatch(getAllUsersSuccess(response.data));
    } catch (error) {
      dispatch(getAllUsersFailure('Error fetching users.'));
    }
  };
};

export const deleteChat = (userId) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(`${apiUrl}/contact/dashboard/delete/${userId}`);

      dispatch(deleteChatSuccess(response.data));
    } catch (error) {
      dispatch(deleteChatFailure('Error deleting chat.'));
    }
  };
};

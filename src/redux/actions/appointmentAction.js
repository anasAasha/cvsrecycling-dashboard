import axios from 'axios';
import { toast } from 'react-toastify';
import config from '../../config';

const apiUrl = config.apiUrl;

// Action Types
export const FETCH_APPOINTMENTS_SUCCESS = 'FETCH_APPOINTMENTS_SUCCESS';
export const FETCH_APPOINTMENT_SUCCESS = 'FETCH_APPOINTMENT_SUCCESS';
export const CREATE_APPOINTMENT_SUCCESS = 'CREATE_APPOINTMENT_SUCCESS';
export const UPDATE_APPOINTMENT_SUCCESS = 'UPDATE_APPOINTMENT_SUCCESS';
export const DELETE_APPOINTMENT_SUCCESS = 'DELETE_APPOINTMENT_SUCCESS';
export const MARK_AS_INVALID_SUCCESS = 'MARK_AS_INVALID_SUCCESS';
export const ADD_TO_WAITING_LIST_SUCCESS = 'ADD_TO_WAITING_LIST_SUCCESS';
export const DELAY_APPOINTMENT_SUCCESS = 'DELAY_APPOINTMENT_SUCCESS';
export const REJECT_APPOINTMENT_SUCCESS = 'REJECT_APPOINTMENT_SUCCESS';
export const CONFIRM_APPOINTMENT_SUCCESS = 'CONFIRM_APPOINTMENT_SUCCESS';
export const RESCHEDULE_APPOINTMENT_SUCCESS = 'RESCHEDULE_APPOINTMENT_SUCCESS';
export const CANCEL_APPOINTMENT_SUCCESS = 'CANCEL_APPOINTMENT_SUCCESS';

// Action Creators
export const fetchAppointmentsSuccess = (appointments) => ({
  type: FETCH_APPOINTMENTS_SUCCESS,
  payload: appointments,
});

export const fetchAppointmentSuccess = (appointment) => ({
  type: FETCH_APPOINTMENT_SUCCESS,
  payload: appointment,
});

export const createAppointmentSuccess = (appointment) => ({
  type: CREATE_APPOINTMENT_SUCCESS,
  payload: appointment,
});

export const updateAppointmentSuccess = (appointment) => ({
  type: UPDATE_APPOINTMENT_SUCCESS,
  payload: appointment,
});

export const deleteAppointmentSuccess = () => ({
  type: DELETE_APPOINTMENT_SUCCESS,
});

export const markAsInvalidSuccess = (appointment) => ({
  type: MARK_AS_INVALID_SUCCESS,
  payload: appointment,
});

export const addToWaitingListSuccess = (appointment) => ({
  type: ADD_TO_WAITING_LIST_SUCCESS,
  payload: appointment,
});

export const delayAppointmentSuccess = (appointment) => ({
  type: DELAY_APPOINTMENT_SUCCESS,
  payload: appointment,
});

export const rejectAppointmentSuccess = (appointment) => ({
  type: REJECT_APPOINTMENT_SUCCESS,
  payload: appointment,
});

export const confirmAppointmentSuccess = (appointment) => ({
  type: CONFIRM_APPOINTMENT_SUCCESS,
  payload: appointment,
});

export const rescheduleAppointmentSuccess = (appointment) => ({
  type: RESCHEDULE_APPOINTMENT_SUCCESS,
  payload: appointment,
});

export const cancelAppointmentSuccess = (appointment) => ({
  type: CANCEL_APPOINTMENT_SUCCESS,
  payload: appointment,
});

// Async Action Creators
export const getAllAppointments = () => async (dispatch) => {
  try {
    const response = await axios.get(`${apiUrl}/appointments/all`);
    dispatch(fetchAppointmentsSuccess(response.data.Appointments));
  } catch (error) {
    console.error('API Error:', error);
    // toast.error('Failed to fetch appointments');
  }
};

export const getAppointmentById = (appointmentId) => async (dispatch) => {
  try {
    const response = await axios.get(`${apiUrl}/appointments/byId/${appointmentId}`);
    dispatch(fetchAppointmentSuccess(response.data.Appointment));
    toast.success('Appointment fetched successfully');
  } catch (error) {
    console.error('API Error:', error);
    // toast.error('Failed to fetch appointment');
  }
};

export const createAppointment = (appointmentData) => async (dispatch) => {
  try {
    const response = await axios.post(`${apiUrl}/appointments/addAppointment`, appointmentData);
    dispatch(createAppointmentSuccess(response.data.Appointment));
    toast.success('Appointment created successfully');
  } catch (error) {
    console.error('API Error:', error);
    toast.error('Failed to create appointment');
  }
};

export const updateAppointment = (appointmentId, appointmentData) => async (dispatch) => {
  try {
    const response = await axios.put(`${apiUrl}/appointments/update/${appointmentId}`, appointmentData);
    dispatch(updateAppointmentSuccess(response.data.Appointment));
    toast.success('Appointment updated successfully', { autoClose: 2000 });
  } catch (error) {
    console.error('API Error:', error);
    toast.error('Failed to update appointment');
  }
};

export const deleteAppointment = (appointmentId) => async (dispatch) => {
  try {
    const shouldDelete = window.confirm('Are you sure you want to delete this appointment?');
    if (!shouldDelete) {
      return;
    }
    await axios.delete(`${apiUrl}/appointments/delete/${appointmentId}`);
    dispatch(deleteAppointmentSuccess());
    toast.success('Appointment deleted successfully');
  } catch (error) {
    console.error('API Error:', error);
    toast.error('Failed to delete appointment');
  }
};

export const markAsInvalid = (appointmentId) => async (dispatch) => {
  try {
    const response = await axios.put(`${apiUrl}/appointments/markAsInvalid/${appointmentId}`);
    dispatch(markAsInvalidSuccess(response.data.Appointment));
    toast.success('Appointment marked as invalid successfully');
  } catch (error) {
    console.error('API Error:', error);
    toast.error('Failed to mark appointment as invalid');
  }
};

export const addToWaitingList = (appointmentId) => async (dispatch) => {
  try {
    const response = await axios.put(`${apiUrl}/appointments/addToWaitingList/${appointmentId}`);
    dispatch(addToWaitingListSuccess(response.data.Appointment));
    toast.success('Appointment added to waiting list successfully');
  } catch (error) {
    console.error('API Error:', error);
    toast.error('Failed to add appointment to waiting list');
  }
};

export const delayAppointment = (appointmentId) => async (dispatch) => {
  try {
    console.log('API Error1232');
    const response = await axios.put(`${apiUrl}/appointments/delay/${appointmentId}`);
    console.log("ers",response)
    dispatch(delayAppointmentSuccess(response.data.Appointment));
    toast.success('Appointment delayed successfully');
  } catch (error) {
    console.error('API Error:', error);
    toast.error('Failed to delay appointment');
  }
};

export const rejectAppointment = (appointmentId) => async (dispatch) => {
  try {
    const response = await axios.put(`${apiUrl}/appointments/reject/${appointmentId}`);
    dispatch(rejectAppointmentSuccess(response.data.Appointment));
    toast.success('Appointment rejected successfully');
  } catch (error) {
    console.error('API Error:', error);
    toast.error('Failed to reject appointment');
  }
};

export const confirmAppointment = (appointmentId) => async (dispatch) => {
  try {
    const response = await axios.put(`${apiUrl}/appointments/confirm/${appointmentId}`);
    dispatch(confirmAppointmentSuccess(response.data.Appointment));
    toast.success('Appointment confirmed successfully');
  } catch (error) {
    console.error('API Error:', error);
    toast.error('Failed to confirm appointment');
  }
};

export const rescheduleAppointment = (appointmentId, appointmentData) => async (dispatch) => {
  try {
    const response = await axios.put(`${apiUrl}/appointments/reschedule/${appointmentId}`, appointmentData);
    dispatch(rescheduleAppointmentSuccess(response.data.Appointment));
    toast.success('Appointment rescheduled successfully');
  } catch (error) {
    console.error('API Error:', error);
    toast.error('Failed to reschedule appointment');
  }
};

export const cancelAppointment = (appointmentId) => async (dispatch) => {
  try {
    const response = await axios.put(`${apiUrl}/appointments/cancel/${appointmentId}`);
    dispatch(cancelAppointmentSuccess(response.data.Appointment));
    toast.success('Appointment canceled successfully');
  } catch (error) {
    console.error('API Error:', error);
    toast.error('Failed to cancel appointment');
  }
};

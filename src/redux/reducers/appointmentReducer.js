import {
    FETCH_APPOINTMENTS_SUCCESS,
    FETCH_APPOINTMENT_SUCCESS,
    CREATE_APPOINTMENT_SUCCESS,
    UPDATE_APPOINTMENT_SUCCESS,
    DELETE_APPOINTMENT_SUCCESS,
    MARK_AS_INVALID_SUCCESS,
    ADD_TO_WAITING_LIST_SUCCESS,
    DELAY_APPOINTMENT_SUCCESS,
    REJECT_APPOINTMENT_SUCCESS,
    CONFIRM_APPOINTMENT_SUCCESS,
    RESCHEDULE_APPOINTMENT_SUCCESS,
    CANCEL_APPOINTMENT_SUCCESS,
  } from '../actions/appointmentAction';
  
  const initialState = {
    appointments: [],
    appointment: null,
  };
  
  const appointmentReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_APPOINTMENTS_SUCCESS:
        return {
          ...state,
          appointments: action.payload,
        };
  
      case FETCH_APPOINTMENT_SUCCESS:
      case CREATE_APPOINTMENT_SUCCESS:
      case UPDATE_APPOINTMENT_SUCCESS:
      case MARK_AS_INVALID_SUCCESS:
      case ADD_TO_WAITING_LIST_SUCCESS:
      case DELAY_APPOINTMENT_SUCCESS:
      case REJECT_APPOINTMENT_SUCCESS:
      case CONFIRM_APPOINTMENT_SUCCESS:
      case RESCHEDULE_APPOINTMENT_SUCCESS:
      case CANCEL_APPOINTMENT_SUCCESS:
        return {
          ...state,
          appointment: action.payload,
        };
  
      case DELETE_APPOINTMENT_SUCCESS:
        return {
          ...state,
          appointment: null,
        };
  
      default:
        return state;
    }
  };
  
  export default appointmentReducer;
  
import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Container, Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAppointments } from '../../redux/actions/appointmentAction'; 

const AppointmentScheduleCalendar = () => {
  const localizer = momentLocalizer(moment);
  const dispatch = useDispatch();
  const appointments = useSelector((state) => state.appointment.appointments);

 
  useEffect(() => {
    dispatch(getAllAppointments());
  }, [dispatch]);

  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  
  const events = appointments.map((appointment) => ({
    id: appointment.AppointmentID,
    start: new Date(appointment.AppointmentDate),
    color: '#3174ad',
    description: appointment.Note,
    title: `Start Time: ${appointment.StartTime}`,
    end: moment(appointment.AppointmentDate).add(1, 'hour').toDate(),
    StartTime: appointment.StartTime, 
    Note: appointment.Note, 
    Status: appointment.Status, 
  }));
  const eventStyleGetter = (event) => {
    return {
      style: {
        backgroundColor: event.color,
        height: '40px', 
        border: '1px solid #000', 
      },
    };
  };
  return (
    <Container>
      <h2 className="mt-4 mb-3">Appointment Schedule Calendar</h2>
      <div className="mb-5">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="start"
          defaultDate={moment().toDate()}
          eventPropGetter={eventStyleGetter} 
          style={{ height: 600 }}
          onSelectEvent={handleEventClick}
        />
      </div>

      
      <Modal show={selectedEvent !== null} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Appointment Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedEvent && (
            <>
            
              
              <p>Appointment Date: {selectedEvent.AppointmentDate}</p>
              <p>Start Time: {selectedEvent.StartTime}</p>
              <p>Note: {selectedEvent.Note}</p>
              <p>Status: {selectedEvent.Status}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AppointmentScheduleCalendar;

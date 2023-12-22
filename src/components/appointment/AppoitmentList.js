import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FaEdit, FaTrash, FaSearch } from 'react-icons/fa';
import { TbSettingsStar } from 'react-icons/tb';
import { AiOutlinePlus } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment,
  markAsInvalid,
  addToWaitingList,
  delayAppointment,
  rejectAppointment,
  confirmAppointment,
  rescheduleAppointment,
  cancelAppointment,
} from '../../redux/actions/appointmentAction';
import {
  getAllMechanics,
} from '../../redux/actions/mechanicActions';
import {
  getAllDrivers,
} from '../../redux/actions/driverActions';
import {
  getAllStores,
} from '../../redux/actions/storeAction';

const AppointmentList = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    MechanicID: '',
    DriverID: '',
    StoreID: '',
    AppointmentDate: '',
    StartTime: '',
    Note: '',
    Status: 'Pending',
  });
  const [editedAppointment, setEditedAppointment] = useState({
    AppointmentID: '',
    MechanicID: '',
    DriverID: '',
    StoreID: '',
    AppointmentDate: '',
    StartTime: '',
    Note: '',
    Status: 'Pending',
  });

  const [searchText, setSearchText] = useState('');

  const dispatch = useDispatch();
  const appointments = useSelector((state) => state.appointment.appointments);
  const mechanics = useSelector((state) => state.mechanic.mechanics);
  const drivers = useSelector((state) => state.driver.drivers);
  const stores = useSelector((state) => state.store.stores);

  useEffect(() => {
    dispatch(getAllAppointments());
    dispatch(getAllMechanics());
    dispatch(getAllDrivers());
    dispatch(getAllStores());
  }, [dispatch]);

  const handleShowAddModal = () => {
    setShowAddModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };

  const handleShowEditModal = (appointment) => {
    setEditedAppointment({
      AppointmentID: appointment.AppointmentID,
      MechanicID: appointment.MechanicID || '',
      DriverID: appointment.DriverID || '',
      StoreID: appointment.StoreID || '',
      AppointmentDate: appointment.AppointmentDate,
      StartTime: appointment.StartTime,
      Note: appointment.Note || '',
      Status: appointment.Status,
    });
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const handleAdd = () => {
    dispatch(createAppointment(newAppointment));
    setNewAppointment({
      MechanicID: '',
      DriverID: '',
      StoreID: '',
      AppointmentDate: '',
      StartTime: '',
      Note: '',
      Status: 'Pending',
    });
    handleCloseAddModal();
  };

  const handleUpdate = () => {
    dispatch(updateAppointment(editedAppointment.AppointmentID, editedAppointment))
      .then(() => {
        dispatch(getAllAppointments());
      })
      .catch((error) => {
        console.error('Error updating appointment:', error);
      });

    handleCloseEditModal();
  };

  const handleDelete = (appointment) => {
    dispatch(deleteAppointment(appointment.AppointmentID));
  };

  const handleDelayAppointment = (appointment) => {
    dispatch(delayAppointment(appointment.AppointmentID))
      .then(() => {
        // Fetch all appointments again after changing status
        dispatch(getAllAppointments());
      })
      .catch((error) => {
        console.error('Error delaying appointment:', error);
      });
  };

  const handleRejectAppointment = (appointment) => {
    dispatch(rejectAppointment(appointment.AppointmentID))
      .then(() => {

        dispatch(getAllAppointments());
      })
      .catch((error) => {
        console.error('Error rejecting appointment:', error);
      });
  };

  const handleConfirmAppointment = (appointment) => {
    dispatch(confirmAppointment(appointment.AppointmentID))
      .then(() => {
        // Fetch all appointments again after changing status
        dispatch(getAllAppointments());
      })
      .catch((error) => {
        console.error('Error confirming appointment:', error);
      });
  };

  const handleRescheduleAppointment = (appointment) => {

    const rescheduleData = {
      AppointmentDate: appointment.AppointmentDate,
      StartTime: appointment.StartTime,
    };
    dispatch(rescheduleAppointment(appointment.AppointmentID, rescheduleData))
      .then(() => {

        dispatch(getAllAppointments());
      })
      .catch((error) => {
        console.error('Error rescheduling appointment:', error);
      });
  };

  const handleCancelAppointment = (appointment) => {
    dispatch(cancelAppointment(appointment.AppointmentID))
      .then(() => {

        dispatch(getAllAppointments());
      })
      .catch((error) => {
        console.error('Error canceling appointment:', error);
      });
  };
  const columns = [
    {
      name: 'ID',
      selector: (row) => row.AppointmentID,
      sortable: true,
    },
    {
      name: 'Mechanic',
      selector: (row) => {
        const mechanic = mechanics.find((m) => m.UserID === row.MechanicID);
        return mechanic ? mechanic.FullName : '';
      },
      sortable: true,
    },


    {
      name: 'Driver',
      selector: (row) => {
        const driver = drivers.find((d) => d.UserID === row.DriverID);
        return driver ? driver.FullName : '';
      },
      sortable: true,
    },
    {
      name: 'Store',
      selector: (row) => {
        const store = stores.find((d) => d.StoreID === row.StoreID);
        return store ? store.StoreName : '';
      },
      sortable: true,
    },
    {
      name: 'Appointment Date',
      selector: (row) => formatDateToYYYYMMDD(row.AppointmentDate) ,
      sortable: true,
    },
    {
      name: 'Start Time',
      selector: (row) => row.StartTime,
      sortable: true,
    },
    {
      name: 'Note',
      selector: (row) => row.Note,
      sortable: true,
    },
    {
      name: 'Status',
      selector: (row) => row.Status,
      sortable: true,
    },
    {
      name: 'Change Status',

      cell: (row) => (
        <div className=''  >


          <button
            className="btn btn-warning"
            onClick={() => handleDelayAppointment(row)}
          >
            Delay
          </button>
          <button
            className="btn btn-danger "
            onClick={() => handleRejectAppointment(row)}
          >
            Reject
          </button>
          <button
            className="btn btn-success "
            onClick={() => handleConfirmAppointment(row)}
          >
            Confirm
          </button>

          <button
            className="btn btn-danger "
            onClick={() => handleCancelAppointment(row)}
          >
            Cancel
          </button>
        </div>
      ),
    },
    {
      name: 'Actions',
      cell: (row) => (
        <div>
          <FaEdit
            className="text-primary"
            onClick={() => handleShowEditModal(row)}
            style={{ cursor: 'pointer', marginRight: '8px' }}
          />
          <FaTrash
            className="text-danger"
            onClick={() => handleDelete(row)}
            style={{ cursor: 'pointer' }}
          />
        </div>
      ),
    },
  ];

  const formatDateToYYYYMMDD = (dateString) => {
    const date = new Date(dateString);
    if (!isNaN(date)) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
    return dateString;
  };
  return (
    <section className="section">
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">
                <TbSettingsStar size={'2rem'} className='me-2' />Appointments
              </h5>
              <p>Appointment Details</p>
              <div >
                <div className="d-flex justify-content-between align-items-center mb-5">
                  <Button variant="primary" onClick={handleShowAddModal}>
                    Add Appointment
                    <AiOutlinePlus size={'1.2rem'} className='ms-2' />
                  </Button>
                  <div className="d-flex align-items-center">
                    <FaSearch style={{ marginRight: '5px' }} />
                    <Form.Control
                      type="text"
                      placeholder="Search Appointments"
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                    />
                  </div>
                </div>
                <DataTable
                  columns={columns}
                  data={appointments}
                 
                  pagination
                />
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Edit Appointment Modal */}
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Edit Appointment Form */}
          <Form>
            <Form.Group controlId="editMechanic">
              <Form.Label>Mechanic</Form.Label>
              <Form.Control
                as="select"
                value={editedAppointment.MechanicID}
                onChange={(e) => setEditedAppointment({ ...editedAppointment, MechanicID: e.target.value })}
              >
                <option value="">Select Mechanic</option>
                {mechanics.map((mechanic) => (
                  <option key={mechanic.UserID} value={mechanic.UserID}>
                    {mechanic.FullName}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="editDriver">
              <Form.Label>Driver</Form.Label>
              <Form.Control
                as="select"
                value={editedAppointment.DriverID}
                onChange={(e) => setEditedAppointment({ ...editedAppointment, DriverID: e.target.value })}
              >
                <option value="">Select Driver</option>
                {drivers.map((driver) => (
                  <option key={driver.UserID} value={driver.UserID}>
                    {driver.FullName}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="editStore">
              <Form.Label>Store</Form.Label>
              <Form.Control
                as="select"
                value={editedAppointment.StoreID}
                onChange={(e) => setEditedAppointment({ ...editedAppointment, StoreID: e.target.value })}
              >
                <option value="">Select Store</option>
                {stores.map((store) => (
                  <option key={store.StoreID} value={store.StoreID}>
                    {store.StoreName}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="editAppointmentDate">
              <Form.Label>Appointment Date</Form.Label>
              <Form.Control
                type="date"
                value={formatDateToYYYYMMDD(editedAppointment.AppointmentDate)}
                onChange={(e) => setEditedAppointment({ ...editedAppointment, AppointmentDate: e.target.value })}
              />
            
              <div>
                {editedAppointment.AppointmentDate && (
                  <p>
                    Appointment Date: {formatDateToYYYYMMDD(editedAppointment.AppointmentDate)}
                  </p>
                )}
              </div>
            </Form.Group>

            <Form.Group controlId="editStartTime">
              <Form.Label>Start Time</Form.Label>
              <Form.Control
                type="time"
                value={editedAppointment.StartTime}
                onChange={(e) => setEditedAppointment({ ...editedAppointment, StartTime: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="editNote">
              <Form.Label>Note</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={editedAppointment.Note}
                onChange={(e) => setEditedAppointment({ ...editedAppointment, Note: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="editStatus">
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                value={editedAppointment.Status}
                onChange={(e) => setEditedAppointment({ ...editedAppointment, Status: e.target.value })}
              >
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Invalid">Invalid</option>
                <option value="Rescheduled">Rescheduled</option>
                <option value="Delayed">Delayed</option>
                <option value="Rejected">Rejected</option>
                <option value="Canceled">Canceled</option>
                <option value="Waiting">Waiting</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add Appointment Modal */}
      <Modal show={showAddModal} onHide={handleCloseAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Add Appointment Form */}
          <Form>
            <Form.Group controlId="addMechanic">
              <Form.Label>Mechanic</Form.Label>
              <Form.Control
                as="select"
                value={newAppointment.MechanicID}
                onChange={(e) => setNewAppointment({ ...newAppointment, MechanicID: e.target.value })}
              >
                <option value="">Select Mechanic</option>
                {mechanics.map((mechanic) => (
                  <option key={mechanic.UserID} value={mechanic.UserID}>
                    {mechanic.FullName}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="addDriver">
              <Form.Label>Driver</Form.Label>
              <Form.Control
                as="select"
                value={newAppointment.DriverID}
                onChange={(e) => setNewAppointment({ ...newAppointment, DriverID: e.target.value })}
              >
                <option value="">Select Driver</option>
                {drivers.map((driver) => (
                  <option key={driver.UserID} value={driver.UserID}>
                    {driver.FullName}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="addStore">
              <Form.Label>Store</Form.Label>
              <Form.Control
                as="select"
                value={newAppointment.StoreID}
                onChange={(e) => setNewAppointment({ ...newAppointment, StoreID: e.target.value })}
              >
                <option value="">Select Store</option>
                {stores.map((store) => (
                  <option key={store.StoreID} value={store.StoreID}>
                    {store.StoreName}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="addAppointmentDate">
              <Form.Label>Appointment Date</Form.Label>
              <Form.Control
                type="date"
                value={newAppointment.AppointmentDate}
                onChange={(e) => setNewAppointment({ ...newAppointment, AppointmentDate: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="addStartTime">
              <Form.Label>Start Time</Form.Label>
              <Form.Control
                type="time"
                value={newAppointment.StartTime}
                onChange={(e) => setNewAppointment({ ...newAppointment, StartTime: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="addNote">
              <Form.Label>Note</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={newAppointment.Note}
                onChange={(e) => setNewAppointment({ ...newAppointment, Note: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="addStatus">
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                value={newAppointment.Status}
                onChange={(e) => setNewAppointment({ ...newAppointment, Status: e.target.value })}
              >
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Invalid">Invalid</option>
                <option value="Rescheduled">Rescheduled</option>
                <option value="Delayed">Delayed</option>
                <option value="Rejected">Rejected</option>
                <option value="Canceled">Canceled</option>
                <option value="Waiting">Waiting</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAdd}>
            Add Appointment
          </Button>
        </Modal.Footer>
      </Modal>

    </section>
  );
};

export default AppointmentList;

import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { FaEdit, FaTrash} from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllStores,
  createStore, 
  updateStore,
  deleteStore, 
} from '../redux/actions/storeAction'; 
import { StyleSheetManager } from "styled-components";
import { MdOutlineStoreMallDirectory } from 'react-icons/md';
import { Link } from 'react-router-dom';
import GenericDataTable from '../components/common/reuseable/GenericDataTable';
const Store = () => { 
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newStore, setNewStore] = useState({ 
    full_name: '',
    phone_no: '',
    email: '',
    street: '',
    address: '',
    zip: '',
  });
  const [searchText, setSearchText] = useState('');

  const dispatch = useDispatch();
  const storesList = useSelector((state) => state.store.stores); 
  useEffect(() => {
    dispatch(getAllStores()); 
  }, [dispatch]);

  const handleDelete = (storeId) => { 
    dispatch(deleteStore(storeId))
      .then(() => {
        dispatch(getAllStores()); 
      })
      .catch((error) => {
        console.error('Error deleting store:', error);
      });
  };

  const handleEdit = (store) => {
    setNewStore({
      full_name: store.full_name,
      phone_no: store.phone,
      street: store.street,
      address: store.address,
      zip: store.zip,
      email: store.email,
      id: store.id,
    });
    setShowEditModal(true);
  };

  const handleUpdate = () => {
    dispatch(updateStore(newStore.id, newStore))
      .then(() => {
        dispatch(getAllStores()); 
      })
      .catch((error) => {
        console.error('Error updating store:', error);
      });

    handleCloseEditModal();
  };

  const handleAdd = () => {
    dispatch(createStore(newStore))
      .then(() => {
        dispatch(getAllStores()); 
      })
      .catch((error) => {
        console.error('Error creating store:', error);
      });

    handleCloseAddModal();
  };

  const handleShowAddModal = () => {
    setShowAddModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const columns = [
    {
      name: 'ID',
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: 'Store Name',
      cell: (row) => (
        <Link to={`/store/${row.id}`}>
          {row.full_name}
        </Link>
      ),
      sortable: true,
    },
   
    {
      name: 'Shop Number',
      selector: (row) => row.phone,
      sortable: true,
    },
    {
      name: 'Street',
      selector: (row) => row.street,
      sortable: true,
    },
    {
      name: 'address',
      selector: (row) => row.address,
      sortable: true,
    },
   
    {
      name: 'Zip Code',
      selector: (row) => row.zip,
      sortable: true,
    },
    {
      name: 'Actions',
      cell: (row) => (
        <div>
          <FaEdit
            className="text-primary"
            style={{
              cursor: 'pointer',
              marginRight: '8px',
            }}
            onClick={() => handleEdit(row)}
          />
          <FaTrash
            className="text-danger"
            onClick={() => handleDelete(row.StoreID)}
            style={{ cursor: 'pointer' }}
          />
        </div>
      ),
      sortable: false,
    },
  ];

  return (
    <StyleSheetManager shouldForwardProp={(prop) => prop !== "sortActive"}><section className="section">
      
      <GenericDataTable
          title="Stores"
          icon={  <MdOutlineStoreMallDirectory size={'2rem'} className='me-2' />}
          data={storesList.filter((store) =>
            (store.full_name && store.full_name.toLowerCase().includes(searchText.toLowerCase()))
          )}
          columns={columns}
          handleShowAddModal={handleShowAddModal}
          searchText={searchText}
          onSearchChange={setSearchText}
        />

      <Modal show={showAddModal} onHide={handleCloseAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Store</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Store Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Store Name"
                value={newStore.full_name}
                onChange={(e) =>
                  setNewStore({
                    ...newStore,
                    full_name: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Shop Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Shop Number"
                value={newStore.phone_no}
                onChange={(e) =>
                  setNewStore({
                    ...newStore,
                    phone_no: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Shop Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Shop Number"
                value={newStore.email}
                onChange={(e) =>
                  setNewStore({
                    ...newStore,
                    email: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Street</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Street"
                value={newStore.street}
                onChange={(e) =>
                  setNewStore({
                    ...newStore,
                    street: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter address"
                value={newStore.address}
                onChange={(e) =>
                  setNewStore({
                    ...newStore,
                    address: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Zip Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Zip Code"
                value={newStore.zip}
                onChange={(e) =>
                  setNewStore({
                    ...newStore,
                    zip: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAdd}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Store</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Store Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Store Name"
                value={newStore.full_name}
                onChange={(e) =>
                  setNewStore({
                    ...newStore,
                    full_name: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Shop Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Shop Number"
                value={newStore.phone}
                onChange={(e) =>
                  setNewStore({
                    ...newStore,
                    phone: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Street</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Street"
                value={newStore.street}
                onChange={(e) =>
                  setNewStore({
                    ...newStore,
                    street: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter address"
                value={newStore.address}
                onChange={(e) =>
                  setNewStore({
                    ...newStore,
                    address: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Zip Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Zip Code"
                value={newStore.zip}
                onChange={(e) =>
                  setNewStore({
                    ...newStore,
                    zip: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </section></StyleSheetManager>
    
  );
};

export default Store;

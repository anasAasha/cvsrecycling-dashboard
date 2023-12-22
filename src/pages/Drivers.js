import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Modal, Button, Form, Badge } from "react-bootstrap";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";
import {
  createDriver,
  deleteDriver,
  getAllDrivers,
  updateDriver,
} from "../redux/actions/driverActions";
import { CiDeliveryTruck } from "react-icons/ci";
import config from "../config";
import { StyleSheetManager } from "styled-components";

const Drivers = () => {
  const apiUrl = config.apiUrl;
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newDriver, setNewDriver] = useState({
    full_name: "",
    email: "",
    phone_no: "",
    address: "",
    image: "",
  });
  const [searchText, setSearchText] = useState("");
  const [editedPicFile, setEditedPicFile] = useState(null);

  const dispatch = useDispatch();
  const driversList = useSelector((state) => state.driver.drivers);

  useEffect(() => {
    dispatch(getAllDrivers());
  }, [dispatch]);

  const handleEdit = (driver) => {
    setNewDriver({
      full_name: driver.full_name,
      address: driver.address,
      email: driver.email,
      phone_no: driver.phone,
      image: driver.image,
      id: driver.id,
    });

    setShowEditModal(true);
  };

  const handleUpdate = () => {
    dispatch(updateDriver(newDriver.id, { ...newDriver, image: editedPicFile }))
      .then(() => {
        dispatch(getAllDrivers());
        resetForm();
      })
      .catch((error) => {
        console.error("Error updating Driver:", error);
      });

    handleCloseEditModal();
  };

  const handleAdd = () => {
    dispatch(createDriver({ ...newDriver, image: editedPicFile }))
      .then(() => {
        dispatch(getAllDrivers());
        resetForm();
      })
      .catch((error) => {
        console.error("Error creating driver:", error);
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

  const handleDelete = async (driver) => {
    try {
      const shouldDelete = window.confirm(
        `Are you sure you want to delete ${driver.full_name}?`
      );

      if (shouldDelete) {
        await dispatch(deleteDriver(driver.id));
        await dispatch(getAllDrivers());
      } else {
        console.log("Deletion canceled by user");
      }
    } catch (error) {
      console.error("Error deleting driver:", error);
    }
  };

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Driver Name",
      cell: (row) => <Link to={`/drivers/${row.id}`}>{row.full_name}</Link>,
      sortable: true,
    },
    {
      name: "Address",
      selector: (row) => row.address,
      sortable: true,
    },
    {
      name: "Phone Number",
      selector: (row) => row.phone,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Image",
      cell: (row) => (
        <div>
          {row.image ? (
            <img
              src={row.image}
              alt={row.full_name}
              style={{ width: "50px", height: "50px" }}
            />
          ) : (
            <span>{row.full_name}</span>
          )}
        </div>
      ),
      sortable: false,
    },
    {
      name: "is Deleted",
      cell: (row) => (
        <Badge bg={row.is_deleted ? "danger" : "success"}>
          {row.is_deleted ? "is_deleted" : "not deleted"}
        </Badge>
      ),
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div>
          <FaEdit
            className="text-primary"
            style={{
              cursor: "pointer",
              marginRight: "8px",
            }}
            onClick={() => handleEdit(row)}
          />
          <FaTrash
            className="text-danger"
            onClick={() => handleDelete(row)}
            style={{ cursor: "pointer" }}
          />
        </div>
      ),
      sortable: false,
    },
  ];

  const resetForm = () => {
    setNewDriver({
      full_name: "",
      email: "",
      phone: "",
      address: "",
      image: "",
      id: null,
    });

    setEditedPicFile(null);
  };

  const handlePicFileChange = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];

      setNewDriver((prevDriver) => ({
        ...prevDriver,
        image: file.name,
      }));

      const formData = new FormData();
      formData.append("image", file);
      const requestOptions = {
        method: "POST",
        body: formData,
      };
      fetch(`${apiUrl}/image/add`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          setNewDriver((prevDriver) => ({
            ...prevDriver,
            image: result.image,
          }));
          setEditedPicFile(result.image);
          
        })
        .catch((error) => console.log("error", error));
    } else {
      setEditedPicFile(null);

      setNewDriver((prevDriver) => ({
        ...prevDriver,
        image: "",
      }));
    }
  };

  return (
    <StyleSheetManager shouldForwardProp={(prop) => prop !== "sortActive"}>
      <section className="section">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">
                  <CiDeliveryTruck size={"2rem"} className="me-2" />
                  Drivers
                </h5>
                <div >
                  <div className="d-flex justify-content-between align-items-center mb-5">
                    <Button variant="primary" onClick={handleShowAddModal}>
                      Add Drivers
                      <AiOutlinePlus size={"1.2rem"} className="ms-2" />
                    </Button>
                    <div className="d-flex align-items-center">
                      <FaSearch style={{ marginRight: "5px" }} />
                      <Form.Control
                        type="text"
                        placeholder="Search Drivers"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                      />
                    </div>
                  </div>
                  <DataTable
                    columns={columns}
                    data={driversList.filter(
                      (driver) =>
                        driver.full_name &&
                        driver.full_name
                          .toLowerCase()
                          .includes(searchText.toLowerCase())
                    )}
                    pagination
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal show={showAddModal} onHide={handleCloseAddModal} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Add Drivers</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Drivers Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Drivers Name"
                  value={newDriver.full_name}
                  required
                  onChange={(e) =>
                    setNewDriver({
                      ...newDriver,
                      full_name: e.target.value,
                    })
                  }
                />
                <Form.Text className="text-muted">
                  Please enter a valid Drivers Name.
                </Form.Text>
              </Form.Group>
              <Form.Group>
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Address"
                  value={newDriver.address}
                  onChange={(e) =>
                    setNewDriver({
                      ...newDriver,
                      address: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Contact No</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Contact No"
                  value={newDriver.phone_no || ""}
                  onChange={(e) =>
                    setNewDriver({
                      ...newDriver,
                      phone_no: e.target.value,
                    })
                  }
                />

                <Form.Text className="text-muted">
                  Please enter a valid Contact No with digits only.
                </Form.Text>
              </Form.Group>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  value={newDriver.email}
                  onChange={(e) =>
                    setNewDriver({
                      ...newDriver,
                      email: e.target.value,
                    })
                  }
                />
                <Form.Text className="text-muted">
                  Please enter a valid Email.
                </Form.Text>
              </Form.Group>
              <Form.Group controlId="driverImage">
                <Form.Label>Driver Image (optional)</Form.Label>
                <Form.Control type="file" onChange={handlePicFileChange} />
                <Form.Text className="text-muted">
                  Upload an image if needed.
                </Form.Text>
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
        <Modal show={showEditModal} onHide={handleCloseEditModal} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Edit Drivers</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Drivers Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Drivers Name"
                  value={newDriver.full_name}
                  onChange={(e) =>
                    setNewDriver({
                      ...newDriver,
                      full_name: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Address"
                  value={newDriver.address}
                  onChange={(e) =>
                    setNewDriver({
                      ...newDriver,
                      address: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Contact No</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Contact No"
                  value={newDriver.phone_no}
                  onChange={(e) =>
                    setNewDriver({
                      ...newDriver,
                      phone_no: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  value={newDriver.email}
                  onChange={(e) =>
                    setNewDriver({
                      ...newDriver,
                      email: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="driverImage">
                <Form.Label>Driver Image (optional)</Form.Label>
                <Form.Control type="file" onChange={handlePicFileChange} />
                <Form.Text className="text-muted">
                  Upload an image if needed.
                </Form.Text>
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
      </section>
    </StyleSheetManager>
  );
};

export default Drivers;

import React, { useState, useEffect } from "react";
import { Form, Badge } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
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
import CustomModal from "../components/utils/CustomModal";
import GenericDataTable from "../components/common/reuseable/GenericDataTable";
import TextInput from "../components/common/input/TextInput";
import FileInput from "../components/common/input/FileInput";
import LazyLoad from "react-lazyload";

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
    // {
    //   name: "Image",
    //   cell: (row) => (
    //     <div>
    //       {row.image ? (
            
    //         <img
    //           src={row.image}
    //           alt={row.full_name}
    //           style={{ width: "50px", height: "50px" }}
    //         />
    //       ) : (
    //         <span>{row.full_name}</span>
    //       )}
    //     </div>
    //   ),
    //   sortable: false,
    // },
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
        <GenericDataTable
          title="Drivers"
          icon={<CiDeliveryTruck size={"2rem"} className="me-2" />}
          data={driversList.filter(
            (driver) =>
              driver.full_name &&
              driver.full_name.toLowerCase().includes(searchText.toLowerCase())
          )}
          columns={columns}
          handleShowAddModal={handleShowAddModal}
          searchText={searchText}
          onSearchChange={setSearchText}
        />
        <CustomModal
          show={showAddModal}
          handleClose={handleCloseAddModal}
          handleAction={handleAdd}
          title="Add Drivers"
          formContent={
            <Form>
              <TextInput
                label="Drivers Name"
                value={newDriver.full_name}
                onChange={(e) =>
                  setNewDriver({
                    ...newDriver,
                    full_name: e.target.value,
                  })
                }
                placeholder="Enter Drivers Name"
              />
              <TextInput
                label="Address"
                value={newDriver.address}
                onChange={(e) =>
                  setNewDriver({
                    ...newDriver,
                    address: e.target.value,
                  })
                }
                placeholder="Enter Address"
              />
              <TextInput
                label="Contact No"
                value={newDriver.phone_no || ""}
                onChange={(e) =>
                  setNewDriver({
                    ...newDriver,
                    phone_no: e.target.value,
                  })
                }
                placeholder="Enter Contact No"
              />
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
              <FileInput
                label="Driver Image (optional)"
                onChange={handlePicFileChange}
                secLable="Select Driver Image"
              />
            </Form>
          }
          actionButtonText="Save"
        />
        <CustomModal
          show={showEditModal}
          handleClose={handleCloseEditModal}
          handleAction={handleUpdate}
          title="Edit Drivers"
          formContent={
            <Form>
              <TextInput
                label="Drivers Name"
                value={newDriver.full_name}
                onChange={(e) =>
                  setNewDriver({
                    ...newDriver,
                    full_name: e.target.value,
                  })
                }
                placeholder="Enter Drivers Name"
              />
              <TextInput
                label="Address"
                value={newDriver.address}
                onChange={(e) =>
                  setNewDriver({
                    ...newDriver,
                    address: e.target.value,
                  })
                }
                placeholder="Enter Address"
              />
              <TextInput
                label="Contact No"
                value={newDriver.address}
                onChange={(e) =>
                  setNewDriver({
                    ...newDriver,
                    phone_no: e.target.value,
                  })
                }
                placeholder="Enter Contact No"
              />
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
              <Form.Group className="my-4">
                {newDriver.image && (
                   <LazyLoad height={200} offset={100}>
                  <img
                    src={newDriver.image}
                    alt="item"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      marginBottom: "10px",
                    }}
                  />
                  </LazyLoad>
                )}
                <div className="custom-file mx-2 ">
                  <Form.Control
                    type="file"
                    onChange={handlePicFileChange}
                    className="custom-file-input"
                  />
                  <Form.Label className="custom-file-label">
                    Change Driver Image
                  </Form.Label>
                </div>
              </Form.Group>
            </Form>
          }
          actionButtonText="Save"
        />
      </section>
    </StyleSheetManager>
  );
};

export default Drivers;

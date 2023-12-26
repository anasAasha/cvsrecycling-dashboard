import React, { useState, useEffect } from "react";
import { Form, Badge, Dropdown } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import config from "../config";
import {
  getAllMechanics,
  createMechanic,
  updateMechanic,
  deleteMechanic,
} from "../redux/actions/mechanicActions";
import { GiMechanicGarage } from "react-icons/gi";
import { Link } from "react-router-dom";
import { StyleSheetManager } from "styled-components";
import CustomModal from "../components/utils/CustomModal";
import GenericDataTable from "../components/common/reuseable/GenericDataTable";
import LazyLoad from "react-lazyload";

const Mechanics = () => {
  const apiUrl = config.apiUrl;
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedPicFile, setEditedPicFile] = useState(null);
  const [forceUpdate, setForceUpdate] = useState(false);
  const [selectedCountryCode, setSelectedCountryCode] = useState("+1");
  const [newMechanic, setNewMechanic] = useState({
    full_name: "",
    shop_name: "",
    email: "",
    phone_no: "",
    shop_address: "",
    image: "",
    password: "",
  });
  const [validation, setValidation] = useState({
    full_name: true,
    email: true,
    phone_no: true,
    password: true,
  });
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  const mechanicsList = useSelector((state) => state.mechanic.mechanics);
  useEffect(() => {
    dispatch(getAllMechanics());
  }, [dispatch, forceUpdate]);
  const handleEdit = (mechanic) => {
    setNewMechanic({
      full_name: mechanic.full_name,
      shop_name: mechanic.shop_name,
      shop_address: mechanic.shop_address,
      email: mechanic.email,
      phone_no: mechanic.phone,
      image: mechanic.image,
      password: mechanic.password,
      id: mechanic.id,
    });
    setShowEditModal(true);
  };
  const handleAdd = () => {
    if (validateForm()) {
      const formattedPhoneNo = `${selectedCountryCode}${newMechanic.phone_no}`;
      const generatedEmail = `${newMechanic.full_name
        .replace(/\s+/g, "")
        .toLowerCase()}@defaultemail.com`;
      const isNameExist = mechanicsList.some(
        (mechanic) =>
          mechanic.full_name.toLowerCase() ===
          newMechanic.full_name.toLowerCase()
      );
      const isPhoneExist = mechanicsList.some(
        (mechanic) => mechanic.phone === formattedPhoneNo
      );

      if (isNameExist) {
        alert("Mechanic name already exists. Please choose a different name.");
        return;
      }

      if (isPhoneExist) {
        alert(
          "Mechanic phone number already exists. Please choose a different number."
        );
        return;
      }
      const updatedMechanic = {
        ...newMechanic,
        email: generatedEmail,
        password: "00000",
      };
      const formData = new FormData();
      formData.append("image", editedPicFile);
      dispatch(
        createMechanic(
          { ...updatedMechanic, phone_no: formattedPhoneNo },
          formData
        )
      )
        .then(() => {
          dispatch(getAllMechanics());
          resetForm();
        })
        .catch((error) => {
          console.error("Error creating mechanic:", error);
        });
      resetForm();
      handleCloseAddModal();
    }
  };

  const handleUpdate = () => {
    const formattedPhoneNo = `${newMechanic.phone_no}`;
    const formData = new FormData();
    formData.append("image", editedPicFile);
    dispatch(
      updateMechanic(newMechanic.id, {
        ...newMechanic,
        phone_no: formattedPhoneNo,
      }),
      formData
    )
      .then(() => {
        dispatch(getAllMechanics());
        resetForm();
      })
      .catch((error) => {
        console.error("Error updating mechanic:", error);
      });
    resetForm();
    handleCloseEditModal();
  };

  const handleShowAddModal = () => {
    setShowAddModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
    setForceUpdate((prev) => !prev);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const handleDelete = async (mechanic) => {
    try {
      const shouldDelete = window.confirm(
        `Are you sure you want to delete ${mechanic.full_name}?`
      );

      if (shouldDelete) {
        await dispatch(deleteMechanic(mechanic.id));
        await dispatch(getAllMechanics());
      } else {
        console.log("Deletion canceled by user");
      }
    } catch (error) {
      console.error("Error deleting mechanic:", error);
    }
  };

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Mechanic Name",
      cell: (row) => <Link to={`/mechanics/${row.id}`}>{row.full_name}</Link>,
      sortable: true,
    },
    {
      name: "Address",
      selector: (row) => row.shop_address,
      sortable: true,
    },
    {
      name: "Shop Name",
      selector: (row) => row.shop_name,
      sortable: true,
    },
    {
      name: "Contact No",
      selector: (row) => row.phone,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
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
  const validateForm = () => {
    const newValidation = {
      full_name: newMechanic.full_name?.trim() !== "",
      // email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newMechanic.email),
      phone_no: /^\d{10}$|^\d{3}-\d{3}-\d{4}$/.test(newMechanic.phone_no),
      // password: newMechanic.password?.trim() !== "",
    };

    setValidation(newValidation);

    return Object.values(newValidation).every((isValid) => isValid);
  };

  const resetForm = () => {
    setNewMechanic({
      full_name: "",
      shop_name: "",
      email: "",
      phone_no: "",
      shop_address: "",
      password: "",
      id: null,
    });
    setValidation({
      full_name: false,
      // email: false,
      phone_no: false,
      // password: false,
    });
  };
  const handlePicFileChange = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];

      setNewMechanic((prevMechanic) => ({
        ...prevMechanic,
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
          setNewMechanic((prevMechanic) => ({
            ...prevMechanic,
            image: result.image,
          }));
          setEditedPicFile(result.image);
          console.log(result);
        })
        .catch((error) => console.log("error", error));
    } else {
      setEditedPicFile(null);

      setNewMechanic((prevMechanic) => ({
        ...prevMechanic,
        image: "",
      }));
    }
  };

  return (
    <StyleSheetManager shouldForwardProp={(prop) => prop !== "sortActive"}>
      
      <section className="section">
      
        <GenericDataTable
          title="Mechanics"
          icon={<GiMechanicGarage size={"2rem"} className="me-2" />}
          data={mechanicsList.filter(
            (mechanic) =>
              mechanic.full_name &&
              mechanic.full_name.toLowerCase().includes(searchText.toLowerCase()) &&
              !mechanic.is_deleted  
          )}
          columns={columns}
          handleShowAddModal={handleShowAddModal}
          searchText={searchText}
          onSearchChange={setSearchText}
        />
        <CustomModal
          show={showAddModal}
          handleClose={() => setShowAddModal(false)}
          handleAction={handleAdd}
          title="Add Mechanic"
          formContent={
            <>
              <Form.Group controlId="fullName">
                <Form.Label>Mechanic Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Mechanic Name"
                  value={newMechanic.full_name}
                  onChange={(e) =>
                    setNewMechanic({
                      ...newMechanic,
                      full_name: e.target.value,
                    })
                  }
                  isInvalid={!validation.full_name}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a valid Mechanic Name.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="address">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Address"
                  value={newMechanic.shop_address}
                  onChange={(e) =>
                    setNewMechanic({
                      ...newMechanic,
                      shop_address: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="shopName">
                <Form.Label>Shop Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Shop Name"
                  value={newMechanic.shop_name}
                  onChange={(e) =>
                    setNewMechanic({
                      ...newMechanic,
                      shop_name: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="mechanicImage">
                <Form.Label>
                  Mechanic Image <span className="text-muted">(optinal)</span>
                </Form.Label>
                <Form.Control type="file" onChange={handlePicFileChange} />
              </Form.Group>

              <Form.Group controlId="phoneNo">
                <Form.Label>Contact No</Form.Label>
                <div className="input-group">
                  <Dropdown onSelect={(value) => setSelectedCountryCode(value)}>
                    <Dropdown.Toggle
                      variant="outline-secondary"
                      id="countryCodeDropdown"
                    >
                      {selectedCountryCode}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item eventKey="+1">+1 (USA)</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  <Form.Control
                    type="text"
                    placeholder="Enter Contact No"
                    value={newMechanic.phone_no}
                    onChange={(e) =>
                      setNewMechanic({
                        ...newMechanic,
                        phone_no: e.target.value,
                      })
                    }
                    isInvalid={!validation.phone_no}
                  />
                </div>
              </Form.Group>
              {/* <Form.Group controlId="email">
                <Form.Label>
                  Email <span className="text-muted">(optinal)</span>
                </Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  value={newMechanic.email}
                  onChange={(e) =>
                    setNewMechanic({
                      ...newMechanic,
                      email: e.target.value,
                    })
                  }
                />
              </Form.Group> */}
              {/* <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <div className="input-group">
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    value={newMechanic.password}
                    onChange={(e) =>
                      setNewMechanic({
                        ...newMechanic,
                        password: e.target.value,
                      })
                    }
                    isInvalid={!validation.password}
                  />
                  <Button
                    variant="outline-secondary"
                    onClick={handleTogglePassword}
                  >
                    {showPassword ? <FaRegEye /> : <FaEyeSlash />}
                  </Button>
                  <Form.Control.Feedback type="invalid">
                    Please enter a valid Password.
                  </Form.Control.Feedback>
                </div>
              </Form.Group> */}
            </>
          }
          actionButtonText="Save"
        />
        <CustomModal
          show={showEditModal}
          handleClose={() => setShowEditModal(false)}
          handleAction={handleUpdate}
          title="Edit Mechanic"
          formContent={
            <>
              <Form>
                {" "}
                <Form.Group controlId="fullName">
                  <Form.Label>Mechanic Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Mechanic Name"
                    value={newMechanic.full_name}
                    required
                    onChange={(e) =>
                      setNewMechanic({
                        ...newMechanic,
                        full_name: e.target.value,
                      })
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter a valid Mechanic Name.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="address">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Address"
                    value={newMechanic.shop_address}
                    onChange={(e) =>
                      setNewMechanic({
                        ...newMechanic,
                        shop_address: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group controlId="shopName">
                  <Form.Label>Shop Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Shop Name"
                    value={newMechanic.shop_name}
                    onChange={(e) =>
                      setNewMechanic({
                        ...newMechanic,
                        shop_name: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group controlId="mechanicImage" className="my-4">
                  {newMechanic.image && (
                     <LazyLoad height={200} offset={100}>
                    <img
                      src={newMechanic.image}
                      alt="Mechanic"
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                        marginBottom: "10px",
                      }}
                    />
                    </LazyLoad>
                  )}
                  <div className="custom-file mx-3">
                    <Form.Control
                      type="file"
                      onChange={handlePicFileChange}
                      className="custom-file-input"
                    />
                    <Form.Label className="custom-file-label">
                      Change Mechanic Image
                    </Form.Label>
                  </div>
                </Form.Group>
                <Form.Group controlId="phoneNo">
                  <Form.Label>Contact No</Form.Label>
                  <div className="input-group">
                    <Form.Control
                      type="text"
                      placeholder="Enter Contact No"
                      value={newMechanic.phone_no}
                      required
                      onChange={(e) =>
                        setNewMechanic({
                          ...newMechanic,
                          phone_no: e.target.value,
                        })
                      }
                    />
                  </div>
                </Form.Group>
                <Form.Group controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter Email"
                    value={newMechanic.email}
                    required
                    onChange={(e) =>
                      setNewMechanic({
                        ...newMechanic,
                        email: e.target.value,
                      })
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter a valid Email address.
                  </Form.Control.Feedback>
                </Form.Group>
              </Form>
            </>
          }
          actionButtonText="Save Changes"
        />
      </section>
    </StyleSheetManager>
  );
};

export default Mechanics;

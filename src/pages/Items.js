import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import { FaEdit, FaTrash, FaSearch, FaImage } from "react-icons/fa";
import { TbSettingsStar } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllItems,
  addItem,
  updateItem,
  deleteItem,
  getAllUnits,
} from "../redux/actions/itemActions";
import { StyleSheetManager } from "styled-components";

import config from "../config";
import { Link } from "react-router-dom";

const Items = () => {
  const apiUrl = config.apiUrl;
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [validation, setValidation] = useState({
    itemName: true,
    price: true,
    unitOfWeight: true,
  });
  const [newItem, setNewItem] = useState({
    Item_name: "",
    price: 0,
    image: "",
    unit_id: "",
  });
  const [editedItem, setEditedItem] = useState({
    id: "",
    Item_name: "",
    image: "",
    price: 0,
    unit_id: "",
  });

  const [editedPicFile, setEditedPicFile] = useState("");
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  const items = useSelector((state) => state.item.items);
  const unitsOfWeight = useSelector((state) => state.item.units);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const handleShowImageModal = (image) => {
    setSelectedImage(image);
    setShowImageModal(true);
  };
  const handleCloseImageModal = () => {
    setSelectedImage("");
    setShowImageModal(false);
  };
  useEffect(() => {
    dispatch(getAllItems());
    dispatch(getAllUnits());
  }, [dispatch]);
  const handleShowAddModal = () => {
    setShowAddModal(true);
  };
  const handleCloseAddModal = () => {
    setShowAddModal(false);
    
    setValidation({
      itemName: true,
      price: true,
      unitOfWeight: true,
    });
  };
  const handleShowEditModal = (item) => {
    const unitName = item.unit;
    const unit = unitsOfWeight.find((unit) => unit.unitName === unitName);
    const unitId = unit ? unit.id : null;

    setSelectedItem(item);
    setEditedItem((prevEditedItem) => ({
      ...prevEditedItem,
      id: item.id,
      Item_name: item.name,
      image: item.image,
      price: item.price,
      unit_id: unitId,
      unitName: unitName,
    }));

    setEditedPicFile(null);
    setShowEditModal(true);
  };
  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setValidation({
      itemName: true,
      price: true,
      unitOfWeight: true,
    });
  };
  const handlePicFileChange = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      
      setEditedItem((prevItem) => ({
        ...prevItem,
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
          
          setEditedItem((prevItem) => ({
            ...prevItem,
            image: result.image,
          }));
          setEditedPicFile(result.image);
          console.log(result);
        })
        .catch((error) => console.log("error", error));
    } else {
      setEditedPicFile(null);
      setEditedItem((prevItem) => ({
        ...prevItem,
        image: "",
      }));
    }
  };
  const handleAdd = () => {
    const isValid = validateForm(newItem);

    if (isValid) {
      const newItemWithPic = {
        ...newItem,
        image: editedPicFile ? editedPicFile : "",
      };

      dispatch(addItem(newItemWithPic))
        .then(() => {
          dispatch(getAllItems());
        })
        .catch((error) => {
          console.error("Error adding item:", error);
        });

      setNewItem({
        Item_name: "",
        price: 0,
        image: "",
        unit_id: "",
      });

      handleCloseAddModal();
    }
  };
  const handleUpdate = () => {
    const isValid = validateForm(editedItem);
  
    if (isValid) {
      
  
      const formData = new FormData();
      formData.append("image", editedPicFile);

  
      dispatch(updateItem(editedItem.id, editedItem))
        .then(() => {
          console.log("Item updated successfully");
          dispatch(getAllItems());
        })
        .catch((error) => {
          console.error("Error updating item:", error);
        });
  
      handleCloseEditModal();
    }
  };
  
  const handleDelete = (item) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${item.name}?`
    );

    if (confirmDelete) {
      dispatch(deleteItem(item.id))
        .then(() => {
          dispatch(getAllItems());
        })
        .catch((error) => {
          console.error("Error deleting item:", error);
        });
    }
  };
  const handleSelectUnit = (unit_id) => {
    setNewItem({ ...newItem, unit_id: unit_id });
  };
  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Item Name",
      cell: (row) => <Link to={`/items/${row.id}`}>{row.name}</Link>,
      sortable: true,
    },
    {
      name: "Image",
      cell: (row) => (
        <FaImage
          style={{ color: "#3498DB", cursor: "pointer" }}
          size={25}
          onClick={() => handleShowImageModal(row.image)}
        />
      ),
    },
    {
      name: "Price",
      selector: (row) => row.price,
      sortable: true,
    },
    {
      name: "Unit",
      selector: (row) => row.unit,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div>
          <FaEdit
            className="text-primary"
            onClick={() => handleShowEditModal(row)}
            style={{ cursor: "pointer", marginRight: "8px" }}
          />
          <FaTrash
            className="text-danger"
            onClick={() => handleDelete(row)}
            style={{ cursor: "pointer" }}
          />
        </div>
      ),
    },
  ];

  const validateForm = (item) => {
    const newValidation = {
      itemName: item.Item_name.trim() !== "",
      price: !isNaN(item.price) && item.price > 0,
      unitOfWeight: item.unit_id !== "",
    };

    setValidation(newValidation);

    return Object.values(newValidation).every((isValid) => isValid);
  };

  return (
    <StyleSheetManager shouldForwardProp={(prop) => prop !== "sortActive"}>
    <section className="section">
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">
                <TbSettingsStar size={"2rem"} className="me-2" />
                Items
              </h5>
              <p>Items Of Scrap</p>
              <div >
                <div className="d-flex justify-content-between align-items-center mb-5">
                  <Button variant="primary" onClick={handleShowAddModal}>
                    Add Items
                    <AiOutlinePlus size={"1.2rem"} className="ms-2" />
                  </Button>
                  <div className="d-flex align-items-center">
                    <FaSearch style={{ marginRight: "5px" }} />
                    <Form.Control
                      type="text"
                      placeholder="Search Mechanics"
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                    />
                  </div>
                </div>
                <DataTable
                  columns={columns}
                  data={
                    items &&
                    items.filter(
                      (item) =>
                        item &&
                        item.name &&
                        item.name
                          .toLowerCase()
                          .includes(searchText.toLowerCase())
                    )
                  }
                  pagination
                
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Item Modal */}
      <Modal show={showAddModal} onHide={handleCloseAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Item </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form encType="multipart/form-data">
            <Form.Group>
              <Form.Label>Item Name </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Item Name"
                value={newItem.Item_name}
                onChange={(e) =>
                  setNewItem({ ...newItem, Item_name: e.target.value })
                }
                isInvalid={!validation.itemName}
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid item name.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Default Pic</Form.Label>
              <Form.Control type="file" onChange={handlePicFileChange} />
            </Form.Group>
           
            <Form.Group>
              <Form.Label>Price per Weight</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Price per Weight"
                value={newItem.price}
                onChange={(e) =>
                  setNewItem({ ...newItem, price: e.target.value })
                }
                isInvalid={!validation.price}
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid price.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Unit of Weight</Form.Label>
              <div>
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {newItem.unit_id
                      ? unitsOfWeight.find(
                          (unit) => unit.id === newItem.unit_id
                        ).unitName
                      : "Select Unit of Weight"}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {unitsOfWeight.map((unit) => (
                      <Dropdown.Item
                        key={unit.id}
                        onClick={() => handleSelectUnit(unit.id)}
                      >
                        {unit.unitName}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
                {!validation.unitOfWeight && (
                  <Form.Text className="text-danger">
                    Please select a valid unit of weight.
                  </Form.Text>
                )}
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAdd}>
            Add Item
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Item Modal */}
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Item </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Item Name </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Item Name"
                value={editedItem.Item_name}
                onChange={(e) =>
                  setEditedItem({ ...editedItem, Item_name: e.target.value })
                }
                isInvalid={!validation.itemName}
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid Item Name.
              </Form.Control.Feedback>
            </Form.Group>
           
            <Form.Group  className="my-4">
                {editedItem.image && (
                  <img
                    src={editedItem.image}
                    alt="item"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      marginBottom: "10px",
                    }}
                  />
                )}
                <div className="custom-file mx-2 ">
                  <Form.Control
                    type="file"
                    onChange={handlePicFileChange}
                    className="custom-file-input"
                  />
                  <Form.Label className="custom-file-label">
                    Change item Image
                  </Form.Label>
                </div>
              </Form.Group>


            <Form.Group>
              <Form.Label>Price per Weight</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Price per Weight"
                value={editedItem.price}
                onChange={(e) =>
                  setEditedItem({
                    ...editedItem,
                    price: e.target.value,
                  })
                }
                isInvalid={!validation.price}
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid price.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Unit of Weight</Form.Label>
              <div>
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {editedItem.unit_id
                      ? editedItem.unitName
                      : "Select Unit of Weight"}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {unitsOfWeight.map((unit) => (
                      <Dropdown.Item
                        key={unit.id}
                        onClick={() =>
                          setEditedItem((prevEditedItem) => ({
                            ...prevEditedItem,
                            unit_id: unit.id,
                            unitName: unit.unitName,
                          }))
                        }
                      >
                        {unit.unitName}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
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
      <Modal
        show={showImageModal}
        onHide={handleCloseImageModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Image Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Preview"
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                margin: "auto",
                display: "block",
              }}
            />
          )}
        </Modal.Body>
      </Modal>
    </section>
    </StyleSheetManager>
  );
};

export default Items;
import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { FaEdit, FaTrash, FaImage } from "react-icons/fa";
import { TbSettingsStar } from "react-icons/tb";
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
import NumberInput from "../components/common/input/NumberInput";
import TextInput from "../components/common/input/TextInput";
import FileInput from "../components/common/input/FileInput";
import DropdownSelect from "../components/common/input/DropdownSelect";
import CustomModal from "../components/utils/CustomModal";
import GenericDataTable from "../components/common/reuseable/GenericDataTable";

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
        <GenericDataTable
          title="Items"
          icon={<TbSettingsStar size={"2rem"} className="me-2" />}
          data={items &&
            items.filter(
              (item) =>
                item &&
                item.name &&
                item.name
                  .toLowerCase()
                  .includes(searchText.toLowerCase())
            )}
          columns={columns}
          handleShowAddModal={handleShowAddModal}
          searchText={searchText}
          onSearchChange={setSearchText}
        />

        {/* Add Item Modal */}
        <CustomModal
          show={showAddModal}
          handleClose={handleCloseAddModal}
          handleAction={handleAdd}
          title="Add Item"
          formContent={
            <Form encType="multipart/form-data">
              <TextInput
                label="Item Name"
                value={newItem.Item_name}
                onChange={(e) =>
                  setNewItem({ ...newItem, Item_name: e.target.value })
                }
                placeholder="Enter Item Name"
                isValid={validation.itemName}
                feedback="Please enter a valid item name."
              />

              <FileInput
                label="Defult Pic"
                onChange={handlePicFileChange}
                secLable="Select Item Image"
              />
              <NumberInput
                label="Price per Weight"
                value={newItem.price}
                onChange={(e) =>
                  setNewItem({ ...newItem, price: e.target.value })
                }
                placeholder="Enter Price per Weight"
                isValid={validation.price}
                feedback="Please enter a valid price."
              />
              <DropdownSelect
                label="Unit of Weight"
                options={unitsOfWeight}
                selectedValue={
                  newItem.unit_id
                    ? unitsOfWeight.find((unit) => unit.id === newItem.unit_id)
                        .unitName
                    : ""
                }
                onSelect={handleSelectUnit}
                isValid={validation.unitOfWeight}
                validationText="Please select a valid unit of weight."
              />
            </Form>
          }
          actionButtonText="Add Item"
        />

        <CustomModal
          show={showEditModal}
          handleClose={handleCloseEditModal}
          handleAction={handleUpdate}
          title="Edit Item"
          formContent={
            <Form>
              <TextInput
                label="Item Name"
                value={editedItem.Item_name}
                onChange={(e) =>
                  setEditedItem({ ...editedItem, Item_name: e.target.value })
                }
                placeholder="Enter Item Name"
                isValid={validation.itemName}
                feedback="Please enter a valid item name."
              />

              <Form.Group className="my-4">
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

              <NumberInput
                label="Price per Weight"
                value={editedItem.price}
                onChange={(e) =>
                  setEditedItem({ ...editedItem, price: e.target.value })
                }
                placeholder="Enter Price per Weight"
                isValid={validation.price}
                feedback="Please enter a valid price."
              />

              <DropdownSelect
                label="Unit of Weight"
                options={unitsOfWeight}
                selectedValue={
                  editedItem.unit_id
                    ? unitsOfWeight.find(
                        (unit) => unit.id === editedItem.unit_id
                      ).unitName
                    : ""
                }
                onSelect={(unit_id) =>
                  setEditedItem({ ...editedItem, unit_id })
                }
                isValid={validation.unitOfWeight}
                validationText="Please select a valid unit of weight."
              />
            </Form>
          }
          actionButtonText="Save Changes"
        />

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

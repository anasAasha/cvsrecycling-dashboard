import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { BiDetail, BiGitPullRequest } from "react-icons/bi";
import { FaTrash, FaPlus, FaEdit, FaExchangeAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  Modal,
  Button,
  Form,
  Image,
  Row,
  Col,
  Dropdown,
  Badge,
} from "react-bootstrap";
import { StyleSheetManager } from "styled-components";
import {
  getAllOrders,
  deleteOrder,
  createOrder,
  updateOrder,
} from "../redux/actions/orderAction";

import { addInvoice } from "../redux/actions/invoiceActions";
import { Link } from "react-router-dom";
import { getAllDrivers } from "../redux/actions/driverActions";
import { AiOutlinePlus } from "react-icons/ai";
import { getAllMechanics } from "../redux/actions/mechanicActions";
import { getAllItems } from "../redux/actions/itemActions";
import DropdownSelect from "../components/common/input/DropdownSelect";
import TextInput from "../components/common/input/TextInput";
import DateInput from "../components/common/input/DateInput";
import TimeInput from "../components/common/input/TimeInput";
import TextareaInput from "../components/common/input/TextareaInput";

const Order = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order.orders);
  const drivers = useSelector((state) => state.driver.drivers);
  const mechanics = useSelector((state) => state.mechanic.mechanics);
  const items = useSelector((state) => state.item.items);
  const [forceUpdate, setForceUpdate] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showItemModal, setShowItemModal] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [showAddInvoiceModal, setShowAddInvoiceModal] = useState(false);
  const [selectedDriverId, setSelectedDriverId] = useState("");

  const [invoiceData, setInvoiceData] = useState({
    user_id: "",
    order_id: "",
    driver_id: "",
    cust_no: "",
    item_name: "",
    weight: "",
    price: "",
    time_in: "",
    time_out: "",
    gross: "",
    tar: "",
    net: "",
    total: "",
  });
  const [showAddOrderModal, setShowAddOrderModal] = useState(false);
  const [newOrderData, setNewOrderData] = useState({
    userId: "",
    item_id: "",
    item_Name: "",
    date: "",
    time: "",
    reminder: "",
    note: "",
  });
  const handleShowAddOrderModal = () => {
    setShowAddOrderModal(true);
  };

  const handleCloseAddOrderModal = () => {
    setShowAddOrderModal(false);

    setNewOrderData({
      userId: "",
      item_id: "",
      item_Name: "",
      date: "",
      time: "",
      reminder: "",
      note: "",
    });
  };
  const handleAddOrder = (e) => {
    e.preventDefault();
    dispatch(createOrder(newOrderData));
    setForceUpdate((prev) => !prev);
    handleCloseAddOrderModal();
  };

  useEffect(() => {
    dispatch(getAllOrders());
    dispatch(getAllMechanics());
    dispatch(getAllDrivers());
    dispatch(getAllItems());
  }, [dispatch, forceUpdate]);

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "User",
      cell: (row) => (
        <span
          style={{ cursor: "pointer" }}
          className=" fw-bold text-primary"
          onClick={() => handleUserModal(row)}
        >
          {row.user.fullName}
        </span>
      ),
      sortable: true,
    },
    {
      name: "Item",
      cell: (row) => (
        <span
          style={{ cursor: "pointer" }}
          className=" fw-bold text-primary "
          onClick={() => handleItemModal(row)}
        >
          {row.item.item_name}
        </span>
      ),
      sortable: true,
    },
    {
      name: "Order Date",
      selector: (row) =>
        new Date(row.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }),
      sortable: true,
    },
    {
      name: "Note",
      selector: (row) => row.note,
      sortable: true,
      cell: (row) => (
        <span
          style={{ cursor: "pointer" }}
          className=" fw-bold text-primary"
          onClick={() => handleNoteModal(row)}
        >
          View Note
        </span>
      ),
    },
    {
      name: "Time",
      selector: (row) => row.time,
      sortable: true,
    },
    {
      name: "reminder",
      selector: (row) => row.reminder,
      sortable: true,
    },
    {
      name: "Order Details",
      cell: (row) => (
        <Link to={`/order/${row.id}`}>
          <div
            style={{ cursor: "pointer" }}
            onClick={() => handleAddInvoice(row)}
          >
            <BiDetail
              size={25}
              className="text-success"
              style={{ cursor: "pointer", marginRight: "5px" }}
            />
            Details
          </div>
        </Link>
      ),
      sortable: false,
    },
    {
      name: "Stutas",
      cell: (row) => (
        <div className="d-flex">
          <Badge
            bg={row.status === "Open" ? "success" : "danger"}
            className="me-2"
          >
            {row.status}
          </Badge>
          <FaExchangeAlt
            style={{ cursor: "pointer" }}
            size={15}
            className={row.status === "Open" ? "text-danger" : "text-success"}
          />
        </div>
      ),
      sortable: true,
    },

    {
      name: "Actions",
      cell: (row) => (
        <span className="text-center">
          <FaEdit
            className="text-primary"
            style={{
              cursor: "pointer",
              marginRight: "8px",
            }}
            onClick={() => handleEditOrderModal(row)}
          />
          <FaTrash
            className="text-danger"
            onClick={() => handleDelete(row.id)}
            style={{ cursor: "pointer" }}
          />
        </span>
      ),
      sortable: false,
    },
    {
      name: "Create Invoice",
      cell: (row) => (
        <div
          style={{ cursor: "pointer" }}
          onClick={() => handleAddInvoice(row)}
        >
          <FaPlus
            className="text-success"
            style={{ cursor: "pointer", marginRight: "5px" }}
          />
          Invoice
        </div>
      ),
      sortable: false,
    },
  ];

  const handleNoteModal = (order) => {
    setSelectedOrder(order);
    setShowNoteModal(true);
  };

  const handleDelete = (orderId) => {
    dispatch(deleteOrder(orderId));
    setForceUpdate((prev) => !prev);
  };

  const handleUserModal = (order) => {
    setSelectedOrder(order);
    setShowUserModal(true);
  };

  const handleItemModal = (order) => {
    setSelectedOrder(order);
    setShowItemModal(true);
  };

  const handleAddInvoice = (order) => {
    setSelectedOrder(order);

    const newInvoiceData = {
      user_id: order.user.id,
      order_id: order.id,
      driver_id: selectedDriverId,
      cust_no: "",
      item_name: order.item.item_name,
      weight: "",
      price: 0,
      time_in: order.time.replace(/(am|pm)/i, ""),
      time_out: "",
      gross: 0,
      tar: 0,
      net: 0,
      total: 0,
    };

    setInvoiceData(newInvoiceData);
    setShowAddInvoiceModal(true);
  };

  const handleAddInvoiceSubmit = () => {
    dispatch(addInvoice(invoiceData)).then(() => {
      setShowAddInvoiceModal(false);

      setForceUpdate((prev) => !prev);
    });
  };

  const closeModal = () => {
    setShowUserModal(false);
    setShowItemModal(false);
    setShowAddInvoiceModal(false);
    setShowNoteModal(false);
    setSelectedOrder(null);
    setInvoiceData({
      user_id: "",
      order_id: "",
      cust_no: "",
      item_name: "",
      weight: "",
      price: "",
      time_in: "",
      time_out: "",
      gross: "",
      tar: "",
      net: "",
      total: "",
      driver_id: "",
    });
  };
  const handleDriverSelection = (driver_id) => {
    setSelectedDriverId(driver_id);
    setInvoiceData({
      ...invoiceData,
      driver_id: driver_id,
    });
  };

  const [showEditOrderModal, setShowEditOrderModal] = useState(false);
  const [editOrderData, setEditOrderData] = useState({
    userId: "",
    item_id: "",
    item_Name: "",
    reminder: "",
    time: "",
    date: "",
    note: "",
    status: "",
  });

  const handleEditOrderModal = (order) => {
    setSelectedOrder(order);
    setShowEditOrderModal(true);

    setEditOrderData({
      userId: order.user.id,
      item_id: order.item.id,
      item_Name: order.item_Name,
      reminder: order.reminder,
      time: order.time,
      date: order.date,
      note: order.note,
      status: order.status,
    });
  };

  const handleCloseEditOrderModal = () => {
    setShowEditOrderModal(false);
    setEditOrderData({
      userId: "",
      item_id: "",
      item_Name: "",
      reminder: "",
      time: "",
      note: "",
      status: "",
    });
  };

  const handleEditOrderSubmit = () => {
    const updatedOrderData = {
      userId: editOrderData.userId,
      item_id: editOrderData.item_id,
      item_Name: editOrderData.item_Name,
      reminder: editOrderData.reminder,
      time: editOrderData.time,
      date: editOrderData.date,
      note: editOrderData.note,
      status: editOrderData.status,
    };

    dispatch(updateOrder(selectedOrder.id, updatedOrderData)).then(() => {
      handleCloseEditOrderModal();

      setForceUpdate((prev) => !prev);
    });
  };

  return (
    <StyleSheetManager shouldForwardProp={(prop) => prop !== "sortActive"}>
      {" "}
      <section className="section">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">
                  <BiGitPullRequest size={"2rem"} className="me-2" />
                  Orders
                </h5>
                <div className="datatable-wrapper datatable-loading no-footer sortable searchable fixed-columns">
                  <div className="d-flex justify-content-between align-items-center mb-5">
                    <Button variant="primary" onClick={handleShowAddOrderModal}>
                      Add Order
                      <AiOutlinePlus size={"1.2rem"} className="ms-2" />
                    </Button>
                  </div>
                  <DataTable columns={columns} data={orders} pagination />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* User Modal */}
        <Modal show={showUserModal} onHide={closeModal} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>User Information</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedOrder && (
              <>
                <p>
                  <span className="btn fw-bold text-dark">Full Name: </span>{" "}
                  {selectedOrder.user.fullName}
                </p>
                <p>
                  <span className="btn fw-bold text-dark">Email:</span>{" "}
                  {selectedOrder.user.email}
                </p>
                <p>
                  <span className="btn fw-bold text-dark">Phone Number:</span>{" "}
                  {selectedOrder.user.phoneNo}
                </p>
                <p>
                  <span className="btn fw-bold text-dark"> Mobile Number:</span>{" "}
                  {selectedOrder.user.mobileNo}
                </p>
                <p>
                  <span className="btn fw-bold text-dark">Shop Name:</span>{" "}
                  {selectedOrder.user.shopName}
                </p>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={showItemModal} onHide={closeModal} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Item Information</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedOrder && (
              <>
                <p>
                  <span className="btn fw-bold text-dark">item Name: </span>{" "}
                  {selectedOrder.item.item_name}
                </p>
                <p>
                  <span className="btn fw-bold text-dark">price:</span>{" "}
                  {selectedOrder.item.price}
                </p>
                <p>
                  <span className="btn fw-bold text-dark">Image:</span>{" "}
                  <Image src={selectedOrder.item.image} thumbnail />
                </p>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showAddInvoiceModal} onHide={closeModal} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Add Invoice</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <TextInput
                label="Cust No"
                value={invoiceData.cust_no}
                onChange={(e) =>
                  setInvoiceData({ ...invoiceData, cust_no: e.target.value })
                }
                placeholder="Enter Cust No"
              />
              <TimeInput
                label="Time Out"
                value={invoiceData.time_out}
                onChange={(e) =>
                  setInvoiceData({
                    ...invoiceData,
                    time_out: e.target.value.toString(),
                  })
                }
                placeholder="Enter Time out"
              />
              <Form.Group controlId="formDriver">
                <Form.Label>Driver</Form.Label>
                <Dropdown>
                  <Dropdown.Toggle variant="primary" id="dropdown-driver">
                    {selectedDriverId
                      ? drivers.find((driver) => driver.id === selectedDriverId)
                          ?.full_name || "Select Driver"
                      : "Select Driver"}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setSelectedDriverId("")}>
                      Select Driver
                    </Dropdown.Item>
                    {drivers.map((driver) => (
                      <Dropdown.Item
                        key={driver.id}
                        onClick={() => handleDriverSelection(driver.id)}
                      >
                        {driver.full_name}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Form.Group>
              <Row>
                <Col lg={6}>
                  <TextInput
                    label="Weight"
                    value={invoiceData.weight}
                    onChange={(e) =>
                      setInvoiceData({
                        ...invoiceData,
                        weight: e.target.value,
                      })
                    }
                    placeholder="Enter Weight"
                  />
                </Col>
                <Col lg={6}>
                  <Form.Group controlId="formPrice">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter Price"
                      value={invoiceData.price}
                      onChange={(e) =>
                        setInvoiceData({
                          ...invoiceData,
                          price: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col lg={4}>
                  <TextInput
                    label="Gross"
                    value={invoiceData.gross}
                    onChange={(e) =>
                      setInvoiceData({
                        ...invoiceData,
                        gross: e.target.value,
                      })
                    }
                    placeholder="Enter Gross"
                  />
                </Col>
                <Col lg={4}>
                  <TextInput
                    label="Tare"
                    value={invoiceData.tar}
                    onChange={(e) =>
                      setInvoiceData({ ...invoiceData, tar: e.target.value })
                    }
                    placeholder="Enter Tare"
                  />
                </Col>
                <Col lg={4}>
                  <TextInput
                    label="Net"
                    value={invoiceData.net}
                    onChange={(e) =>
                      setInvoiceData({ ...invoiceData, net: e.target.value })
                    }
                    placeholder="Enter Net"
                  />
                </Col>
              </Row>
              <TextInput
                label="Total"
                value={invoiceData.total}
                onChange={(e) =>
                  setInvoiceData({ ...invoiceData, total: e.target.value })
                }
                placeholder="Enter Total"
              />
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Close
            </Button>
            <Button variant="primary" onClick={handleAddInvoiceSubmit}>
              Add Invoice
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showNoteModal} onHide={closeModal} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Note Detail</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedOrder && (
              <p>
                <span className="btn fw-bold text-dark">Note:</span>{" "}
                {selectedOrder.note}
              </p>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal
          show={showAddOrderModal}
          onHide={handleCloseAddOrderModal}
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Order</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <DropdownSelect
                label="Customer"
                options={mechanics
                  .filter((mechanic) => !mechanic.is_deleted)
                  .map((mechanic) => ({
                    id: mechanic.id,
                    unitName: mechanic.full_name,
                  }))}
                selectedValue={
                  newOrderData.userId
                    ? mechanics.find(
                        (mechanic) => mechanic.id === newOrderData.userId
                      )?.full_name || "Select Customer"
                    : "Select Customer"
                }
                onSelect={(selectedUserId) =>
                  setNewOrderData({ ...newOrderData, userId: selectedUserId })
                }
              />
              <DropdownSelect
                label="Item"
                options={items.map((item) => ({
                  id: item.id,
                  unitName: item.name,
                }))}
                selectedValue={
                  newOrderData.item_id
                    ? items.find((item) => item.id === newOrderData.item_id)
                        ?.name || "Select Item"
                    : "Select Item"
                }
                onSelect={(selectedItemId) =>
                  setNewOrderData({ ...newOrderData, item_id: selectedItemId })
                }
              />
              <TextInput
                label="Item Name"
                value={newOrderData.item_Name}
                onChange={(e) =>
                  setNewOrderData({
                    ...newOrderData,
                    item_Name: e.target.value,
                  })
                }
                placeholder="Enter Item Name"
              />
              <DateInput
                label="Date"
                value={newOrderData.date}
                placeholder="Enter Date"
                onChange={(e) =>
                  setNewOrderData({ ...newOrderData, date: e.target.value })
                }
              />
              <TimeInput
                label="Time"
                value={newOrderData.time}
                onChange={(e) =>
                  setNewOrderData({ ...newOrderData, time: e.target.value })
                }
                placeholder="Enter Time"
              />
              <TextareaInput
                label="Note"
                value={newOrderData.note}
                onChange={(e) =>
                  setNewOrderData({ ...newOrderData, note: e.target.value })
                }
                placeholder="Enter Note"
              />
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseAddOrderModal}>
              Close
            </Button>
            <Button variant="primary" onClick={handleAddOrder}>
              Add Order
            </Button>
          </Modal.Footer>
        </Modal>
        {/* edit Modal*/}
        <Modal
          show={showEditOrderModal}
          onHide={handleCloseEditOrderModal}
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Order</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <DateInput
                label="Reminder"
                value={editOrderData.reminder}
                placeholder="Enter Reminder"
                onChange={(e) =>
                  setEditOrderData({
                    ...editOrderData,
                    reminder: e.target.value,
                  })
                }
              />
              <TimeInput
                label="Time"
                value={editOrderData.time}
                onChange={(e) =>
                  setEditOrderData({ ...editOrderData, time: e.target.value })
                }
                placeholder="Enter Time"
              />
              <TextareaInput
                label="Note"
                value={editOrderData.note}
                onChange={(e) =>
                  setEditOrderData({ ...editOrderData, note: e.target.value })
                }
                placeholder="Enter Note"
              />
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseEditOrderModal}>
              Close
            </Button>
            <Button variant="primary" onClick={handleEditOrderSubmit}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </section>
    </StyleSheetManager>
  );
};

export default Order;

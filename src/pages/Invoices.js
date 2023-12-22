import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { StyleSheetManager } from "styled-components";
import { getAllInvoices } from "../redux/actions/invoiceActions";

const Invoices = () => {
  const dispatch = useDispatch();

  const invoices = useSelector((state) => state.invoice.invoices);

  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);
  console.log(invoices);
  useEffect(() => {
    dispatch(getAllInvoices());
  }, [dispatch]);

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "User",
      cell: (row) => (
        <Link
          className="fw-bold text-primary"
          to=""
          onClick={() => handleUserModal(row)}
        >
          user Info
        </Link>
      ),
      sortable: true,
    },
    {
      name: "Cust No",
      selector: (row) => row.cust_no,
      sortable: true,
    },
    {
      name: "Item Name",
      selector: (row) => row.item_name,
      sortable: true,
    },
    {
      name: "Weight",
      selector: (row) => row.weight,
      sortable: true,
    },
    {
      name: "Price",
      selector: (row) => row.price,
      sortable: true,
    },
    {
      name: "Time In",
      selector: (row) => row.time_in,
      sortable: true,
    },
    {
      name: "Time Out",
      selector: (row) => row.time_out,
      sortable: true,
    },
    // {
    //   name: "Print ",
    //   cell: (row) => (
    //     <FaPrint
    //       className="text-success"
    //       size={25}
    //       style={{ cursor: "pointer" }}

    //     />
    //   ),
    //   sortable: true,
    // },
    {
      name: "Actions",
      cell: (row) => (
        <Link to={`/invoices/${row.id}`} className="text-success">
          Invoice Detail
        </Link>
      ),
      sortable: false,
    },
  ];

  const handleUserModal = (invoice) => {
    setSelectedInvoice(invoice);
    setShowUserModal(true);
  };

  const closeModal = () => {
    setShowUserModal(false);
    setSelectedInvoice(null);
  };

  return (
    <StyleSheetManager shouldForwardProp={(prop) => prop !== "sortActive"}>
      {" "}
      <section className="section">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Invoices</h5>
                <div className="datatable-wrapper datatable-loading no-footer sortable searchable fixed-columns">
                  <DataTable columns={columns} data={invoices} pagination />
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
            {/* Display user information here */}
            {selectedInvoice && (
              <>
                <p>
                  <span className="btn fw-bold text-dark">ID:</span>{" "}
                  {selectedInvoice.user.id}
                </p>
                <p>
                  <span className="btn fw-bold text-dark">Email:</span>{" "}
                  {selectedInvoice.user.email}
                </p>
                <p>
                  <span className="btn fw-bold text-dark">Phone Number:</span>{" "}
                  {selectedInvoice.user.phoneNo}
                </p>
                <p>
                  <span className="btn fw-bold text-dark">Full Name: </span>{" "}
                  {selectedInvoice.user.full_name}
                </p>
                <p>
                  <span className="btn fw-bold text-dark">Mobile Number:</span>{" "}
                  {selectedInvoice.user.mobileNo}
                </p>
                <p>
                  <span className="btn fw-bold text-dark">Shop Name:</span>{" "}
                  {selectedInvoice.user.shopName}
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
      </section>
    </StyleSheetManager>
  );
};

export default Invoices;

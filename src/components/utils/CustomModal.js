import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

const CustomModal = ({
  show,
  handleClose,
  handleAction,
  title,
  formContent,
  actionButtonText,
}) => {
  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>{formContent}</Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleAction}>
          {actionButtonText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;

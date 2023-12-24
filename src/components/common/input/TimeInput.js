// TimeInput.js
import React from "react";
import { Form } from "react-bootstrap";

const TimeInput = ({ label, value, onChange, isValid, validationText }) => {
  return (
    <Form.Group controlId={`form${label}`}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type="time"
        placeholder={`Enter ${label}`}
        value={value}
        onChange={onChange}  // Add a null check here
        isInvalid={!isValid && isValid !== undefined}
      />
      {isValid !== undefined && (
        <Form.Text className={isValid ? "text-success" : "text-danger"}>
          {isValid ? isValid : validationText || "Please choose a valid time."}
        </Form.Text>
      )}
    </Form.Group>
  );
};

export default TimeInput;

// DateInput.js
import React from "react";
import { Form } from "react-bootstrap";

const DateInput = ({ label, value, onChange, isValid, validationText }) => {
  return (
    <Form.Group controlId={`form${label}`}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type="date"
        placeholder={`Enter ${label}`}
        value={value}
        onChange={onChange}
        isInvalid={!isValid && isValid !== undefined}
      />
      {isValid !== undefined && (
        <Form.Text className={isValid ? "text-success" : "text-danger"}>
          {isValid ? isValid : validationText || "Please choose a valid date."}
        </Form.Text>
      )}
    </Form.Group>
  );
};

export default DateInput;

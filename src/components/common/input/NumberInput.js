import React from "react";
import Form from "react-bootstrap/Form";

const NumberInput = ({ label, value, onChange, placeholder, isValid, feedback }) => {
  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type="number"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        isInvalid={!isValid}
      />
      {isValid || (
        <Form.Control.Feedback type="invalid">{feedback}</Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

export default NumberInput;

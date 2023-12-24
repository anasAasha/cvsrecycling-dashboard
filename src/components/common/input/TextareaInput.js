// TextareaInput.js
import React from "react";
import Form from "react-bootstrap/Form";

const TextareaInput = ({ label, value, onChange, placeholder, isValid, feedback }) => {
  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        as="textarea"
        rows={3}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        isInvalid={!isValid && isValid !== undefined}
      />

      {isValid !== undefined && (
        <Form.Text className={isValid ? "text-success" : "text-danger"}>
          {isValid ? isValid : "Please enter a valid note."}
        </Form.Text>
      )}
    </Form.Group>
  );
};

export default TextareaInput;

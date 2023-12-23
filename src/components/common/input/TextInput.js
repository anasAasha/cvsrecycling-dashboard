// TextInput.js
import React from "react";
import Form from "react-bootstrap/Form";

const TextInput = ({ label, value, onChange, placeholder, isValid, feedback }) => {
  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        isInvalid={!isValid && isValid !== undefined} 
      />
      
      {isValid !== undefined && (
        <Form.Text className={isValid ? "text-success" : "text-danger"}>
          {isValid ? isValid : "Please choose a valid text."}
        </Form.Text>
      )}
    </Form.Group>
  );
};

export default TextInput;

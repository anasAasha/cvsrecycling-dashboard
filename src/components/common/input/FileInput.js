// FileInput.js
import React from "react";
import Form from "react-bootstrap/Form";

const FileInput = ({ label, onChange, isValid, secLable }) => {
  return (
    <Form.Group className="my-4">
      <Form.Label>{label}</Form.Label>
      <div className="custom-file mx-3">
        <Form.Control
          type="file"
          onChange={onChange}
          className="custom-file-input"
        />
        <Form.Label className="custom-file-label">
          {secLable !== "" ? secLable : "Choose file"}
        </Form.Label>
      </div>
      {isValid !== undefined && (
        <Form.Text className={isValid ? "text-success" : "text-danger"}>
          {isValid ? "File is valid." : "Please choose a valid file."}
        </Form.Text>
      )}
    </Form.Group>
  );
};

export default FileInput;

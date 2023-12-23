// DropdownSelect.js

import React from "react";
import { Dropdown, Form } from "react-bootstrap";

const DropdownSelect = ({
  label,
  options,
  selectedValue,
  onSelect,
  isValid,
  validationText,
}) => {
  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <div>
        <Dropdown>
          <Dropdown.Toggle variant="success" id={`dropdown-${label}`}>
            {selectedValue ? selectedValue : `Select ${label}`}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {options.map((option) => (
              <Dropdown.Item
                key={option.id}
                onClick={() => onSelect(option.id)}
              >
                {option.unitName}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        {!isValid && <Form.Text className="text-danger">{validationText}</Form.Text>}
      </div>
    </Form.Group>
  );
};

export default DropdownSelect;

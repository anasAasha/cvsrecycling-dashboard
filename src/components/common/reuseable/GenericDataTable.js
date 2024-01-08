import React from "react";
import { Button, Form } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import DataTable from "react-data-table-component";
import { AiOutlinePlus } from "react-icons/ai";

const GenericDataTable = ({
  title,
  icon,
  data,
  columns,
  handleShowAddModal,
  searchText,
  onSearchChange,
}) => {
  // Modify the columns prop to make all columns resizable
  const resizableColumns = columns.map((column) => ({
    ...column,
    grow: 1, // Allow the column to grow when resized
    minWidth: 100, // Set a minimum width for the column
  }));

  return (
    <div className="row">
      <div className="col-lg-12">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">
              {icon}
              {title}
            </h5>
            <div>
              <div className="d-flex justify-content-between align-items-center mb-5">
                <Button variant="primary" onClick={handleShowAddModal}>
                  Add {title}
                  <AiOutlinePlus size={"1.2rem"} className="ms-2" />
                </Button>
                <div className="d-flex align-items-center">
                  <FaSearch style={{ marginRight: "5px" }} />
                  <Form.Control
                    type="text"
                    placeholder={`Search ${title}`}
                    value={searchText}
                    onChange={(e) => onSearchChange(e.target.value)}
                  />
                </div>
              </div>
              <DataTable resizableColumns={true} columns={resizableColumns} data={data} pagination />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenericDataTable;

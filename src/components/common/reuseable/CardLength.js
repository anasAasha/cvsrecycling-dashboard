import React from "react";
import { Card } from "react-bootstrap";

const CardLength = ({ title, icon: IconComponent, data, label }) => {
  return (
    <Card>
      <Card.Body>
        <h5 className="card-title">
          {title} <span></span>
        </h5>

        <div className="d-flex align-items-center">
          <div className="card-icon rounded-circle d-flex align-items-center justify-content-center ">
            {IconComponent && <IconComponent size={"2em"} />}
          </div>
          <div className="ps-3">
            <span className="text-success small pt-1 fw-bold">{data.length}</span>{" "}
            <span className="text-muted small pt-2 ps-1">{label}</span>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CardLength;

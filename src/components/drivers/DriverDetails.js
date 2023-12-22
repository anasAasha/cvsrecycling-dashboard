import React, { useEffect, useState } from "react";
import { Col, Form, Row, Tab, Tabs } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllDrivers,
  updateDriver,
} from "../../redux/actions/driverActions"; 

const DriverDetails = () => {
  const { id } = useParams();
  const driverId = Number(id);
  const dispatch = useDispatch();
  const driversList = useSelector((state) => state.driver.drivers); 
  const [tabKey, setTabKey] = useState("one");
  const [updatedDriver, setUpdatedDriver] = useState({
    full_name: "",
    address: "",
    email: "",
    phone_no: "",
  });

  const driver = driversList.find((driver) => driver.id === driverId);

  useEffect(() => {
    if (driver) {
      setUpdatedDriver({
        full_name: driver.full_name,
        address: driver.address,
        email: driver.email,
        phone_no: driver.phone,
      });
    }
  }, [driver]);

  useEffect(() => {
    if (driversList.length === 0) {
      dispatch(getAllDrivers());
    }
  }, [dispatch, driversList]);

  if (!driver) {
    return <div>Driver not found.</div>;
  }


  const handleUpdate = () => {
    dispatch(updateDriver(id, updatedDriver))
      .then(() => {
      dispatch(getAllDrivers());
        
      })
      .catch((error) => {
        console.error("Error updating driver:", error);
      });
  };


  return (
    <section>
      <div className="dash_sec">
        <div className="dash_sec__wrapper">
          <div className="head_sec">
            <h2 className="dash_sec__title">Driver Details</h2>
          </div>
          <Row>
            <Col xl="4">
              <div className="card">
                <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">
                  {driver.image ? (
                    <img
                      src={driver.image}
                      alt="driver"
                      style={{ width: "360px" }}
                      
                    />
                  ) : (
                    <div
                      style={{
                        width: "360px",
                        height: "240px",
                        background: "#ccc",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: "10px",
                      }}
                    >
                      <span>No image available</span>
                    </div>
                  )}
                  <h2 className="fw-bold text-dark">{driver.full_name}</h2>
                </div>
              </div>
            </Col>
            <Col xl="8">
              <div className="card">
                <div className="card-body pt-3">
                  <Tabs activeKey={tabKey} onSelect={setTabKey}>
                    <Tab eventKey="one" title="Overview">
                      <div className="tab-pane my-3" id="driver-overview">
                        <h5 className="card-title my-2">Driver Overview</h5>
                        <div className="row mb-2">
                          <div className="col-lg-3 col-md-4 fw-bold text-dark">
                            Full Name
                          </div>
                          <div className="col-lg-9 col-md-8">
                            {driver.full_name}
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-lg-3 col-md-4 fw-bold text-dark">
                            Address
                          </div>
                          <div className="col-lg-9 col-md-8">
                            {driver.address}
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-lg-3 col-md-4 fw-bold text-dark">
                            Email
                          </div>
                          <div className="col-lg-9 col-md-8">
                            {driver.email}
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-lg-3 col-md-4 fw-bold text-dark">
                            Phone
                          </div>
                          <div className="col-lg-9 col-md-8">
                            {driver.phone}
                          </div>
                        </div>
                        
                      </div>
                    </Tab>
                    <Tab eventKey="two" title="Edit Profile">
                      <div className="tab-pane profile-edit pt-3" id="profile-edit">
                        <Form>
                          <Form.Group className="row mb-3">
                            <Form.Label className="col-md-4 col-lg-3">Full Name</Form.Label>
                            <div className="col-md-8 col-lg-9">
                              <Form.Control
                                name="full_name"
                                type="text"
                                value={updatedDriver.full_name}
                                onChange={(e) =>
                                  setUpdatedDriver({
                                    ...updatedDriver,
                                    full_name: e.target.value,
                                  })
                                }
                              />
                            </div>
                          </Form.Group>
                          <Form.Group className="row mb-3">
                            <Form.Label className="col-md-4 col-lg-3">Address</Form.Label>
                            <div className="col-md-8 col-lg-9">
                              <Form.Control
                                name="address"
                                type="text"
                                value={updatedDriver.address}
                                onChange={(e) =>
                                  setUpdatedDriver({
                                    ...updatedDriver,
                                    address: e.target.value,
                                  })
                                }
                              />
                            </div>
                          </Form.Group>
                          <Form.Group className="row mb-3">
                            <Form.Label className="col-md-4 col-lg-3">Email</Form.Label>
                            <div className="col-md-8 col-lg-9">
                              <Form.Control
                                name="email"
                                type="email"
                                value={updatedDriver.email}
                                onChange={(e) =>
                                  setUpdatedDriver({
                                    ...updatedDriver,
                                    email: e.target.value,
                                  })
                                }
                              />
                            </div>
                          </Form.Group>
                          <Form.Group className="row mb-3">
                            <Form.Label className="col-md-4 col-lg-3">Phone</Form.Label>
                            <div className="col-md-8 col-lg-9">
                              <Form.Control
                                name="phone_no"
                                type="text"
                                value={updatedDriver.phone_no}
                                onChange={(e) =>
                                  setUpdatedDriver({
                                    ...updatedDriver,
                                    phone_no: e.target.value,
                                  })
                                }
                              />
                            </div>
                          </Form.Group>
                       
                          <div className="text-center">
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={handleUpdate}
                            >
                              Save Changes
                            </button>
                          </div>
                        </Form>
                      </div>
                    </Tab>
                  </Tabs>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </section>
  );
};

export default DriverDetails

import React, { useEffect, useState } from "react";
import { Col, Form, Row, Tab, Tabs } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllMechanics,
  updateMechanic,
} from "../../redux/actions/mechanicActions";
import { BiDetail } from "react-icons/bi";
import { getAllOrders } from "../../redux/actions/orderAction";


const MechanicsDetails = () => {
  const { id } = useParams();
  const mechanicId = Number(id);
  const dispatch = useDispatch();
  const mechanicsList = useSelector((state) => state.mechanic.mechanics);
  const orderList = useSelector((state) => state.order.orders);
  const mechanicOrders = orderList.filter(
    (order) => order.user.id === mechanicId
  );

  const [tabKey, setTabKey] = useState("one");
  const [updatedMechanic, setUpdatedMechanic] = useState({
    full_name: "",
    shop_name: "",
    shop_address: "",
    email: "",
    phone_no: "",
  });

  const mechanic = mechanicsList.find((mechanic) => mechanic.id === mechanicId);

  useEffect(() => {
    if (mechanic) {
      setUpdatedMechanic({
        full_name: mechanic.full_name,
        shop_name: mechanic.shop_name,
        shop_address: mechanic.shop_address,
        email: mechanic.email,
        phone_no: mechanic.phone,
      });
    }
  }, [mechanic]);

  useEffect(() => {
    if (mechanicsList.length === 0) {
      dispatch(getAllMechanics());
      dispatch(getAllOrders());
    }
  }, [dispatch, mechanicsList]);

  if (!mechanic) {
    return <div>Mechanic not found.</div>;
  }

  const handleUpdate = () => {
    dispatch(updateMechanic(id, updatedMechanic))
      .then(() => {})
      .catch((error) => {
        console.error("Error updating mechanic:", error);
      });
  };

  return (
    <section>
      <div className="dash_sec">
        <div className="dash_sec__wrapper">
          <div className="head_sec">
            <h2 className="dash_sec__title">Mechanics Details</h2>
          </div>
          <Row>
            <Col xl="4">
              <div className="card">
                <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">
                  {mechanic.image ? (
                    
                    <img
                      src={mechanic.image}
                      alt="mechanic"
                      style={{ width: "360px" }}
                      loading="lazy"
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
                  <h2 className="fw-bold text-dark">{mechanic.full_name}</h2>
                  <h4>{mechanic.shop_name}</h4>
                </div>
              </div>
            </Col>
            <Col xl="8">
              <div className="card">
                <div className="card-body pt-3">
                  <Tabs activeKey={tabKey} onSelect={setTabKey}>
                    <Tab eventKey="one" title="Overview">
                      <div className="tab-pane  my-3" id="profile-overview">
                        <h5 className="card-title my-2">Mechanics Details</h5>
                        <div className="row mb-2">
                          <div className="col-lg-3 col-md-4 fw-bold text-dark">
                            Full Name
                          </div>
                          <div className="col-lg-9 col-md-8">
                            {mechanic.full_name}
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-lg-3 col-md-4 fw-bold text-dark">
                            Shop Name
                          </div>
                          <div className="col-lg-9 col-md-8">
                            {mechanic.shop_name}
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-lg-3 col-md-4 fw-bold text-dark">
                            Email
                          </div>
                          <div className="col-lg-9 col-md-8">
                            {mechanic.email}
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-lg-3 col-md-4 fw-bold text-dark">
                            Phone
                          </div>
                          <div className="col-lg-9 col-md-8">
                            {mechanic.phone}
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-lg-3 col-md-4 fw-bold text-dark">
                            Shop Address
                          </div>
                          <div className="col-lg-9 col-md-8">
                            {mechanic.shop_address}
                          </div>
                        </div>

                        <div className="row mb-2">
                          <div className="col-lg-3 col-md-4 fw-bold text-dark">
                            Mobile
                          </div>
                          <div className="col-lg-9 col-md-8">
                            {mechanic.mobile || "Not available"}
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-lg-3 col-md-4 fw-bold text-dark">
                            Latitude
                          </div>
                          <div className="col-lg-9 col-md-8">
                            {mechanic.latitude || "Not available"}
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-lg-3 col-md-4 fw-bold text-dark">
                            Longitude
                          </div>
                          <div className="col-lg-9 col-md-8">
                            {mechanic.longitude || "Not available"}
                          </div>
                        </div>
                      </div>
                    </Tab>
                    <Tab eventKey="two" title="Edit Profile">
                      <div
                        className="tab-pane profile-edit pt-3"
                        id="profile-edit"
                      >
                        <Form>
                          <Form.Group className="row mb-3">
                            <Form.Label className="col-md-4 col-lg-3">
                              Full Name
                            </Form.Label>
                            <div className="col-md-8 col-lg-9">
                              <Form.Control
                                name="full_name"
                                type="text"
                                value={updatedMechanic.full_name}
                                onChange={(e) =>
                                  setUpdatedMechanic({
                                    ...updatedMechanic,
                                    full_name: e.target.value,
                                  })
                                }
                              />
                            </div>
                          </Form.Group>
                          <Form.Group className="row mb-3">
                            <Form.Label className="col-md-4 col-lg-3">
                              Shop Address
                            </Form.Label>
                            <div className="col-md-8 col-lg-9">
                              <Form.Control
                                name="shop_address"
                                type="text"
                                value={updatedMechanic.shop_address}
                                onChange={(e) =>
                                  setUpdatedMechanic({
                                    ...updatedMechanic,
                                    shop_address: e.target.value,
                                  })
                                }
                              />
                            </div>
                          </Form.Group>
                          <Form.Group className="row mb-3">
                            <Form.Label className="col-md-4 col-lg-3">
                              Phone
                            </Form.Label>
                            <div className="col-md-8 col-lg-9">
                              <Form.Control
                                name="phone"
                                type="text"
                                value={updatedMechanic.phone_no}
                                onChange={(e) =>
                                  setUpdatedMechanic({
                                    ...updatedMechanic,
                                    phone_no: e.target.value,
                                  })
                                }
                              />
                            </div>
                          </Form.Group>
                          <Form.Group className="row mb-3">
                            <Form.Label className="col-md-4 col-lg-3">
                              email
                            </Form.Label>
                            <div className="col-md-8 col-lg-9">
                              <Form.Control
                                name="email"
                                type="email"
                                value={updatedMechanic.email}
                                onChange={(e) =>
                                  setUpdatedMechanic({
                                    ...updatedMechanic,
                                    email: e.target.value,
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
                    <Tab eventKey="three" title="Transaction List">
                      <div
                        className="tab-pane profile-edit pt-3"
                        id="profile-edit"
                      >
                        <div className="card">
                          <div className="card-body">
                            <h5 className="card-title">Transaction List</h5>

                            <table className="table">
                              <thead>
                                <tr>
                                  <th scope="col">#</th>
                                  <th scope="col">Item</th>
                                  <th scope="col">Order Date</th>
                                  <th scope="col">Reminder</th>
                                  <th scope="col">Order Details</th>
                                </tr>
                              </thead>
                              <tbody>
                                {mechanicOrders.map((order, index) => (
                                  <tr key={order.id}>
                                    <th scope="row">{order.id}</th>
                                    <td>{order.item.item_name}</td>
                                    <td>{order.date}</td>
                                    <td>{order.reminder}</td>
                                    <td>
                                      <Link to={`/order/${order.id}`}>
                                        <div style={{ cursor: "pointer" }}>
                                          <BiDetail
                                            size={25}
                                            className="text-success"
                                            style={{
                                              cursor: "pointer",
                                              marginRight: "5px",
                                            }}
                                          />
                                          Details
                                        </div>
                                      </Link>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
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

export default MechanicsDetails;

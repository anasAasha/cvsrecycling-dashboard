import React, { useEffect, useState } from "react";
import { Col, Row, Tab, Tabs } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../../redux/actions/orderAction";


const OrderDetails = () => {
  const { id } = useParams();
  const orderId = Number(id);
  const dispatch = useDispatch();
  const ordersList = useSelector((state) => state.order.orders);
  const [tabKey, setTabKey] = useState("one");

  const order = ordersList.find((order) => order.id === orderId);

  useEffect(() => {
    if (ordersList.length === 0) {
      dispatch(getAllOrders());
    }
  }, [dispatch, ordersList]);

  if (!order) {
    return <div>Order not found.</div>;
  }

  return (
    <section>
      <div className="dash_sec">
        <div className="dash_sec__wrapper">
          <div className="head_sec">
            <h2 className="dash_sec__title">Order Details</h2>
          </div>
          <Row>
            <Col xl="12">
              <div className="card">
                <div className="card-body pt-3">
                  <Tabs activeKey={tabKey} onSelect={setTabKey}>
                    <Tab eventKey="one" title="User Information">
                      <div className="tab-pane my-3" id="order-overview">
                        <h5 className="card-title my-2">User Information</h5>

                        <div className="row mb-2">
                          <div className="col-lg-3 col-md-4 fw-bold text-dark">
                            Full Name
                          </div>
                          <div className="col-lg-9 col-md-8">
                            {order.user.fullName}
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-lg-3 col-md-4 fw-bold text-dark">
                            Phone Number
                          </div>
                          <div className="col-lg-9 col-md-8">
                            {order.user.phoneNo}
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-lg-3 col-md-4 fw-bold text-dark">
                            Shop Name
                          </div>
                          <div className="col-lg-9 col-md-8">
                            {order.user.shopName || "N/A"}
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-lg-3 col-md-4 fw-bold text-dark">
                            Email
                          </div>
                          <div className="col-lg-9 col-md-8">
                            {order.user.email}
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-lg-3 col-md-4 fw-bold text-dark">
                            Mobile Number
                          </div>
                          <div className="col-lg-9 col-md-8">
                            {order.user.mobileNo || "N/A"}
                          </div>
                        </div>
                      
                      </div>
                    </Tab>
                    <Tab eventKey="two" title="Item Details">
                      <div className="tab-pane my-3" id="order-overview">
                        <h5 className="card-title my-2">Item Details</h5>
                          <Row>
                            <Col lg='8'>
                             <div className="row mb-2">
                          <div className="col-lg-3 col-md- fw-bold text-dark">
                            Item ID
                          </div>
                          <div className="col-lg-9 col-md-8">
                            {order.item.id}
                          </div>
                        </div>
                       
                        <div className="row mb-2">
                          <div className="col-lg-3 col-md-4 fw-bold text-dark">
                            Price
                          </div>
                          <div className="col-lg-9 col-md-8">
                            {order.item.price}
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-lg-3 col-md-4 fw-bold text-dark">
                            Item Name
                          </div>
                          <div className="col-lg-9 col-md-8">
                            {order.item.item_name}
                          </div>
                        </div>
                            </Col>
                            <Col lg='4'>
                            <div className="row mb-2">
                          <div className="col-lg-3 col-md- fw-bold text-dark">
                            Image
                          </div>
                          <div className="col-lg-9 col-md-8">
                            <img
                              src={order.item.image}
                              alt={order.item.item_name}
                              className="img-fluid"
                            />
                          </div>
                        </div>
                            </Col>
                          </Row>
                       
                      </div>
                    </Tab>
                    <Tab eventKey="three" title="Order Details">
                      <div className="tab-pane my-3" id="order-overview">
                        <h5 className="card-title my-2">Order Details</h5>
                        <Row>
                          <Col lg='8'>
                          <div className="row mb-2">
                          <div className="col-lg-3 col-md-4 fw-bold text-dark">
                            Item Name
                          </div>
                          <div className="col-lg-9 col-md-8">
                            {order.item_name}
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-lg-3 col-md- fw-bold text-dark">
                            Order Date
                          </div>
                          <div className="col-lg-9 col-md-8">
                            {new Date(order.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                            })}
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-lg-3 col-md-4 fw-bold text-dark">
                            Time
                          </div>
                          <div className="col-lg-9 col-md-8">
                            {order.time || "N/A"}
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-lg-3 col-md-4 fw-bold text-dark">
                            Reminder
                          </div>
                          <div className="col-lg-9 col-md-8">
                            {order.reminder || "N/A"}
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-lg-3 col-md-4 fw-bold text-dark">
                            Note
                          </div>
                          <div className="col-lg-9 col-md-8">
                            {order.note}
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-lg-3 col-md-4 fw-bold text-dark">
                            Question 1
                          </div>
                          <div className="col-lg-9 col-md-8">
                            {order.question_1 || "N/A"}
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-lg-3 col-md-4 fw-bold text-dark">
                            Question 2
                          </div>
                          <div className="col-lg-9 col-md-8">
                            {Object.keys(order.question_2).length === 0
                              ? "N/A"
                              : order.question_2}
                          </div>
                        </div>                    
                        <div className="row mb-2">
                          <div className="col-lg-3 col-md-4 fw-bold text-dark">
                            IBAN
                          </div>
                          <div className="col-lg-9 col-md-8">
                            {order.iban || "N/A"}
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-lg-3 col-md-4 fw-bold text-dark">
                            Status
                          </div>
                          <div className="col-lg-9 col-md-8">
                            {order.status}
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-lg-3 col-md-4 fw-bold text-dark">
                            Created At
                          </div>
                          <div className="col-lg-9 col-md-8">
                            {new Date(order.created_at).toLocaleString()}
                          </div>
                        </div>
                          </Col>
                          <Col lg='4'>
                          <div className="row mb-2">
                          <div className="col-lg-3 col-md- fw-bold text-dark">
                            Images
                          </div>
                          <div className="col-lg-9 col-md-8">
                            {order.images.map((image, index) => (
                              <Row key={index} className="mb-2">
                                <Col md={12}>
                                <img
                             
                                src={image}
                                alt="image"
                                className="img-fluid"
                                
                              />
                                </Col>
                              </Row>
                              
                            ))}
                          </div>
                        </div>
                          </Col>
                        </Row>
                     
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

export default OrderDetails;

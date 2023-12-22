import React, { useEffect, useState } from "react";
import { Col, Row, Tab, Tabs } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllItems,

} from "../../redux/actions/itemActions"; 

const ItemDetails = () => {
  const { id } = useParams();
  const itemId = Number(id);
  const dispatch = useDispatch();
  const itemsList = useSelector((state) => state.item.items); 
  const [tabKey, setTabKey] = useState("one");
  

  const item = itemsList.find((item) => item.id === itemId);

 

  useEffect(() => {
    if (itemsList.length === 0) {
      dispatch(getAllItems());
    }
  }, [dispatch, itemsList]);

  if (!item) {
    return <div>Item not found.</div>;
  }

  return (
    <section>
      <div className="dash_sec">
        <div className="dash_sec__wrapper">
          <div className="head_sec">
            <h2 className="dash_sec__title">Item Details</h2>
          </div>
          <Row>
            <Col xl="4">
              <div className="card">
                <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt="item"
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
                 
                </div>
              </div>
            </Col>
            <Col xl="8">
              <div className="card">
                <div className="card-body pt-3">
                  <Tabs activeKey={tabKey} onSelect={setTabKey}>
                    <Tab eventKey="one" title="Overview">
                      <div className="tab-pane my-3" id="item-overview">
                        <h5 className="card-title my-2">Item Overview</h5>
                        <div className="row mb-2">
                          <div className="col-lg-3 col-md-4 fw-bold text-dark">
                            Item Name
                          </div>
                          <div className="col-lg-9 col-md-8">
                            {item.name}
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-lg-3 col-md-4 fw-bold text-dark">
                            Price
                          </div>
                          <div className="col-lg-9 col-md-8">
                            {item.price}
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-lg-3 col-md-4 fw-bold text-dark">
                            Unit
                          </div>
                          <div className="col-lg-9 col-md-8">
                            {item.unit}
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

export default ItemDetails;

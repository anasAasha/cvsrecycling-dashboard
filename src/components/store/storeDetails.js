import React, { useEffect, useState } from "react";
import { Col, Row, Tab, Tabs } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllStores } from "../../redux/actions/storeAction";

const StoreDetails = () => {
  const { id } = useParams();
  const storeId = Number(id);
  const dispatch = useDispatch();
  const storesList = useSelector((state) => state.store.stores);
  const [tabKey, setTabKey] = useState("one");

  const store = storesList.find((store) => store.id === storeId);

  useEffect(() => {
    if (storesList.length === 0) {
      dispatch(getAllStores());
    }
  }, [dispatch, storesList]);

  if (!store) {
    return <div>Store not found.</div>;
  }

  return (
    <section>
      <div className="dash_sec">
        <div className="dash_sec__wrapper">
          <div className="head_sec">
            <h2 className="dash_sec__title">Store Details</h2>
          </div>
          <Row>
            <Col xl="4">
              <div className="card">
                <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">
                  <h5 className="card-titletext-dark">{store.full_name}</h5>
                  <p className="card-text text-dark">{store.phone}</p>
                </div>
              </div>
            </Col>
            <Col xl="8">
              <div className="card">
                <div className="card-body pt-3">
                  <Tabs activeKey={tabKey} onSelect={setTabKey}>
                    <Tab eventKey="one" title="Overview">
                      <div className="tab-pane my-3" id="store-overview">
                        <h5 className="card-title my-2">Store Details</h5>

                        <div className="row mb-2">
                          <div className="col-lg-3 col-md- fw-bold text-dark">
                            Full Name
                          </div>
                          <div className="col-lg-9 col-md-8">
                            {store.full_name}
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-lg-3 col-md-4 fw-bold text-dark">
                            Address
                          </div>
                          <div className="col-lg-9 col-md-8">
                            {store.address}
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-lg-3 col-md-4 fw-bold text-dark">
                            Street
                          </div>
                          <div className="col-lg-9 col-md-8">
                            {store.address}
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-lg-3 col-md-4 fw-bold text-dark">
                            Zip
                          </div>
                          <div className="col-lg-9 col-md-8">{store.zip}</div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-lg-3 col-md-4 fw-bold text-dark">
                            email
                          </div>
                          <div className="col-lg-9 col-md-8">{store.email}</div>
                        </div>
                      </div>
                    </Tab>
                    {/* <Tab eventKey="two" title="Edit Profile">
                      <div
                        className="tab-pane profile-edit pt-3"
                        id="store-edit"
                      ></div>
                    </Tab> */}
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

export default StoreDetails;

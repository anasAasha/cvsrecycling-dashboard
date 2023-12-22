import React, { useState, useEffect } from "react";
import { Col, Form, Row, Tab, Tabs } from "react-bootstrap";
import Banner from "./Banner";
import axios from 'axios';
import { toast } from 'react-toastify';
import config from '../../config';

const SettingPage = () => {
  const [tabKey, setTabKey] = useState("one");
  const [aboutUsData, setAboutUsData] = useState("");
  const [termsData, setTermsData] = useState("");
  const [updatedTerms, setUpdatedTerms] = useState("");
  const [updatedAboutUs, setUpdatedAboutUs] = useState("");
  const [updateCounter, setUpdateCounter] = useState(0);

  useEffect(() => {
    axios.get(`${config.apiUrl}/terms/all`)
      .then((response) => {
        setTermsData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios.get(`${config.apiUrl}/aboutUs/all`)
      .then((response) => {
        setAboutUsData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [updateCounter]);

  const updateTerms = () => {
    const shouldUpdate = window.confirm("Are you sure you want to update Terms and Conditions?");
    if (shouldUpdate) {
      const data = JSON.stringify({ "content": updatedTerms });
      const termsConfig = {
        method: 'put',
        url: `${config.apiUrl}/terms/update`,
        headers: {
          'Content-Type': 'application/json'
        },
        data: data
      };

      axios.request(termsConfig)
        .then((response) => {
          setTermsData(response.data);
          setUpdateCounter(updateCounter + 1);
          toast.success("Terms and Conditions updated successfully.");
        })
        .catch((error) => {
          console.log(error);
          toast.error("Failed to update Terms and Conditions.");
        });
    }
  };

  const updateAboutUs = () => {
    const shouldUpdate = window.confirm("Are you sure you want to update About Us?");
    if (shouldUpdate) {
      const data = JSON.stringify({ "content": updatedAboutUs });
      const aboutUsConfig = {
        method: 'put',
        url: `${config.apiUrl}/aboutUs/update`,
        headers: {
          'Content-Type': 'application/json'
        },
        data: data
      };

      axios.request(aboutUsConfig)
        .then((response) => {
          setAboutUsData(response.data);
          toast.success("About Us updated successfully.");
        })
        .catch((error) => {
          console.log(error);
          toast.error("Failed to update About Us.");
        });
    }
  };

  return (
    <section>
      <div className="dash_sec">
        <div className="dash_sec__wrapper">
          <div className="head_sec">
            <h2 className="dash_sec__title">Setting</h2>
          </div>

          <Row>
            <Col xl="12">
              <div className="card">
                <div className="card-body pt-3">
                  <Tabs activeKey={tabKey} onSelect={setTabKey}>
                    <Tab eventKey="one" title="Banner Setting">
                      <div className="tab-pane my-3">
                        <Banner />
                      </div>
                    </Tab>
                    <Tab eventKey="two" title="Edit Terms And Conditions">
                      <div className="tab-pane pt-3">
                        <Form>
                          <div className="tab-pane">
                            <h5 className="card-title">Terms And Conditions</h5>
                            <p className="small fst-bold">
                              {termsData.TermsAndConditions}
                            </p>
                          </div>
                          <Form.Group className="row mb-3">
                            <Form.Label className="col-md-4 col-lg-3">
                              Edit Terms And Conditions
                            </Form.Label>
                            <div className="col-md-8 col-lg-9">
                              <Form.Control
                                as="textarea"
                                row={3}
                                onChange={(e) => setUpdatedTerms(e.target.value)}
                                style={{ height: "100px" }}
                              />
                            </div>
                          </Form.Group>

                          <div className="text-center">
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={updateTerms}
                            >
                              Save Changes
                            </button>
                          </div>
                        </Form>
                      </div>
                    </Tab>
                    <Tab eventKey="three" title="Edit About Us">
                      <div className="tab-pane pt-3">
                        <Form>
                          <div className="tab-pane">
                            <h5 className="card-title">About Us</h5>
                            <p className="small fst-bold">
                              {aboutUsData.content}
                            </p>
                          </div>
                          <Form.Group className="row mb-3">
                            <Form.Label className="col-md-4 col-lg-3">
                              Edit About Us
                            </Form.Label>
                            <div className="col-md-8 col-lg-9">
                              <Form.Control
                                as="textarea"
                                row={3}
                                onChange={(e) => setUpdatedAboutUs(e.target.value)}
                                style={{ height: "100px" }}
                              />
                            </div>
                          </Form.Group>

                          <div className="text-center">
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={updateAboutUs}
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

export default SettingPage;

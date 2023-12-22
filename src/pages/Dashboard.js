import React from "react";
import { Card, Col, Row } from "react-bootstrap";

import { CiDeliveryTruck } from "react-icons/ci";
import { GiMechanicGarage } from "react-icons/gi";


import { useDispatch, useSelector } from 'react-redux';
import {
  getAllMechanics,
 
} from '../redux/actions/mechanicActions';
import { useEffect } from "react";
import { getAllDrivers } from "../redux/actions/driverActions";
import OrderScheduleCalendar from "../components/orders/OrderScheduleCalendar";

import { getAllInvoices } from "../redux/actions/invoiceActions";
import OrderReminder from "../components/utils/OrderReminder";
// import DailyPriceChart from "../components/utils/DailyPriceChart";
const Dashboard = () => {
  const dispatch = useDispatch();
  const mechanicsList = useSelector((state) => state.mechanic.mechanics);
  // const invoices = useSelector((state) => state.invoice);  
 
  useEffect(() => {
    dispatch(getAllMechanics());
    dispatch(getAllInvoices)
  }, [dispatch]);
 
  const driver  = useSelector((state) => state.driver.drivers);

  useEffect(() => {
    dispatch(getAllDrivers());
    dispatch(getAllInvoices)
  }, [dispatch]);
  return (
    <section>
      <Row>
        <Col lg="3">
          <Card>
            <Card.Body>
              <h5 className="card-title">
                Drivers <span></span>
              </h5>

              <div className="d-flex align-items-center">
                <div className="card-icon rounded-circle d-flex align-items-center justify-content-center ">
                  <CiDeliveryTruck size={"2em"} />
                </div>
                <div className="ps-3">
                  <span className="text-success small pt-1 fw-bold">{driver.length}</span>{" "}
                  <span className="text-muted small pt-2 ps-1">Drivers</span>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col lg="3">
          <Card>
            <Card.Body>
              <h5 className="card-title">
                Mechanic   <span></span>
              </h5>

              <div className="d-flex align-items-center">
                <div className="card-icon rounded-circle d-flex align-items-center justify-content-center ">
                  <GiMechanicGarage size={"2em"} />
                </div>
                <div className="ps-3">
                  <span className="text-success small  fw-bold">{mechanicsList.length}</span>{" "}
                  <span className="text-muted small  ps-1">Mechanic(s)</span>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col lg="6">
        <OrderReminder/>
        </Col>
      </Row>
      <Row>
       
        {/* <Col lg="6">
          <Items />
        </Col> */}
      </Row>
      <Row>
        <Col lg="12">
          {/* <DailyPriceChart invoices={invoices}/> */}
          {/* <AppointmentScheduleCalendar /> */}
        </Col>
      </Row>
      <Row>
        <Col lg="12">
          <OrderScheduleCalendar/>.
        </Col>
      </Row>
    </section>
  );
};

export default Dashboard;

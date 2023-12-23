import React from "react";
import { Col, Row } from "react-bootstrap";
import { CiDeliveryTruck } from "react-icons/ci";
import { GiMechanicGarage } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { getAllMechanics } from "../redux/actions/mechanicActions";
import { useEffect } from "react";
import { getAllDrivers } from "../redux/actions/driverActions";
import OrderScheduleCalendar from "../components/orders/OrderScheduleCalendar";
import OrderReminder from "../components/utils/OrderReminder";
import CardLength from "../components/common/reuseable/CardLength";
const Dashboard = () => {
  const dispatch = useDispatch();
  const mechanicsList = useSelector((state) => state.mechanic.mechanics);
  const driver = useSelector((state) => state.driver.drivers);
  useEffect(() => {
    dispatch(getAllMechanics());
    dispatch(getAllDrivers());
  }, [dispatch]);
  return (
    <section>
      <Row>
        <Col lg="3">
          <CardLength
            title="Drivers"
            icon={CiDeliveryTruck}
            data={driver}
            label="Drivers"
          />
        </Col>
        <Col lg="3">
          <CardLength
            title="Mechanic"
            icon={GiMechanicGarage}
            data={mechanicsList}
            label="Mechanic(s)"
          />
        </Col>
        <Col lg="6">
          <OrderReminder />
        </Col>
      </Row>
      <Row>
        <Col lg="12">
          <OrderScheduleCalendar />.
        </Col>
      </Row>
    </section>
  );
};

export default Dashboard;

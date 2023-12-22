import React, {  useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { Link } from "react-router-dom";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../../redux/actions/orderAction";

const OrderScheduleCalendar = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order.orders);
  const localizer = momentLocalizer(moment);

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  const events = orders.map((order) => ({
    title: order.item.item_name,
    start: new Date(order.date),
    end: new Date(order.date),
    resourceId: order.id,
 
    link: `/order/${order.id}`,
  }));

  const EventComponent = ({ event }) => (
    <div>
      <Link className="text-dark"  to={event.link}>{event.title}</Link>
    </div>
  );

  return (
    <div style={{ height: 500 }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        // endAccessor="end"
        style={{ margin: "20px" }}z
        components={{
          event: EventComponent, 
        }}
      />
    </div>
  );
};

export default OrderScheduleCalendar;

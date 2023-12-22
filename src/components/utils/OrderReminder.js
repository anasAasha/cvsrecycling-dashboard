import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllOrders } from '../../redux/actions/orderAction';

const OrderReminder = () => {
  const dispatch = useDispatch();
  const [todayOrders, setTodayOrders] = useState([]);
  const orders = useSelector((state) => state.order.orders);

  useEffect(() => {
    dispatch(getAllOrders());
    const today = new Date().toLocaleDateString();
    const todayOrders = orders.filter(
      (order) => new Date(order.reminder).toLocaleDateString() === today
    );
    setTodayOrders(todayOrders);
  }, [dispatch, orders]);

  return (
    <Card>
      <Card.Body>
        <Card.Title>
          Order Reminder <span>| Today</span>
        </Card.Title>

        <div className="activity">
          {todayOrders.map((order) => (
            <div key={order.id} className="activity-item d-flex my-3">
              {/* <div className="activite-label "><span className='text-bold'>reminder date:</span>{order.reminder}</div> */}
              <i className="bi bi-circle-fill activity-badge text-success align-self-start"></i>
              <div className="activity-content">
                {order.user && (
                  <>
                   <span className='fw-bold mx-2'>Customer:</span>{order.user.fullName}{' '}
                    <Link to={`/order/${order.id}`} className="">
                    <span className='fw-bold mx-2'>Item:</span>{order.item.item_name}
                    </Link>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card.Body>
    </Card>
  );
};

export default OrderReminder;

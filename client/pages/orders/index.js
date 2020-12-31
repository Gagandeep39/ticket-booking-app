/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-12-31 18:03:42
 * @modify date 2020-12-31 18:03:42
 * @desc Lists all orders
 */
import React from 'react';

const OrderIndex = ({ orders }) => {
  return (
    <div>
      <h1>My Orders History</h1>
      {orders.map((order) => (
        <li key={order.id}>
          {order.ticket.title} - {order.status}
        </li>
      ))}
    </div>
  );
};

OrderIndex.getInitialProps = async (context, client) => {
  const { data } = await client.get('/api/orders');
  return { orders: data };
};

export default OrderIndex;

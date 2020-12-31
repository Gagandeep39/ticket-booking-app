/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-12-31 16:16:20
 * @modify date 2020-12-31 16:16:20
 * @desc [description]
 */

import React, { useEffect, useState } from 'react';

const OrderShow = ({ order }) => {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt) - new Date();
      setTimeLeft(Math.round(msLeft / 1000));
    };

    findTimeLeft();
    const timeId = setInterval(findTimeLeft, 1000);
    return () => {
      clearInterval(timeId);
    };
  }, [order]);

  if (timeLeft < 0) return <div>Order Expired!</div>;
  return <div>{timeLeft} seconds until order expires</div>;
};

OrderShow.getInitialProps = async (context, client) => {
  const { orderId } = context.query;
  const { data } = await client.get(`/api/orders/${orderId}`);
  return { order: data };
};

export default OrderShow;

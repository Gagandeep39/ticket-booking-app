/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-12-07 18:21:44
 * @modify date 2020-12-07 18:21:44
 * @desc Delete an Order
 */
import { app } from '../../app';
import request from 'supertest';
import { Ticket } from '../../models/ticket';
import { Order } from '../../models/order';
import { OrderStatus } from '@gagan-personal/common';

it('Mark an Order as cancelled', async () => {
  // Creat ticket
  const ticket = Ticket.build({
    price: 99,
    title: 'Monsters',
  });
  await ticket.save();
  const user = global.signIn();
  // Make request to create order
  const { body: order } = await request(app)
    .post('/api/orders')
    .set('Cookie', user)
    .send({ ticketId: ticket.id })
    .then((response) => {
      expect(response.status).toEqual(201);
      return response;
    });
  // Make request to cancel order
  await request(app)
    .delete(`/api/orders/${order.id}`)
    .set('Cookie', user)
    .then((response) => {
      // Validate response
      expect(response.status).toEqual(204);
    });
  // [Optional] Compare order status
  await Order.findById(order.id).then((order) => {
    expect(order?.status).toEqual(OrderStatus.Cancelled);
  });
});

it.todo('Emit an Order Cancelled Event');

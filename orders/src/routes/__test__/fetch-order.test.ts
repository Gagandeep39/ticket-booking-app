/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-12-07 18:04:45
 * @modify date 2020-12-07 18:04:45
 * @desc Fetch order by ID for User
 */
import { app } from '../../app';
import request from 'supertest';
import { Ticket } from '../../models/ticket';

it('Fetch Order', async () => {
  // Crate ticket
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
  // Fetch Order
  await request(app)
    .get(`/api/orders/${order.id}`)
    .set('Cookie', user)
    .then((response) => {
      expect(response.status).toEqual(200);
      expect(order.id).toEqual(response.body.id);
    });
});

it('Returns error if user fetches order of another user', async () => {
  // Crate ticket
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
  // Fetch Order
  await request(app)
    .get(`/api/orders/${order.id}`)
    .set('Cookie', global.signIn())
    .then((response) => {
      expect(response.status).toEqual(401);
    });
});

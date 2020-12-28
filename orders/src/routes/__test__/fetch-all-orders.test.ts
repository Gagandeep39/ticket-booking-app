/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-12-07 17:39:21
 * @modify date 2020-12-07 17:39:21
 * @desc Fetch all order tests
 */
import { app } from '../../app';
import request from 'supertest';
import { Ticket } from '../../models/ticket';
import mongoose from 'mongoose';

it('Fetch Orders for particular User', async () => {
  const ticketOne = await buildTicket();
  const ticketTwo = await buildTicket();
  const ticketThree = await buildTicket();

  const userOne = global.signIn();
  const userTwo = global.signIn();
  // Crate 1 tickets for User 1
  await request(app)
    .post('/api/orders')
    .set('Cookie', userOne)
    .send({ ticketId: ticketOne.id })
    .then((response) => {
      expect(response.status).toEqual(201);
    });
  // Create 2 ticket for user 2
  const { body: orderOne } = await request(app)
    .post('/api/orders')
    .set('Cookie', userTwo)
    .send({ ticketId: ticketTwo.id })
    .then((response) => {
      expect(response.status).toEqual(201);
      return response;
    });
  const { body: orderTwo } = await request(app)
    .post('/api/orders')
    .set('Cookie', userTwo)
    .send({ ticketId: ticketThree.id })
    .then((response) => {
      expect(response.status).toEqual(201);
      return response;
    });
  // Fetch ticket for User 2
  await request(app)
    .get('/api/orders')
    .set('Cookie', userTwo)
    .then((response) => {
      expect(response.status).toEqual(200);
      // Makre sure we got order for user 2
      expect(response.body.length).toEqual(2);
      expect(response.body[0].id).toEqual(orderOne.id);
      expect(response.body[1].id).toEqual(orderTwo.id);
    });
});

const buildTicket = () => {
  return Ticket.build({
    title: 'Dummy',
    price: 99,
    id: mongoose.Types.ObjectId().toHexString(),
  }).save();
};

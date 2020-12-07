/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-12-07 16:45:13
 * @modify date 2020-12-07 16:45:13
 * @desc Test cases
 */
import { app } from '../../app';
import request from 'supertest';
import mongoose from 'mongoose';
import { Ticket } from '../../models/ticket';
import { Order } from '../../models/order';
import { OrderStatus } from '@gagan-personal/common';

it('Retunrs Error if ticket doesnt exist', async () => {
  const ticketId = mongoose.Types.ObjectId();
  await request(app)
    .post('/api/orders')
    .set('Cookie', global.signIn())
    .send({ ticketId })
    .then((response) => {
      expect(response.status).toEqual(404);
    });
});

it('Retunrs Error if ticket reserved', async () => {
  // Insert tick and create order
  const ticket = Ticket.build({
    price: 20,
    title: 'Dummy',
  });
  await ticket.save();
  const order = Order.build({
    expiresAt: new Date(),
    status: OrderStatus.Created,
    ticket,
    userId: 'sxdcfvgbh',
  });

  await order.save();
  // Reinsert to see if reserved
  await request(app)
    .post('/api/orders')
    .set('Cookie', global.signIn())
    .send({ ticketId: ticket.id })
    .then((response) => {
      expect(response.status).toEqual(400);
    });
});

it('Reserve a ticket', async () => {
  // Insert tick and create order
  const ticket = Ticket.build({
    price: 20,
    title: 'Dummy',
  });
  await ticket.save();
  await request(app)
    .post('/api/orders')
    .set('Cookie', global.signIn())
    .send({ ticketId: ticket.id })
    .then((response) => {
      expect(response.status).toEqual(201);
    });
});

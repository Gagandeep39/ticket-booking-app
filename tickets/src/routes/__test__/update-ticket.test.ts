/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-10-25 20:07:03
 * @modify date 2020-10-25 20:07:03
 * @desc Update ticket stest cases
 */
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { natsWrapper } from '../../config/nats-wrapper';

it('Return 404, if the provideed ID doesnt exist', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  request(app)
    .put(`/api/tickets/${id}`)
    .set('Cookie', global.signIn())
    .send({
      title: 'Random Movie',
      price: 999,
    })
    .then((response) => {
      expect(response.status).toEqual(404);
    });
});

it('Return 401, if user not authenticated', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  request(app)
    .put(`/api/tickets/${id}`)
    .send({
      title: 'Random Movie',
      price: 999,
    })
    .then((response) => {
      expect(response.status).toEqual(401);
    });
});

it('Return 401, if user doesnt own ticket', async () => {
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signIn())
    .send({
      title: 'Ticket',
      price: 99,
    });
  expect(response.status).toEqual(201);
  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', global.signIn())
    .send({
      title: 'Random Movie',
      price: 999,
    })
    .then((response) => {
      expect(response.status).toEqual(401);
    });
});

it('Return 400, if the provideed invalid data', async () => {
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signIn())
    .send({
      title: 'Ticket',
      price: 99,
    });
  expect(response.status).toEqual(201);
  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', global.signIn())
    .send({
      price: 999,
    })
    .then((response) => {
      expect(response.status).toEqual(400);
    });
});

it('Updates ticket, if input is valid', async () => {
  const cookie = global.signIn();
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({
      title: 'Ticket',
      price: 99,
    });
  expect(response.status).toEqual(201);
  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: 'Correct title',
      price: 999,
    })
    .then((response) => {
      expect(response.status).toEqual(200);
    });
});

it('Publishes an Event', async () => {
  const cookie = global.signIn();
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({
      title: 'Ticket',
      price: 99,
    });
  expect(response.status).toEqual(201);
  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: 'Correct title',
      price: 999,
    })
    .then((response) => {
      expect(response.status).toEqual(200);
    });
  expect(natsWrapper.client.publish).toHaveBeenCalled();
});

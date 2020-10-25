/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-10-25 11:53:46
 * @modify date 2020-10-25 11:53:46
 * @desc Create Ticket Route Tests
 */
import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/tickets';

it('Route handler lsitenning for post request at /api/tickets', async () => {
  request(app)
    .post('/api/tickets')
    .send({})
    .then((response) => {
      expect(response.status).not.toEqual(404);
    });
});

it('Route Only accessible with a signed in user', async () => {
  request(app)
    .post('/api/tickets')
    .send({})
    .then((response) => {
      expect(response.status).toEqual(401);
    });
});

it('Returns an error if User is not logged Un', async () => {
  request(app)
    .post('/api/tickets')
    .set('Cookie', global.signIn())
    .send({})
    .then((response) => {
      expect(response.status).not.toEqual(401);
    });
});

it('Returns an error if invalid price is provided', async () => {
  request(app)
    .post('/api/tickets')
    .set('Cookie', global.signIn())
    .send({
      title: '',
      price: 12,
    })
    .then((response) => {
      expect(response.status).toEqual(400);
    });

  request(app)
    .post('/api/tickets')
    .set('Cookie', global.signIn())
    .send({
      price: 12,
    })
    .then((response) => {
      expect(response.status).toEqual(400);
    });
});

it('Create new tickets', async () => {
  request(app)
    .post('/api/tickets')
    .set('Cookie', global.signIn())
    .send({
      title: 'Title',
    })
    .then((response) => {
      expect(response.status).toEqual(400);
    });

  request(app)
    .post('/api/tickets')
    .set('Cookie', global.signIn())
    .send({
      title: 'Title',
      price: -10,
    })
    .then((response) => {
      expect(response.status).toEqual(400);
    });
});

it('Create a ticket successfully with a valid Input', async () => {
  let tickets = await Ticket.find({});
  expect(tickets.length).toEqual(0);
  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signIn())
    .send({
      title: 'Ticket',
      price: 99,
    })
    .then((response) => {
      expect(response.status).toEqual(201);
    });
  tickets = await Ticket.find({});
  expect(tickets.length).toEqual(1);
});

/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-10-25 11:53:46
 * @modify date 2020-10-25 11:53:46
 * @desc Create Ticket Route Tests
 */
import request from 'supertest';
import { app } from '../../app';

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

it('Returns an error if invalid price is provided', async () => {});

it('Create new tickets', async () => {});

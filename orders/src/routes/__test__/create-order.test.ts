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

it('Retunrs Error if ticket reserved', async () => {});

it('Reserve a ticket', async () => {});

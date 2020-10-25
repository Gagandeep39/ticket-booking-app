/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-10-25 17:07:51
 * @modify date 2020-10-25 17:07:51
 * @desc Tests cases for fetch Ticket route
 */
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';

it('Return 404 if ticket not found', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .get(`/api/tickets/${id}`)
    .send()
    .then((response) => {
      console.log(response.status);
      
      expect(response.status).toEqual(404);
    });
});

it('Return Ticket if Found', async () => {
  const title = 'Ticketass';
  const price = 99;

  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signIn())
    .send({
      title,
      price,
    });
  await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send()
    .then((response) => {
      expect(response.status).toEqual(200);
      expect(response.body.title).toEqual(title);
      expect(response.body.price).toEqual(price);
    });
});

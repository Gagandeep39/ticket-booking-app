/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-10-25 18:24:36
 * @modify date 2020-10-25 18:24:36
 * @desc Fetch ALl tickets
 */
import request from 'supertest';
import { app } from '../../app';

it('Return 404 if ticket not found', async () => {
  await createTicket();
  await createTicket();
  await createTicket();
  request(app)
    .get('/api/tickets')
    .send()
    .expect((response) => {
      expect(response.status).toEqual(200);
      expect(response.body.length).toEqual(3);
    });
});

const createTicket = () => {
  return request(app).post('/api/tickets').set('Cookie', global.signIn()).send({
    title: 'Ticket',
    price: 99,
  });
};

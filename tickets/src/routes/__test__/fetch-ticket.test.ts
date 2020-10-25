/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-10-25 17:07:51
 * @modify date 2020-10-25 17:07:51
 * @desc Tests cases for fetch Ticket route
 */
import request from 'supertest';
import { app } from '../../app';

it('Return 404 if ticket not found', async () => {
  request(app)
    .get('/api/tickets/sdcfvgbbf')
    .send()
    .then((response) => {
      expect(response.status).toEqual(404);
    });
});
it('Return Ticket if Found', async () => {
  const title = 'Ticket';
  const price = 99;

  request(app)
    .post('/api/tickets')
    .set('Cookie', global.signIn())
    .send({
      title,
      price,
    })
    .then((response) => {
      expect(response.status).toEqual(201);
      request(app)
        .get(`/api/tickets/${response.body.id}`)
        .send()
        .then((response) => {
          expect(response.status).toEqual(200);
          expect(response.body.title).toEqual(title);
          expect(response.body.price).toEqual(price);
        });
    });
});

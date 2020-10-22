/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-10-22 13:27:25
 * @modify date 2020-10-22 13:27:25
 * @desc Test cases for Sign Out
 */
import request from 'supertest';
import { app } from '../../app';

/**
 * Test Whether cookie is properly unset on signining out
 */
it('Clear cookie after signout', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({ email: 'singh.gagandeep3911@gmal.com', password: '123456' })
    .then((response) => {
      expect(response.status).toEqual(201);
    });

  request(app)
    .post('/api/users/signout')
    .then((response) => {
      expect(response.get('Set-Cookie')[0]).toEqual(
        'express:sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly'
      );
    });
});

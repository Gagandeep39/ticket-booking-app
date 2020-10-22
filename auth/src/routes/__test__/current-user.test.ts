/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-10-22 13:41:58
 * @modify date 2020-10-22 13:41:58
 * @desc Test current user route
 */

import request from 'supertest';
import { app } from '../../app';

/**
 * Respond with details of current user
 */
it('Respond with details of current user', async () => {
  const cookie = await global.signIn();

  await request(app)
    .get('/api/users/currentuser')
    .set('Cookie', cookie)
    .send()
    .then((response) => {
      console.log(response.body);
      expect(response.status).toEqual(200);
    });
});

/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-10-22 11:54:24
 * @modify date 2020-10-22 11:54:24
 * @desc Test signup route
 */
import request from 'supertest';
import { app } from '../../app';

it('Returns 201 on Successful sign Up', () =>
  request(app)
    .post('/api/users/signup')
    .send({ email: 'singh.gagandeep3911@gmal.com', password: '123456' })
    .expect(201));

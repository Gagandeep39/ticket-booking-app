/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-10-22 11:54:24
 * @modify date 2020-10-22 11:54:24
 * @desc Test signup route
 */
import request from 'supertest';
import { app } from '../../app';

/**
 * Test whether user creation returns @code 201
 */
it('Returns 201 on Successful sign Up', () =>
  request(app)
    .post('/api/users/signup')
    .send({ email: 'singh.gagandeep3911@gmal.com', password: '123456' })
    .expect(201));

/**
 *Retuns @code 400 on invalid email
 */
it('Returns 400 with invalid data', () => {
  // Invalid Email
  request(app)
    .post('/api/users/signup')
    .send({ email: 'singh.gagandeep3911gmal.com', password: '123456' })
    .expect(200);

  // No password
  request(app)
    .post('/api/users/signup')
    .send({ email: 'singh.gagandeep3911gmal.com' })
    .expect(200);
});

/**
 * Prevent duplicate email
 */
it('Prevent signup with invalid email', () => {
  request(app)
    .post('/api/users/signup')
    .send({ email: 'singh.gagandeep3911@gmal.com', password: '123456' })
    .expect(201);
  request(app)
    .post('/api/users/signup')
    .send({ email: 'singh.gagandeep3911@gmal.com', password: '123456' })
    .expect(400);
});

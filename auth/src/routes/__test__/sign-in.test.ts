/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-10-22 13:04:17
 * @modify date 2020-10-22 13:04:17
 * @desc Test cases for Sign In
 */
import request from 'supertest';
import { app } from '../../app';

/**
 * Fail when Incorrect password is supplied @code 400
 */
it('Fails when email that doesnt esist is supplied', () =>
  request(app)
    .post('/api/users/signin')
    .send({ email: 'lol@lol.com', password: '123456' })
    .then((response) => {
      expect(response.status).toEqual(400);
    }));

/**
 *Retuns @code 400 onSign In failure
 */
it('Returns 400 with invalid data', async () => {
  // Invalid Email
  await request(app)
    .post('/api/users/signup')
    .send({ email: 'singh.gagandeep3911@gmail.com', password: '123456' })
    .then((response) => {
      expect(response.status).toEqual(201);
    });

  // No password
  await request(app)
    .post('/api/users/signin')
    .send({ email: 'singh.gagandeep3911@gmail.com', password: '1234' })
    .then((response) => {
      expect(response.status).toEqual(400);
    });
});

/**
 *Retuns @code 200 onSign In Successfully
 */
it('Returns 200 on Successfull login', async () => {
  // Invalid Email
  await request(app)
    .post('/api/users/signup')
    .send({ email: 'singh.gagandeep3911@gmail.com', password: '123456' })
    .then((response) => {
      expect(response.status).toEqual(201);
    });

  // No password
  await request(app)
    .post('/api/users/signin')
    .send({ email: 'singh.gagandeep3911@gmail.com', password: '123456' })
    .then((response) => {
      expect(response.status).toEqual(200);
      expect(response.get('Set-Cookie')).toBeDefined();
    });
});


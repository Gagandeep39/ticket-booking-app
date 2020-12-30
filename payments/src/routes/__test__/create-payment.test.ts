/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-12-30 12:57:39
 * @modify date 2020-12-30 12:57:39
 * @desc Create payment tests
 */

import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import { Order } from '../../models/order';
import { OrderStatus } from '@gagan-personal/common';
import { stripe } from '../../config/stripe';
import { Payment } from '../../models/payment';
// jest.mock('../../config/stripe');

it('Return 404 when order doesnt exist', async () => {
  request(app)
    .post('/api/payments')
    .set('Cookie', global.signIn())
    .send({
      token: '12345',
      orderId: mongoose.Types.ObjectId().toHexString(),
    })
    .then((response) => {
      expect(response.status).toEqual(404);
    });
});

it('401 if order doesnt belong to current user', async () => {
  // Create order with a random user
  const order = await Order.build({
    id: mongoose.Types.ObjectId().toHexString(),
    userId: mongoose.Types.ObjectId().toHexString(),
    version: 0,
    price: 20,
    status: OrderStatus.Created,
  }).save();

  // Pay for order with naother random user
  await request(app)
    .post('/api/payments')
    .set('Cookie', global.signIn())
    .send({
      token: '12345',
      orderId: order.id,
    })
    .then((response) => {
      expect(response.status).toEqual(401);
    });
});

it('400, if order cancelled', async () => {
  const userId = mongoose.Types.ObjectId().toHexString();
  // Create order with a random user
  const order = await Order.build({
    id: mongoose.Types.ObjectId().toHexString(),
    userId,
    version: 0,
    price: 20,
    status: OrderStatus.Cancelled,
  }).save();

  await request(app)
    .post('/api/payments')
    .set('Cookie', global.signIn(userId))
    .send({
      token: '12345',
      orderId: order.id,
    })
    .then((response) => {
      expect(response.status).toEqual(400);
    });
});

it('Returns 201 with valid inputs', async () => {
  const userId = mongoose.Types.ObjectId().toHexString();
  // Create order with a random user
  const order = await Order.build({
    id: mongoose.Types.ObjectId().toHexString(),
    userId,
    version: 0,
    price: 20,
    status: OrderStatus.Created,
  }).save();

  await request(app)
    .post('/api/payments')
    .set('Cookie', global.signIn(userId))
    .send({
      token: 'tok_visa',
      orderId: order.id,
    })
    .then((response) => {
      expect(response.status).toEqual(201);
    });

  const chargeOptions = (stripe.charges.create as jest.Mock).mock.calls[0][0];
  expect(chargeOptions.source).toEqual('tok_visa');
  expect(chargeOptions.amount).toEqual(20 * 100);
  expect(chargeOptions.currency).toEqual('inr');
});

// Steps to test against actual API
// 1. Remove mock file
// 2. Remove jest statment
// 3. Add API key in test/setup
// 4. Call a route handler -> Route will send request to server -> Rsponse from Stripe -> Fetch response inside test -> Compare response with Stripe server test
// it('Returns 201 with valid inputs', async () => {
//   const userId = mongoose.Types.ObjectId().toHexString();
//   const price = Math.floor(Math.random() * 100000);
//   // Create order with a random user
//   const order = await Order.build({
//     id: mongoose.Types.ObjectId().toHexString(),
//     userId,
//     version: 0,
//     price,
//     status: OrderStatus.Created,
//   }).save();
//   console.log(process.env.STRIPE_SECRET_KEY);

//   await request(app)
//     .post('/api/payments')
//     .set('Cookie', global.signIn(userId))
//     .set({ Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}` })
//     .send({
//       token: 'tok_visa',
//       orderId: order.id,
//     })
//     .then((response) => {
//       console.log(response.status);

//       expect(response.status).toEqual(201);
//     });

//   const stripeCharges = await stripe.charges.list({
//     limit: 50,
//   });
//   const stripeCharge = stripeCharges.data.find(
//     (charge) => charge.amount === price * 100
//   );
//   expect(stripeCharge).toBeDefined();
//   expect(stripeChange?.currency).toEqual('inr');
// const payment = Payment.findOne({
//   orderId: order.id,
//   stripeId: stripeChange?.id,
// });
// expect(payment).not.toBeNull();
// });

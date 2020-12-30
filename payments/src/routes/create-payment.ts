/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-12-30 12:35:29
 * @modify date 2020-12-30 12:35:29
 * @desc Create payment
 */
import {
  BadRequestError,
  NotAuthorizedError,
  NotFoundError,
  OrderStatus,
  requireAuth,
  validateRequest,
} from '@gagan-personal/common';
import express, { NextFunction, Request, Response } from 'express';
import { stripe } from '../config/stripe';
import { Order } from '../models/order';
import { createPaymentsValidator } from '../validators/create-payment';
const router = express.Router();

router.post(
  '/api/payments',
  requireAuth,
  createPaymentsValidator,
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const { token, orderId } = req.body;
    const order = await Order.findById(orderId);

    if (!order) throw new NotFoundError();
    if (order.userId !== req.currentUser?.id) throw new NotAuthorizedError();
    if (order.status === OrderStatus.Cancelled)
      throw new BadRequestError('Order already cancelled');
    await stripe.charges
      .create({
        currency: 'inr',
        amount: order.price * 100,
        source: token, // Use dummy token: 'tok_visa' for testing
      })
      .then((res) => console.log(res))
      .catch((err) => next(err));

    res.sendStatus(201).send({ success: true });
  }
);

export { router as createPaymentRouter };

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

    res.send('Success');
  }
);

export { router as createPaymentRouter };

/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-12-30 12:35:29
 * @modify date 2020-12-30 12:35:29
 * @desc Create payment
 */
import { requireAuth, validateRequest } from '@gagan-personal/common';
import express, { NextFunction, Request, Response } from 'express';
import { createPaymentsValidator } from '../validators/create-payment';
const router = express.Router();

router.post(
  '/api/payments',
  requireAuth,
  createPaymentsValidator,
  validateRequest,
  (req: Request, res: Response, next: NextFunction) => {
    res.send('Success');
  }
);

export { router as createPaymentRouter };

/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-12-04 18:13:32
 * @modify date 2020-12-04 18:13:32
 * @desc Fetch All Orders for the user
 */
import { requireAuth } from '@gagan-personal/common';
import express, { NextFunction, Request, Response } from 'express';
import { Order } from '../models/order';
const router = express.Router();

router.get(
  '/api/orders',
  requireAuth,
  (req: Request, res: Response, next: NextFunction) => {
    Order.find({ userId: req.currentUser!.id })
      .populate('ticket') // Fetch ticket for each order
      .then((orders) => res.send(orders))
      .catch((error) => next(error));
  }
);

export { router as fetchAllOrdersRouter };

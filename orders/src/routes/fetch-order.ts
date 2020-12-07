/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-12-04 18:13:32
 * @modify date 2020-12-04 18:13:32
 * @desc Route to fetch a single order
 */
import {
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
} from '@gagan-personal/common';
import express, { NextFunction, Request, Response } from 'express';
import { Order } from '../models/order';
const router = express.Router();

router.get(
  '/api/orders/:id',
  requireAuth,
  (req: Request, res: Response, next: NextFunction) => {
    Order.findById(req.params.id)
      .populate('ticket') // Fetch ticket for each order
      .then((order) => {
        if (!order) throw new NotFoundError();
        if (order.userId !== req.currentUser!.id)
          throw new NotAuthorizedError();
        return res.send(order);
      })
      .catch((error) => next(error));
  }
);

export { router as fetchOrderRouter };

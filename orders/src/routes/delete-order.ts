/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-12-04 18:13:32
 * @modify date 2020-12-04 18:13:32
 * @desc Delete Order route
 */
import {
  NotAuthorizedError,
  NotFoundError,
  OrderStatus,
  requireAuth,
} from '@gagan-personal/common';
import express, { NextFunction, Request, Response } from 'express';
import { natsWrapper } from '../config/nats-wrapper';
import { OrderCancelledPublisher } from '../events/order-cancelled-publisher';
import { Order } from '../models/order';
const router = express.Router();

router.delete(
  '/api/orders/:id',
  requireAuth,
  (req: Request, res: Response, next: NextFunction) => {
    Order.findById(req.params.id)
      .populate('ticket') // Fetch ticket for each order
      .then((order) => {
        if (!order) throw new NotFoundError();
        if (order.userId !== req.currentUser!.id)
          throw new NotAuthorizedError();

        order.status = OrderStatus.Cancelled;
        order
          .save()
          .then((updatedOrder) => {
            new OrderCancelledPublisher(natsWrapper.client).publish({
              id: order.id,
              version: order.version,
              ticket: {
                id: order.ticket.id,
              },
            });
            return res.status(204).send(updatedOrder);
          })
          .catch((error) => next(error));
      })
      .catch((error) => next(error));
  }
);

export { router as deleteOrderRouter };

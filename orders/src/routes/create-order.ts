/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-12-04 18:13:32
 * @modify date 2020-12-04 18:13:32
 * @desc Create Order routes
 */
import {
  BadRequestError,
  NotFoundError,
  OrderStatus,
  requireAuth,
  validateRequest,
} from '@gagan-personal/common';
import express, { NextFunction, Request, Response } from 'express';
import { natsWrapper } from '../config/nats-wrapper';
import { OrderCreatedPublisher } from '../events/order-created-publisher';
import { Order } from '../models/order';
import { Ticket } from '../models/ticket';
import { createOrderValidator } from '../validators/create-order';
const router = express.Router();
const EXPIRATION_WINDOW_MINUTE = 15 * 60; // 15min

router.post(
  '/api/orders',
  requireAuth,
  createOrderValidator,
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const { ticketId } = req.body;
    Ticket.findById(ticketId)
      .then(async (ticket) => {
        if (!ticket) throw new NotFoundError();

        // Find ticket user has already purchased
        // Run queryy to look at all orders associte with this icket and order status is !cncalled
        // Make sure ticket is not already reserved
        const isReserved = await ticket.isReserved();
        if (isReserved) throw new BadRequestError('Ticket is already reserved');

        // Calculate an expiration date
        const expiration = new Date();
        expiration.setSeconds(
          expiration.getSeconds() + EXPIRATION_WINDOW_MINUTE
        );

        // Build order and ave to database
        Order.build({
          userId: req.currentUser!.id,
          expiresAt: expiration,
          status: OrderStatus.Created,
          ticket: ticket,
        })
          .save()
          .then((createdOrder) => {
            // Publish an Order Creatd event
            new OrderCreatedPublisher(natsWrapper.client).publish({
              id: createdOrder.id,
              expiresAt: createdOrder.expiresAt.toISOString(),
              status: createdOrder.status,
              userId: createdOrder.userId,
              ticket: {
                id: ticket.id,
                price: ticket.price,
              },
            });
            return res.status(201).send(createdOrder);
          })
          .catch((error) => next(error));
      })
      .catch((error) => next(error));
  }
);

export { router as createOrderRouter };

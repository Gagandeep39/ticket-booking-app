/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-10-25 20:21:50
 * @modify date 2020-10-25 20:21:50
 * @desc Update Tickets
 */
import {
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
  validateRequest,
} from '@gagan-personal/common';
import express, { NextFunction, Request, Response } from 'express';
import { natsWrapper } from '../config/nats-wrapper';
import { TicketUpdatedPublisher } from '../events/publishers/ticket-updated-publisher';
import { Ticket } from '../models/tickets';
import { createTicketsValidator } from '../validators/create-tickets';
const router = express.Router();

router.put(
  '/api/tickets/:id',
  requireAuth,
  createTicketsValidator,
  validateRequest,
  (req: Request, res: Response, next: NextFunction) => {
    const { title, price } = req.body;

    Ticket.findById(req.params.id)
      .then((existingTicket) => {
        if (!existingTicket) throw new NotFoundError();
        if (existingTicket.userId !== req.currentUser?.id)
          throw new NotAuthorizedError();

        existingTicket
          .set({ title, price })
          .save()
          .then((updatedTicket) => {
            new TicketUpdatedPublisher(natsWrapper.client).publish({
              id: updatedTicket.id,
              price: updatedTicket.price,
              title: updatedTicket.title,
              userId: updatedTicket.userId,
            });
            res.send(updatedTicket);
          })
          .catch((error) => next(error));
      })
      .catch((error) => next(error));
  }
);

export { router as updateTicketRouter };

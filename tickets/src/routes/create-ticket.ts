/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-10-25 12:02:21
 * @modify date 2020-10-25 12:02:21
 * @desc Create ticket routes
 */
import { requireAuth, validateRequest } from '@gagan-personal/common';
import express, { NextFunction, Request, Response } from 'express';
import { natsWrapper } from '../config/nats-wrapper';
import { TicketCreatedPublisher } from '../events/publishers/ticket-created-publisher';
import { Ticket } from '../models/tickets';
import { createTicketsValidator } from '../validators/create-tickets';
const router = express.Router();

router.post(
  '/api/tickets',
  requireAuth,
  createTicketsValidator,
  validateRequest,
  (req: Request, res: Response, next: NextFunction) => {
    const { title, price } = req.body;
    // '!' because we know for sure user is logged in using 'requiredAuth'
    Ticket.build({
      title,
      price,
      userId: req.currentUser!.id,
    })
      .save()
      .then((newTicket) => {
        new TicketCreatedPublisher(natsWrapper.client).publish({
          id: newTicket.id,
          price: newTicket.price,
          title: newTicket.title,
          userId: newTicket.userId,
          version: newTicket.version,
        });
        res.status(201).send(newTicket);
      })
      .catch((error) => next(error));
  }
);

export { router as createTicketRouter };

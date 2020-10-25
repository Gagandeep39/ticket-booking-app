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

        Ticket.findByIdAndUpdate(req.params.id, { title, price })
          .then((updatedTicket) => res.send(updatedTicket))
          .catch((error) => next(error));
      })
      .catch((error) => next(error));
  }
);

export { router as updateTicketRouter };

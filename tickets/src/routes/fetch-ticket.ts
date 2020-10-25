/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-10-25 17:15:40
 * @modify date 2020-10-25 17:15:40
 * @desc Route to fetch Tickets
 */

import {
  NotFoundError,
  requireAuth,
  validateRequest,
} from '@gagan-personal/common';
import express, { NextFunction, Request, response, Response } from 'express';
import { Ticket } from '../models/tickets';
import { createTicketsValidator } from '../validators/create-tickets';
const router = express.Router();

router.post(
  '/api/tickets',
  requireAuth,
  createTicketsValidator,
  validateRequest,
  (req: Request, res: Response, next: NextFunction) => {
    Ticket.findById(req.body.id).then((ticket) => {
      if (!ticket) throw new NotFoundError();
      res.send(ticket);
    });
  }
);

export { router as fetchTicketRouter };

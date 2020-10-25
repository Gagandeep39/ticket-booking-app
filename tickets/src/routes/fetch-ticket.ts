/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-10-25 17:15:40
 * @modify date 2020-10-25 17:15:40
 * @desc Route to fetch Tickets
 */

import { NotFoundError } from '@gagan-personal/common';
import express, { NextFunction, Request, Response } from 'express';
import { Ticket } from '../models/tickets';
const router = express.Router();

router.get(
  '/api/tickets/:id',
  (req: Request, res: Response, next: NextFunction) => {
    Ticket.findById(req.params.id)
      .then((ticket) => {
        if (!ticket) throw new NotFoundError();
        res.send(ticket);
      })
      .catch((error) => next(error));
  }
);

export { router as fetchTicketRouter };

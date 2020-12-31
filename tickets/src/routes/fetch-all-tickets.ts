/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-10-25 18:31:27
 * @modify date 2020-10-25 18:31:27
 * @desc Fetch All tickets
 */
import { requireAuth } from '@gagan-personal/common';
import express, { NextFunction, Request, Response } from 'express';
import { Ticket } from '../models/tickets';
const router = express.Router();

router.get(
  '/api/tickets',
  requireAuth,
  (req: Request, res: Response, next: NextFunction) => {
    Ticket.find({
      orderId: undefined,
    })
      .then((tickets) => res.send(tickets))
      .catch((error) => next(error));
  }
);

export { router as fetchAllTicketsRouter };

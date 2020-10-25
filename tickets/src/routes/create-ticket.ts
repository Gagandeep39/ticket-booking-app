/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-10-25 12:02:21
 * @modify date 2020-10-25 12:02:21
 * @desc Create ticket routes
 */
import { requireAuth, validateRequest } from '@gagan-personal/common';
import express, { NextFunction, Request, Response } from 'express';
import { createTicketsValidator } from '../validators/create-tickets';
const router = express.Router();

router.post(
  '/api/tickets',
  requireAuth,
  createTicketsValidator,
  validateRequest,
  (req: Request, res: Response, next: NextFunction) => {

    res.set({ msg: 'Response from POST /api/tickets' });
  }
);

export { router as createTicketRouter };

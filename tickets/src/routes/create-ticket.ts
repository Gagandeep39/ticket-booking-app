/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-10-25 12:02:21
 * @modify date 2020-10-25 12:02:21
 * @desc Create ticket routes
 */
import { requireAuth } from '@gagan-personal/common';
import express, { NextFunction, Request, Response } from 'express';
const router = express.Router();

router.post(
  '/api/tickets',
  requireAuth,
  (req: Request, res: Response, next: NextFunction) => {
    res.set({ msg: 'Response from POST /api/tickets' });
  }
);

export { router as createTicketRouter };

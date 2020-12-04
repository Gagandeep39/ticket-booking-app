/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-12-04 18:13:32
 * @modify date 2020-12-04 18:13:32
 * @desc Create Order routes
 */
import { requireAuth, validateRequest } from '@gagan-personal/common';
import express, { NextFunction, Request, Response } from 'express';
const router = express.Router();

router.post(
  '/api/orders',
  requireAuth,
  validateRequest,
  (req: Request, res: Response, next: NextFunction) => {}
);

export { router as createOrderRouter };

/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-12-04 18:13:32
 * @modify date 2020-12-04 18:13:32
 * @desc Route to fetch a single order
 */
import express, { NextFunction, Request, Response } from 'express';
const router = express.Router();

router.get(
  '/api/tickets/:id',
  (req: Request, res: Response, next: NextFunction) => {}
);

export { router as fetchOrderRouter };

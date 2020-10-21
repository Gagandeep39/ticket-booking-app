/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-10-21 12:32:35
 * @modify date 2020-10-21 12:32:35
 * @desc Manage Registration routes
 */
import express, { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-error';
import { signUpValidator } from '../validators/sign-up';
const router = express.Router();

router.post(
  '/api/users/signup',
  signUpValidator,
  (req: Request, res: Response): any => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) throw new RequestValidationError(errors.array());

    const { email, password } = req.body;
    res.send('Created User');
  }
);

export { router as signUpRouter };

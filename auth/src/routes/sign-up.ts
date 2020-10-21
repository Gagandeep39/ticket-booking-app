/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-10-21 12:32:35
 * @modify date 2020-10-21 12:32:35
 * @desc Manage Registration routes
 */
import express, { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import { BadRequestError } from '../errors/bad-request-error';
import { RequestValidationError } from '../errors/request-validation-error';
import { User } from '../models/user';
import { signUpValidator } from '../validators/sign-up';
const jwtSecret = process.env.JWT_KEY || '';
const router = express.Router();

router.post(
  '/api/users/signup',
  signUpValidator,
  (req: Request, res: Response, next: NextFunction): any => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) throw new RequestValidationError(errors.array());

    const { email, password } = req.body;
    User
      .findOne({ email })
      .then((existingUser) => {
        if (existingUser) throw new BadRequestError('Email is already taken');

        User.build({ email, password })
          .save()
          .then((newUser) => {
            // Generate JWT
            const userJwt = jwt.sign(
              {
                id: newUser.id,
                email: newUser.email,
              },
              jwtSecret
            );
            // Store it in session Object
            // req.session.jwt = userJwt; // Gives error in TS
            req.session = {
              jwt: userJwt,
            };

            return res.status(201).send(newUser);
          })
          .catch((error) => next(error));
      })
      .catch((error) => next(error));
  }
);

export { router as signUpRouter };

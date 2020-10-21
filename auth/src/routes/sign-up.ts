/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-10-21 12:32:35
 * @modify date 2020-10-21 12:32:35
 * @desc Manage Registration routes
 */
import express, { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { BadRequestError } from '../errors/bad-request-error';
import { User } from '../models/user';
import { signUpValidator } from '../validators/sign-up';
import { validateRequest } from '../middlewares/validate-request';
const router = express.Router();

router.post(
  '/api/users/signup',
  signUpValidator,
  validateRequest,
  (req: Request, res: Response, next: NextFunction): any => {
    const { email, password } = req.body;
    User
      .findOne({ email })
      .then((existingUser) => {
        if (existingUser) throw new BadRequestError('Email is already taken');

        User.build({ email, password })
          .save()
          .then((newUser) => {
            // Generate JWT
            if(!process.env.JWT_KEY) throw Error('JWT Secret key Not found');
            const userJwt = jwt.sign(
              {
                id: newUser.id,
                email: newUser.email,
              },
              process.env.JWT_KEY
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

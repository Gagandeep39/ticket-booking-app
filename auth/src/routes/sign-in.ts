/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-10-21 12:32:30
 * @modify date 2020-10-21 12:32:30
 * @desc Manage Signin routes
 */
import express, { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { BadRequestError } from '@gagan-personal/common';
import { validateRequest } from '@gagan-personal/common';
import { User } from '../models/user';
import { Password } from '../service/password';
import { signInValidator } from '../validators/sign-in';
const router = express.Router();

router.post(
  '/api/users/signin',
  signInValidator,
  validateRequest,
  (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    User.findOne({ email })
      .then((existingUser) => {
        if (!existingUser) throw new BadRequestError('Invalid Credentials');

        Password.compare(existingUser.password, password)
          .then((result) => {
            if (!result) throw new BadRequestError('Invalid Credentials');
            // Generate JWT
            if (!process.env.JWT_KEY) throw Error('JWT Secret key Not found');
            const userJwt = jwt.sign(
              {
                id: existingUser.id,
                email: existingUser.email,
              },
              process.env.JWT_KEY
            );
            // Store it in session Object
            // req.session.jwt = userJwt; // Gives error in TS
            req.session = {
              jwt: userJwt,
            };

            return res.status(200).send(existingUser);
          })
          .catch((error) => next(error));
      })
      .catch((error) => next(error));
  }
);

export { router as signInRouter };

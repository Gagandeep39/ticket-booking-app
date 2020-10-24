/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-10-24 14:50:14
 * @modify date 2020-10-24 14:50:14
 * @desc Ckecks if user is logged in, if yes then userData is fecthed from JWT
 */
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
  id: string;
  email: string;
}

/**
 * Typescript is very strict with its types
 * To enable modifying currentUser in request,
 * We need to specify there is such a type in it
 */
declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Move forward if user not logged in
  if (!req.session?.jwt) return next();

  if (!process.env.JWT_KEY) throw new Error('JWT Secret key Not found');

  // If user logged in then store userdata in request
  const payload = jwt.verify(
    req.session.jwt,
    process.env.JWT_KEY
  ) as UserPayload;
  // Wornt work as express request doesn't have a property currentUser
  // To fix theis we will have to add this prperty to express
  req.currentUser = payload;
  next();
};

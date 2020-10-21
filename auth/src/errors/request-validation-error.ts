/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-10-21 13:54:15
 * @modify date 2020-10-21 13:54:15
 * @desc ValidationError Object - Express validators error will be thrown as  throw new RequestValidationError(errors)
 */
import { ValidationError } from 'express-validator';
export class RequestValidationError extends Error {
  reason = 'Error connecting to database';

  constructor(private errors: ValidationError[]) {
    super();

    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }
}

/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-10-21 13:58:32
 * @modify date 2020-10-21 13:58:32
 * @desc Database error model
 */
import { ValidationError } from 'express-validator';
export class DatabaseConnectionError extends Error {
  constructor(private errors: ValidationError[]) {
    super();

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }
}

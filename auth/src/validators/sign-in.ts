/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-10-22 01:20:23
 * @modify date 2020-10-22 01:20:23
 * @desc Sign In Validation
 */
import { body } from 'express-validator';

export const signInValidator = [
  body('email')
    .isEmail()
    .withMessage('Enter a valid email'),
  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password Required'),
];

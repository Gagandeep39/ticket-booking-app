/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-10-21 12:46:16
 * @modify date 2020-10-21 12:46:16
 * @desc Sign Up validations
 */
import { body } from 'express-validator';

export const signUpValidator = [
  body('email').isEmail().withMessage('Enter a valid email'),
  body('password')
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage('Length must be between 4 and 20'),
];

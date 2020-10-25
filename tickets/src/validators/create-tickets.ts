/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-10-25 16:24:58
 * @modify date 2020-10-25 16:24:58
 * @desc Perform Tickets Validation
 */
import { body } from 'express-validator';

export const createTicketsValidator = [
  body('title')
    .not()
    .isEmpty()
    .withMessage('Title Cannot be empty'),
  body('price')
    .not()
    .isEmpty()
    .withMessage('Price cannot be Empty')
    .isFloat({gt: 0})
    .withMessage('Price must be greater than 0')
];

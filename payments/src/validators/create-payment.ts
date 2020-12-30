/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-12-30 12:37:14
 * @modify date 2020-12-30 12:37:14
 * @desc [description]
 */
import { body } from 'express-validator';

export const createPaymentsValidator = [
  body('token').not().isEmpty().withMessage('Token Cannot be empty'),
  body('orderId').not().isEmpty().withMessage('Order cannot be Empty'),
];

/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-12-04 18:20:40
 * @modify date 2020-12-04 18:20:40
 * @desc Create order validator
 */
import { body } from 'express-validator';
import mongoose from 'mongoose';

export const createOrderValidator = [
  body('ticketId')
    .not()
    .isEmpty()
    .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
    .withMessage('TicketId must be provided'),
];

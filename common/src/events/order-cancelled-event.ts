/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-12-07 18:49:51
 * @modify date 2020-12-07 18:49:51
 * @desc Emitted when Order is cancelled
 * Ticket service can unsreserve ticket if order is cancelled,
 * Allowing others to purchase
 * Ensures Payment is rejected by payment service
 */
import { Subject } from '../models/subject';

export interface OrderCancelledEvent {
  subject: Subject.OrderCancelled;
  data: {
    id: string;
    version: number;
    ticket: {
      id: string;
    };
  };
}

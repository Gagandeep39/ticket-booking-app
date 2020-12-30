/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-12-30 22:21:12
 * @modify date 2020-12-30 22:21:12
 * @desc Event emitted when payment is  performed
 */
import { Subject } from '../models/subject';

export interface PaymentCreatedEvent {
  subject: Subject.PaymentCreated;
  data: {
    id: string;
    orderId: string;
    stripeId: string;
  };
}

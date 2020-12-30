/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-12-30 22:25:06
 * @modify date 2020-12-30 22:25:06
 * @desc Event published when payment is created
 */
import {
  CustomPublisher,
  PaymentCreatedEvent,
  Subject,
} from '@gagan-personal/common';

export class PaymentCreatedPublisher extends CustomPublisher<PaymentCreatedEvent> {
  subject: Subject.PaymentCreated = Subject.PaymentCreated;
}

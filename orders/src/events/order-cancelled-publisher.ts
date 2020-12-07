/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-12-07 19:03:40
 * @modify date 2020-12-07 19:03:40
 * @desc Publish event when order is cancelled
 */
import {
  CustomPublisher,
  OrderCancelledEvent,
  Subject,
} from '@gagan-personal/common';
export class OrderCancelledPublisher extends CustomPublisher<OrderCancelledEvent> {
  subject: Subject.OrderCancelled = Subject.OrderCancelled;
}

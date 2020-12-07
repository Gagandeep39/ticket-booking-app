/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-12-07 19:03:51
 * @modify date 2020-12-07 19:03:51
 * @desc Publish event on order creation
 */
import {
  CustomPublisher,
  OrderCreatedEvent,
  Subject,
} from '@gagan-personal/common';

export class OrderCreatedPublisher extends CustomPublisher<OrderCreatedEvent> {
  subject: Subject.OrderCreated = Subject.OrderCreated;
}

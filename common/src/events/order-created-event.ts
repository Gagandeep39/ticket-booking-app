/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-12-07 18:50:06
 * @modify date 2020-12-07 18:50:06
 * @desc Emitted when Order is created
 */
import { OrderStatus } from '../models/order-status';
import { Subject } from '../models/subject';

export interface OrderCreatedEvent {
  subject: Subject.OrderCreated;
  data: {
    id: string;
    status: OrderStatus;
    userId: string;
    version: number;
    // To prevent conversion from date to string repetedly as it will be sent through json
    expiresAt: string;
    ticket: {
      id: string;
      price: number;
    };
  };
}

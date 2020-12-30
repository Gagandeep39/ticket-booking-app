/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-12-30 22:39:34
 * @modify date 2020-12-30 22:39:34
 * @desc Listens to payment created event
 */

import {
  CustomListener,
  NotFoundError,
  OrderStatus,
  PaymentCreatedEvent,
  Subject,
} from '@gagan-personal/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from '../constants/queue-groups';
import { Order } from '../models/order';

export class PaymentCreatedListener extends CustomListener<PaymentCreatedEvent> {
  subject: Subject.PaymentCreated = Subject.PaymentCreated;
  queueGroupName: string = queueGroupName;

  async onMessage(data: PaymentCreatedEvent['data'], msg: Message) {
    const order = await Order.findById(data.orderId);
    if (!order) throw new NotFoundError();
    await order.set({ status: OrderStatus.Complete }).save();
    msg.ack();
  }
}

/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-12-30 11:24:08
 * @modify date 2020-12-30 11:24:08
 * @desc [description]
 */

import {
  CustomListener,
  NotFoundError,
  OrderCancelledEvent,
  OrderStatus,
  Subject,
} from '@gagan-personal/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from '../../constants/queue-groups';
import { Order } from '../../models/order';
export class OrderCancelledListener extends CustomListener<OrderCancelledEvent> {
  subject: Subject.OrderCancelled = Subject.OrderCancelled;
  queueGroupName: string = queueGroupName;

  async onMessage(data: OrderCancelledEvent['data'], msg: Message) {
    const order = await Order.findOne({
      _id: data.id,
      version: data.version - 1,
    });

    if (!order) throw new NotFoundError();

    await order.set({ status: OrderStatus.Cancelled }).save();
    msg.ack();
  }
}

/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-12-30 11:01:53
 * @modify date 2020-12-30 11:01:53
 * @desc [description]
 */
import {
  CustomListener,
  OrderCreatedEvent,
  Subject,
} from '@gagan-personal/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from '../../constants/queue-groups';
import { Order } from '../../models/order';

export class OrderCreatedListener extends CustomListener<OrderCreatedEvent> {
  subject: Subject.OrderCreated = Subject.OrderCreated;
  queueGroupName: string = queueGroupName;

  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    const order = await Order.build({
      id: data.id,
      price: data.ticket.price,
      status: data.status,
      userId: data.userId,
      version: data.version,
    }).save();

    msg.ack();
  }
}

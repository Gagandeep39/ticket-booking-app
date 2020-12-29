/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-12-29 13:00:29
 * @modify date 2020-12-29 13:00:29
 * @desc Listens to expiration complete evemt
 */
import {
  ExpirationCompleteEvent,
  OrderStatus,
  Subject,
} from '@gagan-personal/common';
import { CustomListener } from '@gagan-personal/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from '../constants/queue-groups';
import { Order } from '../models/order';
import { OrderCancelledPublisher } from './order-cancelled-publisher';

export class ExpirationCompleteListener extends CustomListener<ExpirationCompleteEvent> {
  subject: Subject.ExpirationComplete = Subject.ExpirationComplete;
  queueGroupName: string = queueGroupName;

  async onMessage(data: ExpirationCompleteEvent['data'], msg: Message) {
    const order = await Order.findById(data.orderId).populate('ticket');

    if (!order) throw new Error('Order not found');

    await order.set({ status: OrderStatus.Cancelled }).save();

    new OrderCancelledPublisher(this.client).publish({
      id: order.id,
      version: order.version,
      ticket: {
        id: order.ticket.id,
      },
    });

    msg.ack();
  }
}

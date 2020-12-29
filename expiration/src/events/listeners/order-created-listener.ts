/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-12-29 10:52:59
 * @modify date 2020-12-29 10:52:59
 * @desc [description]
 */
import {
  CustomListener,
  OrderCreatedEvent,
  Subject,
} from '@gagan-personal/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from '../../constants/queue-group-names';
import { expirationQueue } from '../../queues/expiration-queue';

export class OrderCreatedListener extends CustomListener<OrderCreatedEvent> {
  subject: Subject.OrderCreated = Subject.OrderCreated;
  queueGroupName: string = queueGroupName;

  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    const delay = new Date(data.expiresAt).getTime() - new Date().getTime();
    console.log('Waiting duration for processing the job: ', delay);

    await expirationQueue.add({ orderId: data.id }, { delay });
    msg.ack();
  }
}

/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-12-28 10:42:25
 * @modify date 2020-12-28 10:42:25
 * @desc [description]
 */

import {
  CustomListener,
  Subject,
  TicketUpdatedEvent,
} from '@gagan-personal/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from '../constants/queue-groups';
import { Ticket } from '../models/ticket';

export class TicketUpdatedListener extends CustomListener<TicketUpdatedEvent> {
  subject: Subject.TicketUpdated = Subject.TicketUpdated;
  queueGroupName: string = queueGroupName;
  async onMessage(data: TicketUpdatedEvent['data'], msg: Message) {
    const { title, price } = data;

    const ticket = await Ticket.findByEvent(data);

    if (!ticket) throw new Error('Ticket not found');
    await ticket.set({ title, price }).save();
    msg.ack();
  }
}

/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-12-28 10:27:16
 * @modify date 2020-12-28 10:27:16
 * @desc [description]
 */
import {
  CustomListener,
  Subject,
  TicketCreatedEvent,
} from '@gagan-personal/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from '../constants/queue-groups';
import { Ticket } from '../models/ticket';

export class TicketCreatedListener extends CustomListener<TicketCreatedEvent> {
  subject: Subject.TicketCreated = Subject.TicketCreated;
  queueGroupName: string = queueGroupName;

  async onMessage(data: TicketCreatedEvent['data'], msg: Message) {
    const { id, title, price } = data;
    await Ticket.build({ id, title, price }).save();

    // Streaming service gets an acknowledgement
    msg.ack();
  }
}

/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-12-03 18:04:57
 * @modify date 2020-12-03 18:04:57
 * @desc Ticket Created Listener
 */
import { Message } from 'node-nats-streaming';
import { Subject } from '../models/subject';
import { TicketCreatedEvent } from '../models/ticket-created-event';
import { CustomListener } from './custom-listener';

export class TicketCreatedListener extends CustomListener<TicketCreatedEvent> {
  subject: Subject.TicketCreated = Subject.TicketCreated;
  queueGroupName: string = 'payment-service';

  onMessage(parsedData: TicketCreatedEvent['data'], msg: Message): void {
    console.log('Event data: ', parsedData);
    msg.ack();
  }
}

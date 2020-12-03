/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-12-03 18:04:57
 * @modify date 2020-12-03 18:04:57
 * @desc Ticket Created Listener
 */
import { Message } from 'node-nats-streaming';
import { Listener } from './custom-listener';

export class TicketCreatedListener extends Listener {
  subject: string = 'ticket:created';
  queueGroupName: string = 'payment-service';
  onMessage(parsedData: any, msg: Message): void {
    console.log('Event data: ', parsedData);
    msg.ack();
  }
}

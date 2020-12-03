/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-12-03 19:09:46
 * @modify date 2020-12-03 19:09:46
 * @desc Ticket created publisher
 */
import { Subject } from '../models/subject';
import { TicketCreatedEvent } from '../models/ticket-created-event';
import { CustomPublisher } from './custom-publisher';

export class TicketCreatedPublisher extends CustomPublisher<TicketCreatedEvent> {
  subject: Subject.TicketCreated = Subject.TicketCreated;
}

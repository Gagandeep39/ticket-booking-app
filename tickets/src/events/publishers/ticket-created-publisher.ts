/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-12-04 11:00:57
 * @modify date 2020-12-04 11:00:57
 * @desc Event to be published when ticket is created
 */
import {
  CustomPublisher,
  Subject,
  TicketCreatedEvent,
} from '@gagan-personal/common';

export class TicketCreatedPublisher extends CustomPublisher<TicketCreatedEvent> {
  subject: Subject.TicketCreated = Subject.TicketCreated;
}

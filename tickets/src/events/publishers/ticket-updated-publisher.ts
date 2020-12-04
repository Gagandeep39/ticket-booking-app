/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-12-04 12:40:16
 * @modify date 2020-12-04 12:40:16
 * @desc Event to be published when ticket is updated
 */
import {
  CustomPublisher,
  Subject,
  TicketUpdatedEvent,
} from '@gagan-personal/common';

export class TicketUpdatedPublisher extends CustomPublisher<TicketUpdatedEvent> {
  subject: Subject.TicketUpdated = Subject.TicketUpdated;
}

/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-12-03 18:20:34
 * @modify date 2020-12-03 18:20:34
 * @desc [description]
 */
import { Subject } from './subject';

export interface TicketCreatedEvent {
  subject: Subject.TicketCreated;
  data: {
    id: string;
    title: string;
    price: number;
    userId: string;
  };
}

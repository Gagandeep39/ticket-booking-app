/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-12-29 12:38:06
 * @modify date 2020-12-29 12:38:06
 * @desc Emitted after order completes and expiration service fires the event after a delay
 */
import { Subject } from '../models/subject';

export interface ExpirationCompleteEvent {
  subject: Subject.ExpirationComplete;
  data: {
    orderId: string;
  };
}

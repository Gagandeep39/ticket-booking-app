/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-12-29 12:46:23
 * @modify date 2020-12-29 12:46:23
 * @desc [description]
 */
import {
  CustomPublisher,
  ExpirationCompleteEvent,
  Subject,
} from '@gagan-personal/common';

export class ExpirationCompletePublisher extends CustomPublisher<ExpirationCompleteEvent> {
  subject: Subject.ExpirationComplete = Subject.ExpirationComplete;
}

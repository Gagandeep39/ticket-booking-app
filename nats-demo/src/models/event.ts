import { Subject } from './subject';

/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-12-03 18:24:20
 * @modify date 2020-12-03 18:24:20
 * @desc Model Used to decide model based on subject
 */
export interface Event {
  subject: Subject;
  data: any;
}
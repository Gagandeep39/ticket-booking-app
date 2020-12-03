/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-12-03 19:05:48
 * @modify date 2020-12-03 19:05:48
 * @desc Custom Publisher
 */
import { Stan } from 'node-nats-streaming';
import { Event } from '../models/event';

export abstract class CustomPublisher<T extends Event> {
  abstract subject: T['subject'];
  private client: Stan;

  constructor(client: Stan) {
    this.client = client;
  }

  publish(data: T['data']) {
    this.client.publish(this.subject, JSON.stringify(data), () =>
      console.log(`${this.subject} Event published`)
    );
  }
}

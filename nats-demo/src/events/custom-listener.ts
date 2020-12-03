/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-12-03 18:01:26
 * @modify date 2020-12-03 18:01:26
 * @desc Parent Listener File
 */
import { Stan, Message } from 'node-nats-streaming';
import { Event } from '../models/event';

export abstract class CustomListener<T extends Event> {
  abstract subject: T['subject'];
  abstract queueGroupName: string;
  private client: Stan;
  protected ackWait = 5 * 1000;
  abstract onMessage(parsedData: T['data'], msg: Message): void;

  constructor(client: Stan) {
    this.client = client;
  }

  subscriptionOptions() {
    return this.client
      .subscriptionOptions()
      .setDeliverAllAvailable()
      .setManualAckMode(true)
      .setAckWait(this.ackWait)
      .setDurableName(this.queueGroupName);
  }

  listen() {
    const subscription = this.client.subscribe(
      this.subject,
      this.queueGroupName,
      this.subscriptionOptions()
    );

    subscription.on('message', (msg: Message) => {
      console.log(`Message Recieved: ${this.subject} / ${this.queueGroupName}`);
      const parsedData = this.parseMessage(msg);
      this.onMessage(parsedData, msg);
    });
  }

  parseMessage(msg: Message) {
    const data = msg.getData();
    return typeof data === 'string'
      ? JSON.parse(data)
      : JSON.parse(data.toString('utf-8'));
  }
}

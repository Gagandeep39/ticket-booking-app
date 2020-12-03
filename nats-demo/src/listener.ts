/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-12-03 18:00:16
 * @modify date 2020-12-03 18:00:16
 * @desc Listener event
 */
import nats, { Message, Stan } from 'node-nats-streaming';
import { randomBytes } from 'crypto';
require('dotenv').config();

const stan = nats.connect(
  'ticketing',
  `listener-${randomBytes(4).toString('hex')}`,
  {
    url: `http://${process.env.NATS_URL || 'localhost'}:4222`,
  }
);
stan.on('connect', () => {
  console.log('Listener connected to NATS');

  stan.on('close', () => {
    console.log('Listener Connection Closed');
    process.exit();
  });

  new TicketCreatedListener(stan).listen();
});

// Signals sent when we press Ctrl + C in terminal
// We gracefilly shutdown our nats connection before shutting down clode
// Works wih linux, macos
process.on('SIGINT', () => stan.close());
process.on('SIGTERM', () => stan.close());

abstract class Listener {
  abstract subject: string;
  abstract queueGroupName: string;
  private client: Stan;
  protected ackWait = 5 * 1000;
  abstract onMessage(parsedData: any, msg: Message): void;

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

class TicketCreatedListener extends Listener {
  subject: string = 'ticket:created';
  queueGroupName: string = 'payment-service';
  onMessage(parsedData: any, msg: Message): void {
    console.log('Event data: ', parsedData);
    msg.ack();
  }
}

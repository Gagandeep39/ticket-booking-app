/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-12-03 11:37:07
 * @modify date 2020-12-03 11:37:07
 * @desc Listener event
 */
import nats, { Message } from 'node-nats-streaming';
import { type } from 'os';
require('dotenv').config();

const stan = nats.connect('ticketing', 'client-listener', {
  url: `http://${process.env.NATS_URL || 'localhost'}:4222`,
});
stan.on('connect', () => {
  console.log('Listener connected to NATS');
  const subscription = stan.subscribe('ticket:created');

  subscription.on('message', (msg: Message) => {
    console.log('-------------------');
    console.log('Message recieved.');
    console.log(`Recieved event #${msg.getSubject()}`);
    console.log(`Recieved Data #${msg.getData()}`);
    console.log('-------------------');
  });
});

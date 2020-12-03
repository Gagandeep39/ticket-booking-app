/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-12-03 11:37:07
 * @modify date 2020-12-03 11:37:07
 * @desc Listener event
 */
import nats, { Message } from 'node-nats-streaming';
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
  const options = stan.subscriptionOptions().setManualAckMode(true);

  const subscription = stan.subscribe(
    'ticket:created', // Name of vent to subscribe
    'dummy-queue-group', // pecific group to subscribe, Enables reciving eents of a specific group
    options // Manual Options configuration
  );

  subscription.on('message', (msg: Message) => {
    console.log('-------------------');
    console.log('Message recieved.');
    console.log(`Recieved from #${msg.getSequence()}`);
    console.log(`Recieved event #${msg.getSubject()}`);
    console.log(`Recieved Data #${msg.getData()}`);
    console.log('-------------------');
    // Sends a manual acknowledgement
    msg.ack();
  });
});

/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-12-03 11:37:07
 * @modify date 2020-12-03 11:37:07
 * @desc Listener event
 */
import nats from 'node-nats-streaming';
require('dotenv').config();

const stan = nats.connect('ticketing', 'client-listener', {
  url: `http://${process.env.NATS_URL || 'localhost'}:4222`,
});
stan.on('connect', () => {
  console.log('Listener connected to NATS');
  const subscription = stan.subscribe('ticket:created');

  subscription.on('message', (msg) => console.log('Message recieved.'));
});

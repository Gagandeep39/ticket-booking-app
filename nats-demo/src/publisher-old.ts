/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-12-02 18:40:16
 * @modify date 2020-12-02 18:40:16
 * @desc [description]
 */
import nats from 'node-nats-streaming';
import { randomBytes } from 'crypto';
require('dotenv').config();

const stan = nats.connect(
  'ticketing',
  `publisher-${randomBytes(4).toString('hex')}`,
  {
    url: `http://${process.env.NATS_URL || 'localhost'}:4222`,
  }
);
stan.on('connect', () => {
  console.log('Publisher connected to NATS');

  stan.on('close', () => {
    console.log('Listener Connection Closed');
    process.exit();
  })

  const data = JSON.stringify({
    id: '123',
    title: 'concert',
    price: 20,
  });

  stan.publish('ticket:created', data, () =>
    console.log('Ticket Created: Event Published')
  );
});

// Signals sent when we press Ctrl + C in terminal
// We gracefilly shutdown our nats connection before shutting down clode
// Works wih linux, macos
process.on('SIGINT', () => stan.close());
process.on('SIGTERM', () => stan.close());

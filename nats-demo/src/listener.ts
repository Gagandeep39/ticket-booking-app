/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-12-03 18:00:16
 * @modify date 2020-12-03 18:00:16
 * @desc Listener event
 */
import nats from 'node-nats-streaming';
import { randomBytes } from 'crypto';
import { TicketCreatedListener } from './events/ticket-created-listener';
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

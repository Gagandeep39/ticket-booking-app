/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-12-02 18:40:16
 * @modify date 2020-12-02 18:40:16
 * @desc [description]
 */
import nats from 'node-nats-streaming';
require('dotenv').config();

const stan = nats.connect('ticketing', 'abc', {
  url: `http://${process.env.NATS_URL || 'localhost'}:4222`,
});
stan.on('connect', () => {
  console.log('Publisher connected to NATS');
  const data = JSON.stringify({
    id: '123',
    title: 'concert',
    price: 20,
  });

  stan.publish('ticket:created', data, () =>
    console.log('Ticket Created: Event Published')
  );
});

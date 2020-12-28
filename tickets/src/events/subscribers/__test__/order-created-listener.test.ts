import { OrderCreatedEvent, OrderStatus } from '@gagan-personal/common';
import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';
import { natsWrapper } from '../../../config/nats-wrapper';
import { Ticket } from '../../../models/tickets';
import { OrderCreatedListener } from '../order-created-listener';

/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-12-28 18:57:46
 * @modify date 2020-12-28 18:57:46
 * @desc [description]
 */
const setup = async () => {
  // Create listener
  const listener = new OrderCreatedListener(natsWrapper.client);
  // Create and save ticket
  const ticket = await Ticket.build({
    title: 'Dummy',
    price: 99,
    userId: mongoose.Types.ObjectId().toHexString(),
  }).save();
  // Create fake event
  const data: OrderCreatedEvent['data'] = {
    id: mongoose.Types.ObjectId().toHexString(),
    status: OrderStatus.Created,
    userId: mongoose.Types.ObjectId().toHexString(),
    version: 0,
    expiresAt: 'asas',
    ticket: {
      id: ticket.id,
      price: ticket.price,
    },
  };
  // Fake message
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, ticket, data, msg };
};

it('Sets userid of ticket', async () => {
  const { listener, ticket, data, msg } = await setup();

  await listener.onMessage(data, msg);

  const updatedTicket = await Ticket.findById(ticket.id);

  expect(updatedTicket?.orderId).toEqual(data.id);
});

it('Ack the mesage', async () => {
  const { listener, ticket, data, msg } = await setup();
  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});

it('Publishes Update ticket event', async () => {
  const { listener, ticket, data, msg } = await setup();
  await listener.onMessage(data, msg);
  expect(natsWrapper.client.publish).toHaveBeenCalled();
  // @ts-ignore
  // console.log(natsWrapper.client.publish.mock.calls[0][1]);
  // Or
  // console.log((natsWrapper.client.publish as jest.Mock).mock.calls[0][1]);

  const ticketupdatedData = JSON.parse(
    (natsWrapper.client.publish as jest.Mock).mock.calls[0][1]
  );

  expect(data.id).toEqual(ticketupdatedData.orderId);
});

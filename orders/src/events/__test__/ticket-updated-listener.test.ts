import { TicketUpdatedEvent } from '@gagan-personal/common';
import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';
import { natsWrapper } from '../../config/nats-wrapper';
import { Ticket } from '../../models/ticket';
import { TicketUpdatedListener } from '../ticket-updated-listener';

const setup = async () => {
  // Create listener
  const listener = new TicketUpdatedListener(natsWrapper.client);
  // Create and save ticket
  const ticket = await Ticket.build({
    id: mongoose.Types.ObjectId().toHexString(),
    title: 'Concert',
    price: 99,
  }).save();
  // Create fake data object
  const data: TicketUpdatedEvent['data'] = {
    id: ticket.id,
    version: ticket.version + 1,
    title: 'new concert',
    price: 999,
    userId: mongoose.Types.ObjectId().toHexString(),
  };
  // Create fake message
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };
  // Return all stufs
  return { msg, data, ticket, listener };
};

it('find update and save ticket', async () => {
  const { msg, data, ticket, listener } = await setup();
  // Call onmessage function
  await listener.onMessage(data, msg);

  const updatedTicket = await Ticket.findById(ticket.id);

  expect(updatedTicket?.title).toEqual(data.title);
  expect(updatedTicket?.price).toEqual(data.price);
  expect(updatedTicket?.version).toEqual(data.version);
});

it('Acks the message', async () => {
  const { msg, data, listener } = await setup();
  // Call onmessage function
  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});

it('Doesnt call ack if version has a future version', async () => {
  const { msg, data, ticket, listener } = await setup();
  data.version = 999;
  try {
    // Call onmessage function
    await listener.onMessage(data, msg);
  } catch (error) {}

  expect(msg.ack).not.toHaveBeenCalled();
});

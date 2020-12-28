import { TicketUpdatedEvent } from '@gagan-personal/common';
import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';
import { natsWrapper } from '../../config/nats-wrapper';
import { Ticket } from '../../models/ticket';
import { TicketCreatedListener } from '../ticket-created-listener';

const setup = async () => {
  // Created listener nstance
  const listener = new TicketCreatedListener(natsWrapper.client);
  // Create fake data event
  const data: TicketUpdatedEvent['data'] = {
    version: 0,
    id: new mongoose.Types.ObjectId().toHexString(),
    price: 10,
    title: 'Action',
    userId: new mongoose.Types.ObjectId().toHexString(),
  };
  // Create fake message object
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { data, listener, msg };
};

it('Create and save ticket', async () => {
  const { data, listener, msg } = await setup();
  // Call onmessage function
  await listener.onMessage(data, msg);
  const ticket = await Ticket.findById(data.id);
  // Write assertions
  expect(ticket).toBeDefined();
  expect(ticket?.title).toEqual(data.title);
  expect(ticket?.price).toEqual(data.price);
});

it('Acknowledges the message', async () => {
  const { data, listener, msg } = await setup();
  // Call onmessage function
  await listener.onMessage(data, msg);
  // Write assertion to make sure
  expect(msg.ack).toHaveBeenCalled();
});

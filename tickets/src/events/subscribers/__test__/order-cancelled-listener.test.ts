/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-12-28 19:58:44
 * @modify date 2020-12-28 19:58:44
 * @desc [description]
 */

import { natsWrapper } from '../../../config/nats-wrapper';
import { OrderCancelledListener } from '../order-cancelled-listener';
import mongoose from 'mongoose';
import { Ticket } from '../../../models/tickets';
import { OrderCancelledEvent } from '@gagan-personal/common';

const setup = async () => {
  // Create listener
  const listener = new OrderCancelledListener(natsWrapper.client);

  // Fake object
  const orderId = mongoose.Types.ObjectId().toHexString();
  const ticket = await Ticket.build({
    title: 'Dummy',
    price: 99,
    userId: mongoose.Types.ObjectId().toHexString(),
  })
    .set({ orderId }) // Order ID cannot be added on buil method hence, its performed later
    .save();

  // Fake data
  const data: OrderCancelledEvent['data'] = {
    id: orderId,
    ticket: {
      id: ticket.id,
    },
    version: 0,
  };
  // Fake message
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, ticket, data, msg, orderId };
};

it('Update ticket, publish event, Ack the message', async () => {
  const { listener, ticket, data, msg, orderId } = await setup();

  await listener.onMessage(data, msg);

  const updatedTicket = await Ticket.findById(data.id);
  expect(updatedTicket?.orderId).not.toBeDefined();
  expect(msg.ack).toHaveBeenCalled();
  expect(natsWrapper.client.publish).toHaveBeenCalled();
});

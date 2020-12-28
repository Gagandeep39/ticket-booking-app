/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-12-28 18:40:12
 * @modify date 2020-12-28 18:40:12
 * @desc [description]
 */
import {
  CustomListener,
  OrderCreatedEvent,
  OrderStatus,
  Subject,
} from '@gagan-personal/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from '../../constants/queue-groups';
import { Ticket } from '../../models/tickets';

export class OrderCreatedListener extends CustomListener<OrderCreatedEvent> {
  subject: Subject.OrderCreated = Subject.OrderCreated;
  queueGroupName: string = queueGroupName;

  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    // Find the ticket order is reserving
    const ticket = await Ticket.findById(data.ticket.id);
    // If not then throw error
    if (!ticket) throw new Error('Ticket not found');

    // Maark ticket as being reserved by setting its orderId property
    ticket.set({ orderId: data.id });
    // Save ticket
    await ticket.save();
    // Ack the message
    msg.ack();
  }
}

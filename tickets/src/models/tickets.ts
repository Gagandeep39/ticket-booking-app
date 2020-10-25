/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-10-25 16:40:48
 * @modify date 2020-10-25 16:40:48
 * @desc Tickets model
 */
import mongoose from 'mongoose';

/**
 * MOdel to create ticket
 */
interface TicketAttrs {
  title: string;
  price: number;
  userId: string;
}

/**
 * Model to store Ticket
 */
interface TicketDoc extends mongoose.Document {
  title: string;
  price: number;
  userId: string;
}

/**
 * Properties tied to a model
 * Bascally used to implement builder pattern
 */
interface TicketModel extends mongoose.Model<TicketDoc> {
  build(attrs: TicketAttrs): TicketDoc;
}

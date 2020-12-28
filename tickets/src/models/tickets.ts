/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-10-25 16:40:48
 * @modify date 2020-10-25 16:40:48
 * @desc Tickets model
 */
import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

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
  version: number;
  orderId?: string; // Optional
}

/**
 * Properties tied to a model
 * Bascally used to implement builder pattern
 */
interface TicketModel extends mongoose.Model<TicketDoc> {
  build(attrs: TicketAttrs): TicketDoc;
}

const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    orderId: {
      type: String,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        (ret.id = doc._id), delete ret._id;
      },
    },
  }
);

// Add version plugin
ticketSchema.set('versionKey', 'version');
ticketSchema.plugin(updateIfCurrentPlugin);

ticketSchema.statics.build = (attr: TicketAttrs) => {
  return new Ticket(attr);
};

const Ticket = mongoose.model<TicketDoc, TicketModel>('Ticket', ticketSchema);

export { Ticket };

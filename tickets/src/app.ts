/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-10-22 11:24:45
 * @modify date 2020-10-22 11:24:45
 * @desc All express related code
 */
import express from 'express';
import { json } from 'body-parser';
import morgan from 'morgan';
import cookieSession from 'cookie-session';
import 'express-async-errors';

import { currentUser, errorHandler } from '@gagan-personal/common';
import { NotFoundError } from '@gagan-personal/common';
import { createTicketRouter } from './routes/create-ticket';
import { fetchTicketRouter } from './routes/fetch-ticket';
import { fetchAllTicketsRouter } from './routes/fetch-all-tickets';
const app = express();

// app.set('trust-proxy', true); // Used for https
app.use(json());
app.use(morgan('short'));
app.use(
  cookieSession({
    signed: false,
    // secure: process.env.NODE_ENV !== 'test', // Used for https
  })
);

// Check if user is logged In and set currentUser property
app.use(currentUser);

// Ticket related routes
app.use(createTicketRouter);
app.use(fetchTicketRouter);
app.use(fetchAllTicketsRouter);

app.all('*', async () => {
  throw new NotFoundError();
});
app.use(errorHandler);

export { app };

/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-12-04 16:41:33
 * @modify date 2020-12-04 16:41:33
 * @desc Express related code
 */
import express from 'express';
import { json } from 'body-parser';
import morgan from 'morgan';
import cookieSession from 'cookie-session';
import 'express-async-errors';

import { currentUser, errorHandler } from '@gagan-personal/common';
import { NotFoundError } from '@gagan-personal/common';
import { createOrderRouter } from './routes/create-order';
import { fetchOrderRouter } from './routes/fetch-order';
import { fetchAllOrdersRouter } from './routes/fetch-all-orders';
import { deleteOrderRouter } from './routes/delete-order';
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
app.use(createOrderRouter);
app.use(fetchOrderRouter);
app.use(fetchAllOrdersRouter);
app.use(deleteOrderRouter);

app.all('*', async () => {
  throw new NotFoundError();
});
app.use(errorHandler);

export { app };

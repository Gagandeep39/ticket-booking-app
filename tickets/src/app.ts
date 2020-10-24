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

import { errorHandler } from '@gagan-personal/common';
import { NotFoundError } from '@gagan-personal/common';
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

app.all('*', async () => {
  throw new NotFoundError();
});
app.use(errorHandler);

export { app };

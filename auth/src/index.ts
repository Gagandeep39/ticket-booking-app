/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-10-20 19:15:19
 * @modify date 2020-10-20 19:15:19
 * @desc Auth microservice
 */
import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cookieSession from 'cookie-session';

import { currentUserRouter } from './routes/current-user';
import { signInRouter } from './routes/sign-in';
import { signUpRouter } from './routes/sign-up';
import { signOutRouter } from './routes/sign-out';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';
import { connectDB } from './config/db';

const app = express();

dotenv.config();
connectDB();

// app.set('trust-proxy', true); // Used for https
app.use(json());
app.use(morgan('short'));
app.use(
  cookieSession({
    signed: false,
    // secure: true // Used for https
  })
);

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signUpRouter);
app.use(signOutRouter);

app.all('*', async () => {
  throw new NotFoundError();
});
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Auth service started on port ${PORT}`));

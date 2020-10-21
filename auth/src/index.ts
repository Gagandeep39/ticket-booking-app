/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-10-20 19:15:19
 * @modify date 2020-10-20 19:15:19
 * @desc Auth microservice
 */
import express from 'express';
import { json } from 'body-parser';
import morgan from 'morgan';
import { currentUserRouter } from './routes/current-user';
import { signInRouter } from './routes/sign-in';
import { signUpRouter } from './routes/sign-up';
import { signOutRouter } from './routes/sign-out';

const app = express();

app.use(json());
app.use(morgan('short'));

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signUpRouter);
app.use(signOutRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Auth service started on port ${PORT}`));

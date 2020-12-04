/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-10-20 19:15:19
 * @modify date 2020-10-20 19:15:19
 * @desc Auth microservice
 */
import dotenv from 'dotenv';

import { connectDB } from './config/db';
import { app } from './app';
import { natsWrapper } from './config/nats-wrapper';

dotenv.config();
//  NATS related Events
natsWrapper
  .connect('ticketing', 'asxds', `http://${process.env.NATS_URI || 'localhost'}:4222`)
  .catch((error) => {
    throw new Error('Error Connecting to NAT');
  });
natsWrapper.client.on('close', () => {
  console.log('NATS Connection Closed');
  process.exit();
});
process.on('SIGINT', () => natsWrapper.client.close());
process.on('SIGTERM', () => natsWrapper.client.close());

//  Mongo DB Connection
connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Tickets service started on port ${PORT}`));

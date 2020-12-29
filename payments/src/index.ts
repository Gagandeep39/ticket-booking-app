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
import { connectNAT } from './config/nats';

dotenv.config();

//  NATS related Events
connectNAT();
//  Mongo DB Connection
connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Payments service started on port ${PORT}`));

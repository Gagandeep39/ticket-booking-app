/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-12-04 16:41:33
 * @modify date 2020-12-04 16:41:33
 * @desc Root file
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
app.listen(PORT, () => console.log(`Orders service started on port ${PORT}`));

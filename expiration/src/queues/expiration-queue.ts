/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-12-29 11:05:21
 * @modify date 2020-12-29 11:05:21
 * @desc [description]
 */
import Queue from 'bull';
import { Payload } from '../models/payload';

const expirationQueue = new Queue<Payload>('order:expiration', {
  redis: {
    host: process.env.REDIS_HOST,
  },
});

expirationQueue.process(async (job) => {
  console.log('Publishing an expiration:complete event', job.data.orderId);
});

export { expirationQueue };

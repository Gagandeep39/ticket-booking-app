/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-12-04 14:39:00
 * @modify date 2020-12-04 14:39:00
 * @desc [description]
 */
import { natsWrapper } from './nats-wrapper';

const connectNAT = async () => {
  if (!process.env.NATS_CLUSTER_ID)
    throw new Error('Cluster ID ENV var required');
  if (!process.env.NATS_CLIENT_ID)
    throw new Error('NATS Client ID ENV var required ');
  if (!process.env.NATS_URL) throw new Error('NATS URL ENV required');
  await natsWrapper
    .connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    )
    .catch((error) => {
      throw new Error('Error Connecting to NAT');
    });
  natsWrapper.client.on('close', () => {
    console.log('NATS Connection Closed');
    process.exit();
  });
  process.on('SIGINT', () => natsWrapper.client.close());
  process.on('SIGTERM', () => natsWrapper.client.close());
};

export { connectNAT };

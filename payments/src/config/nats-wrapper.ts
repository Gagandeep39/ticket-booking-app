/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-12-04 11:16:18
 * @modify date 2020-12-04 11:16:18
 * @desc NATS connection using singleton implementation
 */
import nats, { Stan } from 'node-nats-streaming';
class NatsWrapper {
  // ? implies it may be undefined sometimes
  private _client?: Stan;

  get client() {
    if (!this._client)
      throw new Error('Canot access NATS client without connecting to server.');
    return this._client;
  }

  connect(clusterId: string, clientId: string, url: string): Promise<void> {
    this._client = nats.connect(clusterId, clientId, { url });
    return new Promise((resolve, reject) => {
      // ! implies, we know its not null
      this.client.on('connect', () => {
        console.log('NATS Server connected...');
        console.log(`ClusterID: ${clusterId} | ClientID: ${clientId}`);
        resolve();
      });
      this.client.on('error', (error) => {
        reject(error);
      });
    });
  }
}

export const natsWrapper = new NatsWrapper();

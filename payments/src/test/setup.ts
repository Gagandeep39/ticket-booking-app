/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-10-22 11:44:21
 * @modify date 2020-10-22 11:44:21
 * @desc Create test environment
 */
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

jest.mock('../config/nats-wrapper.ts');
let mongo: MongoMemoryServer;

beforeAll(async () => {
  process.env.JWT_KEY = 'lonely';
  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

beforeEach(async () => {
  // Ensures nats is initliazed for everytest
  jest.clearAllMocks();
  await mongoose.connection.db.collections().then((collections) => {
    collections.forEach(async (collec) => await collec.deleteMany({}));
  });
});

afterAll(() => {
  mongo.stop().then(() => mongoose.connection.close());
});

/**
 * Creating a helper functions it will be available for all methods
 */
declare global {
  namespace NodeJS {
    interface Global {
      signIn(id?: string): string[];
    }
  }
}

global.signIn = (id?: string) => {
  //Build JWT Payload
  const payload = {
    id: id || new mongoose.Types.ObjectId().toHexString(),
    email: 'test@mail.com',
  };

  // Create JWT
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // Build Session Object\
  const session = { jwt: token };

  // Turn into JSON
  const sessionJSON = JSON.stringify(session);

  // Take JSON and encode as base64
  const base64 = Buffer.from(sessionJSON).toString('base64');

  // Return String
  return [`express:sess=${base64}`];

  // const email = 'singh.gagandeep@mail.com';
  // const password = '123456';
  // const response = await request(app)
  //   .post('/api/users/signup')
  //   .send({ email, password });

  // const cookie = response.get('Set-Cookie');
  // return cookie;
};

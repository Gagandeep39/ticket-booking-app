/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-10-22 11:44:21
 * @modify date 2020-10-22 11:44:21
 * @desc Create test environment
 */
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

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
  await mongoose.connection.db.collections().then((collections) => {
    collections.forEach(async (collec) => await collec.deleteMany({}));
  });
});

afterAll(() => {
  mongo.stop().then(() => mongoose.connection.close());
});

/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-12-04 16:41:33
 * @modify date 2020-12-04 16:41:33
 * @desc Database connection
 */
import mongoose from 'mongoose';
// Cluster -> Select your cluster -> Connect -> Connect your application -> Copy connection string
// Look for key value pair `mongoURI`

// Async FUnction to Connect to Database
const connectDB = () => {
  if (!process.env.MONGO_URI) throw new Error('Mongo URI not found');
  mongoose
    .connect(process.env.MONGO_URI, {
      // Fix Deperication Errors
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // (node:17188) DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
      useCreateIndex: true,
    })
    .then((res) => {
      console.log('Mongo DB Connected...');
    })
    .catch((error) => {
      throw new Error('Invalid Mongo URI');
      // console.error(error.message);
      // process.exit(1);
    });
};
// Returns a promise with with we can call the above connection code
// Code is called from server.js
export { connectDB };

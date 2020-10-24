/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-10-21 17:08:27
 * @modify date 2020-10-21 17:08:27
 * @desc Database connection
 */
import mongoose from 'mongoose';
// Cluster -> Select your cluster -> Connect -> Connect your application -> Copy connection string
// Look for key value pair `mongoURI`
const dbUri: string = process.env.MONGO_URI || '';

// Async FUnction to Connect to Database
const connectDB = () => {
  mongoose
    .connect(dbUri, {
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
      console.error(error.message);
      process.exit(1);
    });
};
// Returns a promise with with we can call the above connection code
// Code is called from server.js
export { connectDB };

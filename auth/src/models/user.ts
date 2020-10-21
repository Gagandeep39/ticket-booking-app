/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-10-21 17:39:19
 * @modify date 2020-10-21 17:39:19
 * @desc User model
 */
import mongoose from 'mongoose';

// Describe the data required to create usermodel
interface UserAttrs {
  email: String;
  password: String;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('User', userSchema);

// Not good apprach as we have to separately export/iimport while using
const buildUser = (attrs: UserAttrs) => new User(attrs);

export { User, buildUser };

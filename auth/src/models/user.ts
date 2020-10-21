/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-10-21 17:39:19
 * @modify date 2020-10-21 17:39:19
 * @desc User model
 */
import mongoose from 'mongoose';
import { Password } from '../service/password';

// Describe the data required to create usermodel
interface UserAttrs {
  email: String;
  password: String;
}

// Adding additional features to default mongoose class
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// Properties a single user dcument has
interface UserDoc extends mongoose.Document {
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

userSchema.pre('save', function (done) {
  if (this.isModified('password'))
    Password.toHash(this.get('password')).then((encryptedPassword) => {
      this.set('password', encryptedPassword);
      done();
    });
});

// Adding a 'build' function to userSchema
// Can be accessed using User.build({})
userSchema.statics.build = (attrs: UserAttrs) => new User(attrs);

// UserDoc - Fields with which document is created
// UserModel - Object returned after
const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

// Not good apprach as we have to separately export/iimport while using
// const buildUser = (attrs: UserAttrs) => new User(attrs);

export { User };

import {model, Schema} from "mongoose";
import bcrypt from 'bcrypt';
import {IUser} from "../types";

const SALT_WORK_FACTORY = 10;

const UserSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  }
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(SALT_WORK_FACTORY);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.set('toJSON', {
  transform: (doc, ret, options) => {
    delete ret.password
    return ret
  }
});

const User = model('User', UserSchema);

export default User
import { Schema, model } from 'mongoose';
import { IUser } from '../types/interfaces/IUser';

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  group_id: {
    type: Schema.Types.ObjectId,
    ref: 'Group',
    required: true,
  }
}, {
  timestamps: true,
  versionKey: false,
});

export default model<IUser>('User', UserSchema);
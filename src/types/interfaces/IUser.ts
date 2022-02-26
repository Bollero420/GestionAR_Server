import { Document, Types } from 'mongoose';

export interface IUser extends Document {
  username: string;
  password: string;
  emailAddress: string;
  createdAt: Date;
  updatedAt: Date;
  group_id: Types.ObjectId;
}

import { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  group_id: Schema.Types.ObjectId;
}
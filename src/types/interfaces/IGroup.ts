import { Document, Types } from 'mongoose';

export interface IGroup extends Document {
  group_name: string;
  users: Types.ObjectId[];
  actions: Types.ObjectId[];
}

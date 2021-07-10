import { Document, Schema } from 'mongoose';

export interface IGroup extends Document {
  group_name: string;
  users: [Schema.Types.ObjectId];
  actions: [Schema.Types.ObjectId];
}

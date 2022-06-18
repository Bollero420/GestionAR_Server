import { Document, Types } from 'mongoose';

interface IGroup extends Document {
  group_name: string;
  users: Types.ObjectId[];
  actions: Types.ObjectId[];
}

export default IGroup;

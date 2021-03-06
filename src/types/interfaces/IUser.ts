import { Document, Types } from 'mongoose';

interface IUser extends Document {
  username: string;
  password: string;
  email_address: string;
  createdAt: Date;
  updatedAt: Date;
  group_id: Types.ObjectId;
}

export default IUser;

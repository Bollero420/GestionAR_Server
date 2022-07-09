import { Document, Schema } from 'mongoose';

interface ILogger extends Document {
  action: string;
  userId: Schema.Types.ObjectId;
}

export default ILogger;

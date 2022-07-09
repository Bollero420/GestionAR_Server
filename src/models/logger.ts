import { Schema, model } from 'mongoose';
import { ILogger } from '../types/interfaces';

const LoggerSchema = new Schema(
  {
    action: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model<ILogger>('Logger', LoggerSchema);

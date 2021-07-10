import { Schema, model } from 'mongoose';
import { IGroup } from '../types/interfaces/IGroup';

const GroupSchema = new Schema({
  group_name: {
    type: String,
    required: true,
  },
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
  ],
  actions: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Action',
      required: false,
    },
  ],
}, {
  timestamps: true,
  versionKey: false,
});

export default model<IGroup>('Group', GroupSchema);
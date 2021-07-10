import { Schema, model } from 'mongoose';
import { IAction } from '../types/interfaces/IAction';


const ActionSchema = new Schema({
  action_name: {
    type: String,
    required: true,
  },
  form_id: {
    type: Schema.Types.ObjectId,
    ref: 'Form',
    required: true,
  },
}, {
  timestamps: true,
  versionKey: false,
});

export default model<IAction>('Action', ActionSchema);
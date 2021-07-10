import { Document, Schema } from 'mongoose';

export interface IAction extends Document {
  action_name: string;
  form_id: Schema.Types.ObjectId;
}

import { Document, Types } from 'mongoose';

export interface IAction extends Document {
  action_name: string;
  form_id: Types.ObjectId;
}

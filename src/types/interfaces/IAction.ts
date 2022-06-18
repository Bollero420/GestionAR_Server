import { Document, Types } from 'mongoose';

interface IAction extends Document {
  action_name: string;
  form_id: Types.ObjectId;
}

export default IAction;

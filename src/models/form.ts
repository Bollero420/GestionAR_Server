import { Schema, model } from 'mongoose';
import { IForm } from '../types/interfaces/IForm';

const FormSchema = new Schema({
  form_name: {
    type: String,
    required: true,
  },
}, {
  timestamps: false,
  versionKey: false,
});

export default model<IForm>('Form', FormSchema);
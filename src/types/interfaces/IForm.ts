import { Document } from 'mongoose';

export interface IForm extends Document {
  form_name: string;
}
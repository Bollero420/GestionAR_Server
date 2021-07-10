import { Document, Schema } from 'mongoose';

export interface ISubject extends Document {
  subject_name: string;
  teachers: [Schema.Types.ObjectId];
}
import { Document, Types } from 'mongoose';

export interface ISubject extends Document {
  subject_name: string;
  teachers: Types.ObjectId[];
}

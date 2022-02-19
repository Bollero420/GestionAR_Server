import { Document, Schema } from 'mongoose';

export interface IGrade extends Document {
  shift: string;
  section: string;
  level: number;
  teachers: Schema.Types.ObjectId[];
  students: Schema.Types.ObjectId[];
}

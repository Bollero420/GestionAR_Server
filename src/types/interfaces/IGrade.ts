import { Document, Types } from 'mongoose';

export interface IGrade extends Document {
  shift: string;
  section: string;
  level: string;
  teachers: Types.ObjectId[];
  students: Types.ObjectId[];
}

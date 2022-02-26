import { Document, Types } from 'mongoose';

export interface IGrade extends Document {
  shift: string;
  section: string;
  level: number;
  teachers: Types.ObjectId[];
  students: Types.ObjectId[];
}

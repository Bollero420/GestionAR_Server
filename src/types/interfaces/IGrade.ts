import { Document, Types } from 'mongoose';

interface IGrade extends Document {
  shift: string;
  section: string;
  level: string;
  teachers: Types.ObjectId[];
  students: Types.ObjectId[];
}

export default IGrade;

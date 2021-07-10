import { Document, Schema } from 'mongoose';

export interface IAttendance extends Document {
  student_id: Schema.Types.ObjectId;
  subject_id: Schema.Types.ObjectId;
  state: boolean;
}
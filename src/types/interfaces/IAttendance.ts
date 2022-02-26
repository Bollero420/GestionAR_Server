import { Document, Types } from 'mongoose';

export interface IAttendance extends Document {
  student_id: Types.ObjectId;
  subject_id: Types.ObjectId;
  state: boolean;
}

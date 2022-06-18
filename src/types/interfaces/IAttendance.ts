import { Document, Types } from 'mongoose';

interface IAttendance extends Document {
  student_id: Types.ObjectId;
  subject_id: Types.ObjectId;
  state: boolean;
}

export default IAttendance;

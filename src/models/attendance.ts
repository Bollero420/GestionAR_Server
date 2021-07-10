
import { Schema, model } from 'mongoose';
import { IAttendance } from '../types/interfaces/IAttendance';

const AttendanceSchema = new Schema({
  student_id: {
    type: Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  subject_id: {
    type: Schema.Types.ObjectId,
    ref: 'Subject',
    required: true,
  },
  state: {
    type: Boolean,
    required: true,
  },
}, {
  timestamps: false,
  versionKey: false,
});

export default model<IAttendance>('Attendance', AttendanceSchema);
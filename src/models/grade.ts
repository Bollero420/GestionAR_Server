import { Schema, model } from 'mongoose';
import { IGrade } from '../types/interfaces/IGrade';

const GradeSchema = new Schema({
  shift: {
    type: String,
    required: true,
  },
  section: {
    type: String,
    required: true,
  },
  level: {
    type: Number,
    required: true,
  },
  teachers: [{
    type: Schema.Types.ObjectId,
    ref: 'Teacher',
    required: false,
  }],
  students: [{
    type: Schema.Types.ObjectId,
    ref: 'Student',
    required: false,
  }],
}, {
  timestamps: false,
  versionKey: false,
});

export default model<IGrade>('Grade', GradeSchema);
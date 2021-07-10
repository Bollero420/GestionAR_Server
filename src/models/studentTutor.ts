import { Schema, model } from 'mongoose';
import { PersonSchema } from '../types/interfaces/IPerson';
import { IStudentTutor } from '../types/interfaces/IStudentTutor';

const StudentTutorSchema = new Schema({
  ...PersonSchema,
  students: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
  ],
  job: {
    type: String,
    required: true,
  },
  civil_status: {
    type: String,
    required: true,
  },
  educational_level: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
  versionKey: false,
});

export default model<IStudentTutor>('StudentTutor', StudentTutorSchema);
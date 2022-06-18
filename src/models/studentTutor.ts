import { Schema, model } from 'mongoose';

import { IStudentTutor } from '../types/interfaces';

import { PersonSchema } from './common';

const StudentTutorSchema = new Schema(
  {
    ...PersonSchema,
    students: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Student',
        required: false,
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
    other_info: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model<IStudentTutor>('StudentTutor', StudentTutorSchema);

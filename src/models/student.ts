import { Schema, model } from 'mongoose';

import { PersonSchema } from '../types/interfaces/IPerson';
import { IStudent } from '../types/interfaces/IStudent';

const StudentSchema = new Schema(
  {
    ...PersonSchema,
    grade_id: {
      type: Schema.Types.ObjectId,
      ref: 'Grade',
      required: true,
    },
    integrated: {
      type: Boolean,
      required: true,
    },
    entry_date: {
      type: Date,
      required: false,
    },
    egress_date: {
      type: Date,
      required: false,
    },
    registration_number: {
      type: Number,
      required: true,
    },
    previous_school: {
      type: String,
      required: true,
    },
    neighborhood: {
      type: String,
      required: true,
    },
    cooperator: {
      type: Boolean,
      required: true,
    },
    school_radio: {
      type: Boolean,
      required: true,
    },
    disability_type: {
      type: String,
      required: false,
    },
    medical_center: {
      type: String,
      required: true,
    },
    school_dining: {
      type: Boolean,
      required: false,
    },
    milk_cup: {
      type: Boolean,
      required: false,
    },
    repeating_quantity: {
      type: Number,
      required: false,
      default: 0,
    },
    student_tutors: [
      {
        type: Schema.Types.ObjectId,
        ref: 'StudentTutor',
        required: false,
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model<IStudent>('Student', StudentSchema);

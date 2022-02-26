import { Schema, Document, Types } from 'mongoose';

export interface IQualification extends Document {
  student_id: Types.ObjectId;
  subject_id: Types.ObjectId;
  bimonthly_date: Date;
}

export const QualificationSchema = {
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
  bimonthly_date: {
    type: Date,
    required: true,
  },
};

import { Schema } from 'mongoose';

const QualificationSchema = {
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

export default QualificationSchema;

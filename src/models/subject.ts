import { Schema, model } from 'mongoose';
import { ISubject } from '../types/interfaces';

const SubjectSchema = new Schema(
  {
    subject_name: {
      type: String,
      required: true,
    },
    teachers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true,
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model<ISubject>('Subject', SubjectSchema);

import { Schema, model } from 'mongoose';

import { QualificationSchema } from '../types/interfaces/IQualification';
import { ISubjectQualification } from '../types/interfaces/ISubjectQualification';

const SubjectQualificationSchema = new Schema(
  {
    ...QualificationSchema,
    value: {
      type: String,
      required: true,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model<ISubjectQualification>('SubjectQualification', SubjectQualificationSchema);

import { Schema, model } from 'mongoose';

import { ISubjectQualification } from '../types/interfaces';

import { QualificationSchema } from './common';

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

import { Schema, model } from 'mongoose';

import { QualificationSchema } from '../types/interfaces/IQualification';
import { IObservation } from '../types/interfaces/IObservation';

const ObservationSchema = new Schema(
  {
    ...QualificationSchema,
    description: {
      type: String,
      required: true,
    },
    worry_and_effort: {
      type: String,
      required: true,
    },
    respect_rules: {
      type: String,
      required: true,
    },
    solidarity_and_collaboration: {
      type: String,
      required: true,
    },
    group_responsibility: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model<IObservation>('Observation', ObservationSchema);

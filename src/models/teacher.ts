import { Schema, model } from 'mongoose';
import { PersonSchema } from '../types/interfaces/IPerson';
import { ITeacher } from '../types/interfaces/ITeacher';

const TeacherSchema = new Schema({
  ...PersonSchema,
  grades: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Grade',
      required: true,
    },
  ],
  subjects: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Subject',
      required: true,
    },
  ],
  main_teacher: {
    type: Boolean,
    required: true,
  },
}, {
  timestamps: true,
  versionKey: false,
});

export default model<ITeacher>('Teacher', TeacherSchema);
import { Schema } from 'mongoose';
import { IPerson } from './IPerson';

export interface ITeacher extends IPerson {
  grades: Schema.Types.ObjectId[];
  subjects: Schema.Types.ObjectId[];
  main_teacher: boolean;
}

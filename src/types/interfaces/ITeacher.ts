import { Types } from 'mongoose';

import IPerson from './IPerson';

export interface ITeacher extends IPerson {
  grades: Types.ObjectId[];
  subjects: Types.ObjectId[];
  main_teacher: boolean;
}

export default ITeacher;

import { Types } from 'mongoose';
import { IPerson } from './IPerson';

export interface IStudentTutor extends IPerson {
  student_id: Types.ObjectId[];
  job: string;
  civil_status: string;
  educational_level: string;
  other_info: string;
}

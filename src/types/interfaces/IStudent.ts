import { Schema } from 'mongoose';
import { IPerson } from './IPerson';

export interface IStudent extends IPerson {
  grade_id: Schema.Types.ObjectId;
  integrated: boolean;
  entry_date: Date;
  egress_date: Date;
  registration_number: number;
  previous_school: string;
  neighborhood: string;
  cooperator: boolean;
  school_radio: boolean;
  disability_type?: string;
  medical_center: string;
  school_dining?: boolean;
  milk_cup?: boolean;
  repeating_quantity: number;
  emailAddress: string;
  student_tutors: Schema.Types.ObjectId[];
}

import { Document, Types } from 'mongoose';

interface ISubject extends Document {
  subject_name: string;
  teachers: Types.ObjectId[];
}

export default ISubject;

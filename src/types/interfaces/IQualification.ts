import { Document, Types } from 'mongoose';

interface IQualification extends Document {
  student_id: Types.ObjectId;
  subject_id: Types.ObjectId;
  bimonthly_date: Date;
}

export default IQualification;

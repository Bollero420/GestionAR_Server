import { Schema, Document } from 'mongoose';

interface IPerson extends Document {
  firstName: string;
  lastName: string;
  phone: string;
  birth_date: Date;
  dni: string;
  location: string;
  country: string;
  address: string;
  gender: string;
  alternative_phone: string;
  user_id: Schema.Types.ObjectId;
  email_address: string;
}

export default IPerson;

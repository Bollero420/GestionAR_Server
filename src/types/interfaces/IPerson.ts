import { Schema, Document } from "mongoose";

export interface IPerson extends Document {
  firstName: string;
  lastName: string;
  phone: string;
  birth_date: Date;
  dni: number;
  country: string;
  address: string;
  gender: string;
  alternative_phone: string;
  user_id: Schema.Types.ObjectId;
}


export const PersonSchema = {
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  birth_date: {
    type: Date,
    required: true,
  },
  dni: {
    type: Number,
    required: true
  },
  country: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  alternative_phone: {
    type: String,
    required: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}
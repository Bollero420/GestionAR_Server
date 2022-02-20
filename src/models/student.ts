import { Schema, model } from 'mongoose';

import { PersonSchema } from '../types/interfaces/IPerson';
import { IStudent } from '../types/interfaces/IStudent';

import User from './user';
import Group from './group';

const StudentSchema = new Schema(
  {
    ...PersonSchema,
    grade_id: {
      type: Schema.Types.ObjectId,
      ref: 'Grade',
      required: true,
    },
    integrated: {
      type: Boolean,
      required: true,
    },
    entry_date: {
      type: Date,
      required: true,
    },
    egress_date: {
      type: Date,
      required: true,
    },
    registration_number: {
      type: Number,
      required: true,
    },
    previous_school: {
      type: String,
      required: true,
    },
    neighborhood: {
      type: String,
      required: true,
    },
    cooperator: {
      type: Boolean,
      required: true,
    },
    school_radio: {
      type: Boolean,
      required: true,
    },
    disability_type: {
      type: String,
      required: false,
    },
    medical_center: {
      type: String,
      required: true,
    },
    school_dining: {
      type: Boolean,
      required: false,
    },
    milk_cup: {
      type: Boolean,
      required: false,
    },
    repeating_quantity: {
      type: Number,
      required: false,
    },
    emailAddress: {
      type: String,
      required: true,
    },
    student_tutors: [
      {
        type: Schema.Types.ObjectId,
        ref: 'StudentTutor',
        required: true,
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// automatically create user
StudentSchema.post('create', async function (student: IStudent, next) {
  // get corresponding group id
  const group = await Group.findOne({
    group_name: 'students',
  });

  // create username var
  let username = `${student.firstName[0]}${student.lastName}`;

  // check if user exists
  const user = await User.findOne({
    username,
  });

  if (user) {
    // if user already exists set fallback username
    username = `${student.firstName.substring(0, 2)}${student.lastName}`;
  }

  const newUser = new User({
    username,
    password: `${student.lastName[0]}${student.dni}`,
    group_id: group._id,
    emailAddress: student.emailAddress,
  });

  await newUser.save();
  next();
});

export default model<IStudent>('Student', StudentSchema);

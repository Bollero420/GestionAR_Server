import {
  Form,
  Action,
  Group,
  Grade,
  Subject,
  User,
  Student,
  SubjectQualification,
  Observation,
  StudentTutor,
  Attendance,
  Teacher,
} from '../models';

import initialData from './data';

import { populateActions, populateGroupsWithActions } from '../helpers/seed';

const resetDb = async () => {
  // await Action.deleteMany({});
  await Attendance.deleteMany({});
  // await Form.deleteMany({});
  // await Grade.deleteMany({});
  // await Group.deleteMany({});
  await Observation.deleteMany({});
  // await Student.deleteMany({});
  // await StudentTutor.deleteMany({});
  // await Subject.deleteMany({});
  await SubjectQualification.deleteMany({});
  // await Teacher.deleteMany({});
  // await User.deleteMany({});
};

const handleSetActions = async (actions: any) => {
  // get FormsDocs and populate actions with corresponding '_id'
  const formsDocs = await Form.find().lean(true);
  const populatedActions = populateActions(formsDocs, actions);
  // set Actions Data
  await Action.insertMany(populatedActions);
};

const handleSetGroups = async (groups: any) => {
  // get ActionsDocs and populate groups with corresponding Array of '_id'
  const actionsDocs = await Action.find().lean(true);
  const populatedGroupsWithActions = populateGroupsWithActions(actionsDocs, groups);
  // set Groups Data
  await Group.insertMany(populatedGroupsWithActions);
};

export const seeder = async () => {
  console.log('seeding');
  // const { forms, actions, groups, grades, subjects } = initialData;
  // // reset Collections
  // await resetDb();

  // // set Forms Data
  // await Form.insertMany(forms);
  // // set Actions Data
  // await handleSetActions(actions);
  // // set Groups Data
  // await handleSetGroups(groups);
  // // set Grades Data
  // await Grade.insertMany(grades);

  // // set Subjects Data
  // await Subject.insertMany(subjects);

  // await User.create({
  //   username: 'admin',
  //   password: 'admin',
  //   email_address: 'admin@mail.com',
  // } as any);
};

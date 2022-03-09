import Form from '../models/form';
import Action from '../models/action';
import Group from '../models/group';
import Grade from '../models/grade';
import Subject from '../models/subject';
import User from '../models/user';
import Student from '../models/student';
import SubjectQualification from '../models/subjectQualification';
import Observation from '../models/observation';
import StudentTutor from '../models/studentTutor';
import Attendance from '../models/attendance';
import Teacher from '../models/teacher';

import initialData from './data';
import { populateActions, populateGroupswithActions } from '../helpers/seed';

const resetDb = async () => {
  await Action.deleteMany({});
  await Attendance.deleteMany({});
  await Form.deleteMany({});
  await Grade.deleteMany({});
  await Group.deleteMany({});
  await Observation.deleteMany({});
  await Student.deleteMany({});
  await StudentTutor.deleteMany({});
  await Subject.deleteMany({});
  await SubjectQualification.deleteMany({});
  await Teacher.deleteMany({});
  await User.deleteMany({});
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
  const populatedGroupsWithActions = populateGroupswithActions(actionsDocs, groups);
  // set Groups Data
  await Group.insertMany(populatedGroupsWithActions);
};

export const seeder = async () => {
  console.log('seeding');
  const { forms, actions, groups, grades, subjects } = initialData;
  // reset Collections
  await resetDb();

  // set Forms Data
  await Form.insertMany(forms);
  // set Actions Data
  await handleSetActions(actions);
  // set Groups Data
  await handleSetGroups(groups);
  // set Grades Data
  await Grade.insertMany(grades);

  // set Subjects Data
  await Subject.insertMany(subjects);

  await User.create({
    username: 'admin',
    password: 'admin',
    email_address: 'admin@mail.com',
  } as any);
};

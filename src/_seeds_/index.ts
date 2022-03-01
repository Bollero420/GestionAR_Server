import Form from '../models/form';
import Action from '../models/action';
import Group from '../models/group';
import Grade from '../models/grade';
import Subject from '../models/subject';
import User from '../models/user';
import Student from '../models/student';

import initialData from './data';
import { populateActions, populateGroupswithActions } from '../helpers/seed';

const resetDb = async () => {
  await Form.deleteMany({});
  await Action.deleteMany({});
  await Group.deleteMany({});
  await Grade.deleteMany({});
  await Subject.deleteMany({});
  await User.deleteMany({});
}

const handleSetActions = async (actions: any) => {
  // get FormsDocs and populate actions with corresponding '_id'
  const formsDocs = await Form.find().lean(true);;
  const populatedActions = populateActions(formsDocs, actions);
  // set Actions Data
  await Action.insertMany(populatedActions);
};

const handleSetGroups = async (groups: any) => {
  // get ActionsDocs and populate groups with corresponding Array of '_id'
  const actionsDocs =  await Action.find().lean(true);
  const populatedGroupsWithActions = populateGroupswithActions(actionsDocs, groups);
  // set Groups Data
  await Group.insertMany(populatedGroupsWithActions);
}


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

  const firstAMorningGrade = await Grade.findOne({
    level: '1',
    shift: 'M',
    section: 'A' 
  });

  const students = await Student.find();

  const student = students && students.length > 0 && students[0]

  student.grade_id = firstAMorningGrade._id
  await student.save();

  firstAMorningGrade.students = [student._id]

  await firstAMorningGrade.save()

  // set Subjects Data
  await Subject.insertMany(subjects);

  await User.create({
    username: 'admin',
    password: 'admin',
    emailAddress: 'admin@mail.com',
  });
  
};

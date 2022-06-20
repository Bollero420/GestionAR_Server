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

import initialData from './initialData';
import seedData from './seedData';

import { populateActions, populateGroupsWithActions } from '../helpers/seed';

const models = {
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
};

const resetDb = async (modelsNames?: string[]) => {
  if (!modelsNames) {
    console.log('Skipping resetDb');
    return;
  }
  console.log('Restarting Db values for: ', modelsNames);
  for (let index = 0; index < modelsNames.length; index++) {
    const modelName = modelsNames[index];
    await models[modelName].deleteMany({});
    console.log('Finished with ' + modelName + ' collection');
  }
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

const setInitialData = async () => {
  const { forms, actions, groups, grades, subjects } = initialData;

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

const setSeedData = async () => {
  const { attendances, observations, subjectQualifications } = seedData;

  await DataCreator(attendances, 'Attendance', ['createdAt', 'updatedAt']);

  await DataCreator(observations, 'Observation', ['createdAt', 'updatedAt']);

  await DataCreator(subjectQualifications, 'SubjectQualification', ['bimonthly_date', 'createdAt', 'updatedAt']);
};

const parseDate = (dateString: string) => {
  const [day, month, year] = dateString.split('/').map((v) => parseInt(v));
  return new Date(year, month - 1, day);
};

const DataCreator = async (dataArray: any[], modelName: string, dateFields: string[]) => {
  console.log('Seeding ' + modelName);
  for (let index = 0; index < dataArray.length; index++) {
    let element = dataArray[index];

    dateFields.forEach((field) => {
      if (element[field]) {
        element[field] = parseDate(element[field]);
      }
    });

    await models[modelName].create(element as any);
  }
  console.log('Finished seeding ' + dataArray.length + ' ' + modelName + ' documents.');
};

export const seeder = async () => {
  console.log('Starting seeder');

  // reset Collections
  // await resetDb(['Attendance', 'Observation', 'SubjectQualification']);

  // Set Initial Data
  // await setInitialData();

  // Set Seed Data
  // await setSeedData();
};

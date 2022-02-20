import mongoose from 'mongoose';

import Form from '../models/form';
import Action from '../models/action';
import Group from '../models/group';
import Grade from '../models/grade';
import Subject from '../models/subject';

import initialData from './data';

// connect to db
mongoose
  .connect(`${process.env.DATABASE_URL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connected'))
  .catch((err) => console.log('error', err));

const seedDB = async () => {
  const { forms, actions, groups, grades, subjects } = initialData;

  // reset Collections
  await Form.deleteMany({});
  await Action.deleteMany({});
  await Group.deleteMany({});
  await Grade.deleteMany({});
  await Subject.deleteMany({});

  // set initialData
  await Form.insertMany(forms);
  await Action.insertMany(actions);
  await Group.insertMany(groups);
  await Grade.insertMany(grades);
  await Subject.insertMany(subjects);
};

// finalize connection
seedDB().then(() => {
  mongoose.connection.close();
});

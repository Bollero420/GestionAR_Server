import Observation from '../models/observation';
import SubjectQualification from '../models/subjectQualification';
import Subject from '../models/subject';
import User from '../models/user';
import Group from '../models/group';

import { isQualificationCompleted, useDateHelpersByDate } from '../helpers';

export const getStudentQualificationAndObservations = async (date: string, student_id: string) => {
  const { year, month, day, nextYear, nextMonth, nextDay } = useDateHelpersByDate(date);

  const observation = await Observation.findOne({
    student_id,
    bimonthly_date: {
      $gte: new Date(year, month, day),
      $lt: new Date(nextYear, nextMonth, nextDay),
    },
  }).lean(true);

  const qualifications = await SubjectQualification.find({
    student_id,
    bimonthly_date: {
      $gte: new Date(year, month, day),
      $lt: new Date(nextYear, nextMonth, nextDay),
    },
  })
    .populate('subject_id')
    .lean(true);

  let response: any = {};

  const subjects = await Subject.find().populate('subject_id').lean(true);
  if (observation) {
    response.observation = observation;
  } else {
    response.observation = {
      description: '',
      worry_and_effort: '',
      respect_rules: '',
      solidarity_and_collaboration: '',
      group_responsibility: '',
      bimonthly_date: new Date(),
      subject_id: subjects.find((subject) => subject.subject_name === 'observaciones')._id,
    };
  }

  if (qualifications.length <= 0) {
    const result = subjects.reduce((acc, subject) => {
      if (subject.subject_name !== 'observaciones') {
        return [
          ...acc,
          {
            value: '',
            bimonthly_date: new Date(),
            subject_id: {
              _id: subject._id,
              subject_name: subject.subject_name,
            },
          },
        ];
      } else {
        return acc;
      }
    }, []);
    response.qualifications = [...result];
  } else {
    response.qualifications = qualifications;
  }

  response.isCompleted = isQualificationCompleted(response.qualifications, response.observation);

  return response;
};

export const userFactory = async (type: string, model: any) => {
  let group_name = '';
  // get group name based on type
  switch (type) {
    case 'student':
      group_name = 'students';
      break;
    case 'teacher':
      group_name = 'teachers';
      break;
    case 'admin':
      group_name = 'administrators';
      break;
  }

  // get corresponding group_id
  const group = await Group.findOne({
    group_name,
  });

  // create username var
  let username = `${model.firstName[0]}${model.lastName}`;

  // check if user exists
  const user = await User.findOne({
    username,
  });

  if (user) {
    // if user already exists set fallback username
    username = `${model.firstName.substring(0, 2)}${model.lastName}`;
  }

  const newUser = new User({
    username,
    password: `${model.lastName[0]}${model.dni}`,
    group_id: group._id,
    email_address: model.email_address,
  });

  await newUser.save();
};

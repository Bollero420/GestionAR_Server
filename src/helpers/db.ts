import { isQualificationCompleted } from "../helpers";

import Observation from '../models/observation';
import SubjectQualification from '../models/subjectQualification';
import Subject from "../models/subject";


export const getStudentQualificationAndObseravtions = async (dateProps: any, student_id: string) => {
  const {
    previousYear,
    previousMonth,
    previousMountAmountOfDays,
    year,
    month,
    day
  } = dateProps;

  const observation = await Observation.findOne({
    student_id,
    bimonthly_date: {
      $gte: new Date(previousYear, previousMonth, previousMountAmountOfDays),
      $lt: new Date(year, month, day),
    },
  }).lean(true);;

  const qualifications = await SubjectQualification.find({
    student_id,
    bimonthly_date: {
      $gte: new Date(previousYear, previousMonth, previousMountAmountOfDays),
      $lt: new Date(year, month, day),
    },
  }).populate('subject_id').lean(true);

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
      subject_id: subjects.find(subject => subject.subject_name === 'observaciones')._id
    };
  }

  if (qualifications.length <= 0) {
    const result = subjects.reduce((acc, subject) => {
      if (subject.subject_name !== 'observaciones') {
        return [...acc, {
          value: '',
          bimonthly_date: new Date(),
          subject_id: {
            _id: subject._id,
            subject_name: subject.subject_name,
          }}]
        } else {
          return acc
        }
    },[])
    response.qualifications = [...result]

  } else {
    response.qualifications = qualifications;
  }

  response.isCompleted = isQualificationCompleted(response.qualifications, response.observation);

  return response
}
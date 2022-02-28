import { isQualificationCompleted } from "../helpers";

import Observation from '../models/observation';
import SubjectQualification from '../models/subjectQualification';


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
  });

  const qualifications = await SubjectQualification.find({
    student_id,
    bimonthly_date: {
      $gte: new Date(previousYear, previousMonth, previousMountAmountOfDays),
      $lt: new Date(year, month, day),
    },
  }).populate('subject_id');

  let response: any = {};

  if (observation) {
    response.observation = observation;
  } else {
    response.observation = {
      description: '',
      worry_and_effort: '',
      respect_rules: '',
      solidarity_and_collaboration: '',
      group_responsibility: '',
    };
  }

  if (qualifications.length > 0) {
    response.qualifications = [
      {
        value: '',
        subject_id: {
          subject_name: 'lengua',
        },
      },
      {
        value: '',
        subject_id: {
          subject_name: 'ciencias_sociales',
        },
      },
      {
        value: '',
        subject_id: {
          subject_name: 'matematica',
        },
      },
      {
        value: '',
        subject_id: {
          subject_name: 'ciencias_naturales',
        },
      },
      {
        value: '',
        subject_id: {
          subject_name: 'tecnologia',
        },
      },
      {
        value: '',
        subject_id: {
          subject_name: 'formacion_etica_y_ciudadana',
        },
      },
      {
        value: '',
        subject_id: {
          subject_name: 'educacion_fisica',
        },
      },
      {
        value: '',
        subject_id: {
          subject_name: 'plasitca',
        },
      },
      {
        value: '',
        subject_id: {
          subject_name: 'musica',
        },
      },
      {
        value: '',
        subject_id: {
          subject_name: 'observaciones',
        },
      },
    ];
  } else {
    response.qualifications = qualifications;
  }

  response.isCompleted = isQualificationCompleted(qualifications, observation);

  return response
}
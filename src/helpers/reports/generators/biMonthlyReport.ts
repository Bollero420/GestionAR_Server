import { Types } from 'mongoose';

import { Attendance, Observation, Student, Subject, SubjectQualification } from '../../../models';

import { generateDateHelpers } from '../../../helpers';

const generateBiMonthlyReport = async (month: number, year: number, student_id: Types.ObjectId) => {
  const { previousTwoMonth, nextTwoMonth, daysQtyOfTheMonth } = generateDateHelpers(month, year);

  const subjects = await Subject.find().lean(true);
  const student = await Student.findById(student_id).lean(true);

  const studentUnAttendancesDocsQty = await Attendance.find({
    createdAt: {
      $gte: new Date(year, month, 1),
      $lt: new Date(year, nextTwoMonth, 1),
    },
    state: false,
    student_id,
  });

  const unAttendancesFromStudent = studentUnAttendancesDocsQty.reduce((acc: any[], current: any) => {
    const docDay = new Date(current.created_at).getDate();
    const isAlreadyRegistered = acc.some((attendance: any) => new Date(attendance.created_at).getDate() === docDay);
    if (!isAlreadyRegistered) {
      return [...acc, current];
    }

    return acc;
  }, []);

  let student_qualification: any = {
    integrated: student.integrated,
    available_days: daysQtyOfTheMonth,
    unattendances: unAttendancesFromStudent.length,
  };

  for (let index = 0; index < subjects.length; index++) {
    const subject = subjects[index];

    if (subject.subject_name === 'Observaciones'.toLocaleLowerCase()) {
      const studentObservation = await Observation.findOne({
        createdAt: {
          $gte: new Date(year, previousTwoMonth, 1),
          $lt: new Date(year, month, 1),
        },
        student_id,
        subject_id: subject._id,
      }).lean(true);

      const { description, worry_and_effort, respect_rules, solidarity_and_collaboration, group_responsibility } =
        studentObservation;

      student_qualification = {
        ...student_qualification,
        description,
        worry_and_effort,
        respect_rules,
        solidarity_and_collaboration,
        group_responsibility,
      };
    } else {
      const key = subject.subject_name;

      const studentQualification = await SubjectQualification.findOne({
        createdAt: {
          $gte: new Date(year, previousTwoMonth, 1),
          $lt: new Date(year, month, 1),
        },
        student_id,
        subject_id: subject._id,
      }).lean(true);

      student_qualification = {
        ...student_qualification,
        [key]: studentQualification.value,
      };
    }
  }

  student_qualification.attendances = student_qualification.available_days - student_qualification.unattendances;
  student_qualification.attendances_average =
    (student_qualification.attendances * 100) / student_qualification.available_days;

  return student_qualification;
};

export default generateBiMonthlyReport;

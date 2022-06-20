import { IStudent } from '../../../types/interfaces';
import { Attendance, Observation, Student, Subject, SubjectQualification } from '../../../models';

import { generateDateHelpers } from '../../../helpers';

const generateBiMonthlyReport = async (month: number, year: number, student: IStudent) => {
  try {
    const student_id = student._id;
    const { previousTwoMonth, nextTwoMonth, daysQtyOfTheMonth } = generateDateHelpers(month, year);

    const subjects = await Subject.find().lean(true);

    const studentUnAttendancesDocsQty = await Attendance.find({
      createdAt: {
        $gte: new Date(year, month, 1),
        $lt: new Date(year, nextTwoMonth, 1),
      },
      state: false,
      student_id,
    });

    const unAttendancesFromStudent = studentUnAttendancesDocsQty.reduce((acc: any[], current: any) => {
      const docDay = new Date(current.createdAt).getDate();
      const isAlreadyRegistered = acc.some((attendance: any) => new Date(attendance.createdAt).getDate() === docDay);
      if (!isAlreadyRegistered) {
        return [...acc, current];
      }

      return acc;
    }, []);

    let student_report: any = {
      _id: student._id,
      fullName: `${student.firstName} ${student.lastName}`,
      integrated: student.integrated,
      available_days: daysQtyOfTheMonth,
      unAttendances: unAttendancesFromStudent.length,
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

        student_report = {
          ...student_report,
          description: studentObservation?.description || '-',
          worry_and_effort: studentObservation?.worry_and_effort || '-',
          respect_rules: studentObservation?.respect_rules || '-',
          solidarity_and_collaboration: studentObservation?.solidarity_and_collaboration || '-',
          group_responsibility: studentObservation?.group_responsibility || '-',
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

        student_report = {
          ...student_report,
          [key]: studentQualification?.value || '-',
        };
      }
    }

    student_report.attendances = student_report.available_days - student_report.unAttendances;
    student_report.attendances_average = (student_report.attendances * 100) / student_report.available_days;

    return student_report;
  } catch (error) {
    console.log('Error - generateBiMonthlyReport ->', error);
  }
};

export default generateBiMonthlyReport;

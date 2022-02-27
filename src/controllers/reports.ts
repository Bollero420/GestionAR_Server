import { Types } from 'mongoose';

import Student from '../models/student';
import Attendance from '../models/attendance';
import Grade from '../models/grade';
import Subject from '../models/subject';
import SubjectQualification from '../models/subjectQualification';
import Observation from '../models/observation';

import {
  processAttendancesByDateAndGender,
  processStudentsByGender,
  getRepeatersByGender,
  getStudentsByAgeAndGender,
} from '../helpers/reports/data_processors';

import { SUBJECT_QTY } from '../utils/constants';

import { IStudent } from '../types/interfaces/IStudent';
import { LevelKeys, StudentsByLevel, MonthlyReport } from '../types/interfaces/IProcessors';
import { generateDateHelpers, groupBy } from '../helpers';

const generateMonthlyReport = async (month: number, year: number, grade_id: string) => {
  const report: MonthlyReport = {} as MonthlyReport;

  const docProjection = {
    gender: 1,
    createdAt: 1,
  };

  const { previousMonth, nextMonth, daysQtyOfTheMonth } = generateDateHelpers(month, year);

  const gradeDoc = await Grade.findById(grade_id).lean();

  //Del mes anterior
  const previousMonthData = await Student.find(
    {
      createdAt: {
        $gte: new Date(year, previousMonth, 1),
        $lt: new Date(year, month, 1),
      },
      grade_id,
    },
    docProjection
  ).lean();

  report.previousMonth = processStudentsByGender(previousMonthData);

  //Entrados
  const newThisMonthData = await Student.find(
    {
      createdAt: {
        $gte: new Date(year, month, 1),
        $lt: new Date(year, nextMonth, 1),
      },
      egress_date: { $exists: false },
      grade_id,
    },
    docProjection
  ).lean();

  report.newThisMonth = processStudentsByGender(newThisMonthData);

  //Salidos
  const goneThisMonthData = await Student.find(
    {
      egress_date: {
        $gte: new Date(year, month, 1),
        $lt: new Date(year, nextMonth, 1),
      },
      grade_id,
    },
    docProjection
  ).lean();

  report.goneThisMonth = processStudentsByGender(goneThisMonthData);

  //Quedan
  report.leftThisMonth = {
    female: report.previousMonth.female + report.newThisMonth.female - report.goneThisMonth.female,
    male: report.previousMonth.male + report.newThisMonth.male - report.goneThisMonth.male,
    total: report.previousMonth.total + report.newThisMonth.total - report.goneThisMonth.total,
  };

  // Asistencias
  const attendancesThisMonthData = await Attendance.aggregate([
    {
      $match: {
        createdAt: {
          $gte: new Date(year, month, 1),
          $lt: new Date(year, nextMonth, 1),
        },
        state: true,
        student_id: {
          $in: gradeDoc.students,
        },
      },
    },
    {
      $group: {
        _id: '$student_id',
        attendancesAmount: { $sum: 1 },
      },
    },
    {
      $lookup: {
        from: 'Student',
        localField: 'student_id',
        foreignField: '_id',
        as: 'studentData',
      },
    },
    { $unwind: { path: '$student_id' } },
    {
      $project: {
        student_id: {
          $map: {
            input: '$_id',
          },
        },
        attendancesAmount: 1,
      },
    },
  ]);

  report.attendancesThisMonth = processAttendancesByDateAndGender(attendancesThisMonthData, daysQtyOfTheMonth);

  //Inasistencias
  const unAttendancesThisMonthData = await Attendance.aggregate([
    {
      $match: {
        createdAt: {
          $gte: new Date(year, month, 1),
          $lt: new Date(year, nextMonth, 1),
        },
        state: false,
        student_id: {
          $in: gradeDoc.students,
        },
      },
    },
    {
      $group: {
        _id: 'student_id',
      },
    },
    {
      $lookup: {
        from: 'Student',
        localField: 'student_id',
        foreignField: '_id',
        as: 'studentData',
      },
    },
    { $unwind: { path: '$student_id' } },
  ]);

  report.unAttendancesThisMonth = processAttendancesByDateAndGender(unAttendancesThisMonthData, daysQtyOfTheMonth);

  // Asistencia media
  report.attendancesAverage = {
    female: Math.round(report.attendancesThisMonth.female / daysQtyOfTheMonth),
    male: Math.round(report.attendancesThisMonth.male / daysQtyOfTheMonth),
    total: Math.round(report.attendancesThisMonth.total / daysQtyOfTheMonth),
  };

  return Object.keys(report).map((k: keyof MonthlyReport) => report[k]);
};

const generateBiMonthlyReport = async (month: number, year: number, student_id: Types.ObjectId) => {
  //? TO.DO: store amount of available days per month and use it instead of daysQtyOfTheMonth

  const { previousTwoMonth, nextTwoMonth, daysQtyOfTheMonth } = generateDateHelpers(month, year);

  const subjects = await Subject.find().lean();
  const student = await Student.findById(student_id).lean();

  const studentAttendancesDocsQty = await Attendance.countDocuments({
    createdAt: {
      $gte: new Date(year, month, 1),
      $lt: new Date(year, nextTwoMonth, 1),
    },
    state: true,
    student_id,
  });

  let student_qualification: any = {
    integrated: student.integrated,
    available_days: daysQtyOfTheMonth,
    attendances: Math.round(studentAttendancesDocsQty / SUBJECT_QTY / daysQtyOfTheMonth),
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
      }).lean();

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
      const key = subject.subject_name.replace(/\s/g, '');

      const studentQualification = await SubjectQualification.findOne({
        createdAt: {
          $gte: new Date(year, previousTwoMonth, 1),
          $lt: new Date(year, month, 1),
        },
        student_id,
        subject_id: subject._id,
      }).lean();

      student_qualification = {
        ...student_qualification,
        [key]: studentQualification.value,
      };
    }
  }

  return student_qualification;
};

const generateAnnuallyReport = async () => {
  let report: any = {};

  const grades = await Grade.find({}, { students: 1, level: 1 }).populate('students').lean();
  const gradesLevels = new Set([...grades.map((grade) => grade.level)]);

  const gradesByLevel: StudentsByLevel = groupBy(grades, 'level');

  const keys = Object.keys(gradesByLevel);
  const studentsByLevel = keys.map((k: LevelKeys) =>
    gradesByLevel[k].reduce(
      (prev, current) => ({
        students: [...prev.students].concat([...current.students]),
      }),
      {} as any
    )
  );

  report.genderByGrades = studentsByLevel.map((students: IStudent[]) => processStudentsByGender(students));

  const milk_cup_results = await Student.find({ milk_cup: true }).lean();
  const processedMilkCup = processStudentsByGender(milk_cup_results);

  const school_dining_results = await Student.find({ school_dining: true }).lean();
  const processedDining = processStudentsByGender(school_dining_results);

  report.foodServiceByGenders = [{ ...processedMilkCup }, { ...processedDining }];

  report.repeatersByGender = getRepeatersByGender(gradesLevels, studentsByLevel);

  report.studentsByAgeAndGender = getStudentsByAgeAndGender(gradesLevels, studentsByLevel);
};

const monthlyReport = async (req: any, res: any) => {
  try {
    const { month, year } = req.body;
    let report: any = [];

    const grades = await Grade.find().lean();
    for (let index = 0; index < grades.length; index++) {
      const grade_id = grades[index]._id;
      const data = generateMonthlyReport(month, year, grade_id);
      report = [...report, { grade_id, data }];
    }
    res.status(200).json({
      data: report,
      month,
      year,
    });
  } catch (error) {
    res.status(500).json('Error: ' + error);
  }
};

const bimonthlyReport = async (req: any, res: any) => {
  try {
    const { month, year, grade_id } = req.body;
    let report: any = [];

    const gradeDoc = await Grade.findById(grade_id);

    for (let index = 0; index < gradeDoc.students.length; index++) {
      const studentId = gradeDoc.students[index];

      const data = generateBiMonthlyReport(month, year, studentId);
      report = [...report, { studentId, data }];
    }

    res.status(200).json({
      data: report,
      month,
      year,
      grade_id,
    });
  } catch (error) {
    res.status(500).json('Error: ' + error);
  }
};

const annuallyReport = async (req: any, res: any) => {
  try {
    const { month, year } = req.body;
    const report = generateAnnuallyReport();
    res.status(200).json({
      data: report,
      month,
      year,
    });
  } catch (error) {
    res.status(500).json('Error: ' + error);
  }
};

export default {
  monthlyReport,
  bimonthlyReport,
  annuallyReport,
};

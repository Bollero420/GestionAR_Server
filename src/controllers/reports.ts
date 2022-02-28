import { Types } from 'mongoose';

import Student from '../models/student';
import Attendance from '../models/attendance';
import Grade from '../models/grade';
import Subject from '../models/subject';
import SubjectQualification from '../models/subjectQualification';
import Observation from '../models/observation';

import {
  processStudentsByGender,
  getRepeatersByGender,
  getStudentsByAgeAndGender,
  processAttendancesByStudentAndGender,
} from '../helpers/reports/data_processors';

import { SUBJECT_QTY } from '../utils/constants';

import { IStudent } from '../types/interfaces/IStudent';
import { LevelKeys, StudentsByLevel, MonthlyReport } from '../types/interfaces/IProcessors';
import { generateDateHelpers, groupBy } from '../helpers';
import attendance from '../models/attendance';

const generateMonthlyReport = async (month: number, year: number, grade_id: string) => {
  const report: MonthlyReport = {} as MonthlyReport;

  const docProjection = {
    gender: 1,
    createdAt: 1,
  };

  const { previousMonth, nextMonth, daysQtyOfTheMonth } = generateDateHelpers(month, year);

  const gradeDoc = await Grade.findById(grade_id).lean(true);

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
  ).lean(true);

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
  ).lean(true);

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
  ).lean(true);

  report.goneThisMonth = processStudentsByGender(goneThisMonthData);

  //Quedan
  report.leftThisMonth = {
    female: report.previousMonth.female + report.newThisMonth.female - report.goneThisMonth.female,
    male: report.previousMonth.male + report.newThisMonth.male - report.goneThisMonth.male,
    total: report.previousMonth.total + report.newThisMonth.total - report.goneThisMonth.total,
  };

  // Asistencias
  const attendancesThisMonthData = await Attendance.find({
    createdAt: {
      $gte: new Date(year, month, 1),
      $lt: new Date(year, nextMonth, 1),
    },
    state: true,
    student_id: {
      $in: gradeDoc.students,
    }
  }).populate('student_id').lean(true);;

  const attendancesByGender = processAttendancesByStudentAndGender(attendancesThisMonthData);

  report.attendancesThisMonth = attendancesByGender;

  //Inasistencias
  const unAttendancesThisMonthData = await Attendance.find({
    createdAt: {
      $gte: new Date(year, month, 1),
      $lt: new Date(year, nextMonth, 1),
    },
    state: false,
    student_id: {
      $in: gradeDoc.students,
    }
  }).populate('student_id').lean(true);

  report.unAttendancesThisMonth = processAttendancesByStudentAndGender(unAttendancesThisMonthData);

  // Asistencia media
  report.attendancesAverage = {
    female: Math.round(report.attendancesThisMonth.female / daysQtyOfTheMonth),
    male: Math.round(report.attendancesThisMonth.male / daysQtyOfTheMonth),
    total: Math.round(report.attendancesThisMonth.total / daysQtyOfTheMonth),
  };

  return Object.keys(report).map((k: keyof MonthlyReport) => report[k]);
};

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
      return [...acc, current]
    }
  }, [])
  
  
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

  student_qualification.attendances = student_qualification.available_days - student_qualification.unattendances
  student_qualification.attendances_average = student_qualification.attendances * 100 / student_qualification.available_days
  
  return student_qualification;
};

const generateAnnuallyReport = async () => {
  let report: any = {};

  const grades = await Grade.find({}, { students: 1, level: 1 }).populate('students').lean(true);
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

  const milk_cup_results = await Student.find({ milk_cup: true }).lean(true);
  const processedMilkCup = processStudentsByGender(milk_cup_results);

  const school_dining_results = await Student.find({ school_dining: true }).lean(true);
  const processedDining = processStudentsByGender(school_dining_results);

  report.foodServiceByGenders = [{ ...processedMilkCup }, { ...processedDining }];

  report.repeatersByGender = getRepeatersByGender(gradesLevels, studentsByLevel);

  report.studentsByAgeAndGender = getStudentsByAgeAndGender(gradesLevels, studentsByLevel);
};

const monthlyReport = async (req: any, res: any) => {
  try {
    const { month, year } = req.body;
    let report: any = [];

    const grades = await Grade.find().lean(true);
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

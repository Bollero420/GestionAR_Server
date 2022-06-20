import { Student, Attendance, Grade } from '../../../models';

import { MonthlyReport } from '../../../types';

import { generateDateHelpers } from '../../../helpers';

import { processStudentsByGender, processAttendancesByStudentAndGender } from '../processors';

const generateMonthlyReport = async (month: number, year: number, grade_id: string) => {
  try {
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
      },
    })
      .populate('student_id')
      .lean(true);

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
      },
    })
      .populate('student_id')
      .lean(true);

    report.unAttendancesThisMonth = processAttendancesByStudentAndGender(unAttendancesThisMonthData);

    // Asistencia media
    report.attendancesAverage = {
      female: report.attendancesThisMonth.female / daysQtyOfTheMonth,
      male: report.attendancesThisMonth.male / daysQtyOfTheMonth,
      total: report.attendancesThisMonth.total / daysQtyOfTheMonth,
    };

    return report;
  } catch (error) {
    console.log('generateMonthlyReport ->', error);
  }
};

export default generateMonthlyReport;

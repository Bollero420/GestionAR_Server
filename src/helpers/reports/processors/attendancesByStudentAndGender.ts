import processAttendancesByDateAndGender from './attendancesByDateAndGender';

import { genderProcessedDataInitialValue } from '../../../utils/constants';

export const processAttendancesByStudentAndGender = (populatedAttendancesArray: any[]) => {
  const attendancesByStudent = populatedAttendancesArray.reduce((acc: any, current: any) => {
    const student_id = current.student_id._id as string;
    const docDay = new Date(current.createdAt).getDate();

    const isAlreadyRegistered =
      acc[student_id] && acc[student_id].some((attendance: any) => new Date(attendance.createdAt).getDate() === docDay);

    if (!isAlreadyRegistered) {
      return {
        ...acc,
        [student_id]: [current],
      };
    }

    return {
      ...acc,
      [student_id]: [...acc[student_id], current],
    };
  }, {});

  const attendancesByStudentGenderTotals = Object.keys(attendancesByStudent).reduce((acc: any, sdt_id: any) => {
    const current = attendancesByStudent[sdt_id];
    return {
      ...acc,
      [sdt_id]: processAttendancesByDateAndGender(current[sdt_id]),
    };
  }, {});

  const arrayByGender = Object.keys(attendancesByStudentGenderTotals).reduce((acc: any, sdt_id: any) => {
    const totalAttendancesByStudent = attendancesByStudentGenderTotals[sdt_id];
    return {
      female: acc.female + totalAttendancesByStudent.female,
      male: acc.male + totalAttendancesByStudent.male,
      total: acc.total + totalAttendancesByStudent.total,
    };
  }, genderProcessedDataInitialValue);

  return arrayByGender;
};

export default processAttendancesByStudentAndGender;

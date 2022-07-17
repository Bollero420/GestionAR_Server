import { Grade, Student } from '../../../models';

import { groupBy } from '../../../helpers';

import { AnnuallyReport, StudentsByLevel, LevelKeys } from '../../../types';

import {
  processStudentsByGender,
  processRepeatersByGender,
  processStudentsByAgeAndGender,
  processStudentsByCountryAndGender,
} from '../processors';

const generateInitialAnnuallyReport = async () => {
  try {
    let report: AnnuallyReport = {} as AnnuallyReport;

    const grades = await Grade.find({ section: 'A', shift: 'M' }, { students: 1, level: 1 })
      .populate('students')
      .lean(true);
    const gradesLevels = [...new Set([...grades.map((grade) => grade.level)])];
    const gradesByLevel: StudentsByLevel = groupBy(grades, 'level', {
      '1': [],
      '2': [],
      '3': [],
      '4': [],
      '5': [],
      '6': [],
      '7': [],
    });

    const keys = Object.keys(gradesByLevel);
    const studentsByLevel = keys.map((k: LevelKeys) =>
      gradesByLevel[k].reduce(
        (prev, current) => ({
          [k]: (prev[k] || []).concat([...current.students]),
        }),
        {} as any
      )
    );

    console.log('studentsByLevel ->', studentsByLevel);

    const genderByGradesReport = [{ row: 'female' }, { row: 'male' }, { row: 'total' }];

    studentsByLevel.forEach((students: any, i) => {
      const level = i + 1;

      const processedData = processStudentsByGender(students[level]);

      Object.keys(processedData).forEach((key) => {
        const idx = genderByGradesReport.findIndex((report) => report.row === key);

        const value = processedData[key];

        genderByGradesReport[idx] = {
          ...genderByGradesReport[idx],
          [`_total_${key}`]: (genderByGradesReport[idx][`_total_${key}`] ?? 0) + value,
          [`_${level}_${key}`]: value,
        };
      });
    });

    report.genderByGrades = genderByGradesReport;

    // const milk_cup_results = await Student.find({ milk_cup: true }).lean(true);
    // const processedMilkCup = processStudentsByGender(milk_cup_results);
    // const school_dining_results = await Student.find({ school_dining: true }).lean(true);
    // const processedDining = processStudentsByGender(school_dining_results);

    // console.log('processedMilkCup ->', processedMilkCup);
    // console.log('processedDining ->', processedDining);

    // report.foodServiceByGenders = [{ ...processedMilkCup }, { ...processedDining }];

    // console.log('foodServiceByGenders ->', report.foodServiceByGenders);

    // report.repeatersByGender = processRepeatersByGender(gradesLevels, studentsByLevel);

    // console.log('repeatersByGender ->', report.repeatersByGender);

    // report.studentsByAgeAndGender = processStudentsByAgeAndGender(gradesLevels, studentsByLevel);

    // console.log('studentsByAgeAndGender ->', report.studentsByAgeAndGender);

    // report.studentsByCountryAndGender = await processStudentsByCountryAndGender(gradesLevels, studentsByLevel);

    return report;
  } catch (error) {
    console.log('Error - generateInitialAnnuallyReport ->', error);
  }
};

export default generateInitialAnnuallyReport;

import { Grade, Student } from '../../../models';

import { groupBy } from '../../../helpers';

import { AnnuallyReport, StudentsByLevel, LevelKeys } from '../../../types';

import { processStudentsByGender, processRepeatersByGender, processStudentsByAgeAndGender } from '../processors';

const generateInitialAnnuallyReport = async () => {
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

  report.genderByGrades = studentsByLevel.map((students: any, i) => processStudentsByGender(students[i + 1]));

  const milk_cup_results = await Student.find({ milk_cup: true }).lean(true);
  const processedMilkCup = processStudentsByGender(milk_cup_results);
  const school_dining_results = await Student.find({ school_dining: true }).lean(true);
  const processedDining = processStudentsByGender(school_dining_results);

  report.foodServiceByGenders = [{ ...processedMilkCup }, { ...processedDining }];

  report.repeatersByGender = processRepeatersByGender(gradesLevels, studentsByLevel);

  report.studentsByAgeAndGender = processStudentsByAgeAndGender(gradesLevels, studentsByLevel);

  // report.studentsByCountry = getStudentsByCountry(gradesLevels, studentsByLevel);

  // anual inicial:
  /*
      genderByGrades
      foodServiceByGenders
      repeatersByGender
      studentsByAgeAndGender
      studentsByCountry
    */
  return report;
};

export default generateInitialAnnuallyReport;

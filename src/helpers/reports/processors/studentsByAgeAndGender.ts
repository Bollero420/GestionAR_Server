import { IStudent } from '../../../types/interfaces';

import { studentsByAge } from '../../../utils/constants';

import { getAge, getAgeKey } from '../../parsers';
import processStudentsByGender from './studentsByGender';

const processStudentsByAgeAndGender = (gradesLevels: string[], studentsByLevel: any[]) => {
  let students_by_age: any[] = [
    { row: 'five' },
    { row: 'six' },
    { row: 'seven' },
    { row: 'eight' },
    { row: 'nine' },
    { row: 'ten' },
    { row: 'eleven' },
    { row: 'twelve' },
    { row: 'thirteen' },
    { row: 'fourteen' },
    { row: 'fifteen' },
    { row: 'sixteen' },
    { row: 'seventeen' },
    { row: 'eighteen' },
  ];

  for (let level of gradesLevels) {
    const students: IStudent[] = studentsByLevel[parseInt(level) - 1][level];

    const filteredStudents = students.reduce((acc, current) => {
      const key = getAgeKey(getAge(current.birth_date.toDateString()));
      return {
        ...acc,
        [key]: (acc[key] || []).concat(current),
      };
    }, studentsByAge);

    const agesOnLevel: string[] = Object.keys(filteredStudents);

    const processedStudents = agesOnLevel.reduce((acc, age) => {
      const studentsFromAge = filteredStudents[age];
      return {
        ...acc,
        [age]: processStudentsByGender(studentsFromAge),
      };
    }, {});

    agesOnLevel.forEach((age) => {
      // get age index (row) from acc
      const ageIdx = students_by_age.findIndex((s_b_a: any) => s_b_a.row === age);
      // get processedData for age for level
      const value = processedStudents[age];

      students_by_age[ageIdx] = {
        ...students_by_age[ageIdx],
        // increment total value on country row.
        ['_total_female']: (students_by_age[ageIdx]['_total_female'] ?? 0) + value.female,
        ['_total_male']: (students_by_age[ageIdx]['_total_male'] ?? 0) + value.male,
        ['_total_total']: (students_by_age[ageIdx]['_total_total'] ?? 0) + value.total,
        // set values from level on country row.
        [`_${level}_female`]: value.female,
        [`_${level}_male`]: value.male,
        [`_${level}_total`]: value.total,
      };
    });
  }
  return students_by_age;
};

export default processStudentsByAgeAndGender;

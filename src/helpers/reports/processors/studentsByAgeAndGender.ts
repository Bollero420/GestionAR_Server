import { IStudent } from '../../../types/interfaces';
import { StudentsByAge, StudentsByAgeKeys } from '../../../types';

import { ageArray, genderProcessedDataInitialValue, studentsByAge } from '../../../utils/constants';

import { getAge, getAgeKey } from '../../parsers';
import processStudentsByGender from './studentsByGender';

export const processStudentsByAgeAndGender = (gradesLevels: string[], studentsByLevel: any[]) => {
  let students_by_age = Array(14).fill({});

  for (let level of gradesLevels) {
    const students: IStudent[] = studentsByLevel[parseInt(level) - 1][level];
    const filteredStudents = students.reduce((acc, current) => {
      const key = getAgeKey(getAge(current.birth_date.toDateString()));
      return {
        ...acc,
        [key]: (acc[key] || []).concat(current),
      };
    }, studentsByAge);

    const processedStudents: StudentsByAge = {
      five: processStudentsByGender(filteredStudents.five),
      six: processStudentsByGender(filteredStudents.six),
      seven: processStudentsByGender(filteredStudents.seven),
      eight: processStudentsByGender(filteredStudents.eight),
      nine: processStudentsByGender(filteredStudents.nine),
      ten: processStudentsByGender(filteredStudents.ten),
      eleven: processStudentsByGender(filteredStudents.eleven),
      twelve: processStudentsByGender(filteredStudents.twelve),
      thirteen: processStudentsByGender(filteredStudents.thirteen),
      fourteen: processStudentsByGender(filteredStudents.fourteen),
      fifteen: processStudentsByGender(filteredStudents.fifteen),
      sixteen: processStudentsByGender(filteredStudents.sixteen),
      seventeen: processStudentsByGender(filteredStudents.seventeen),
      eighteen: processStudentsByGender(filteredStudents.eighteen),
    };

    const totalByGender = Object.keys(processedStudents).reduce((acc, ages: StudentsByAgeKeys) => {
      const value = processedStudents[ages];

      return {
        female: acc.female + value.female,
        male: acc.male + value.male,
        total: acc.total + value.total,
      };
    }, genderProcessedDataInitialValue);

    for (let index = 0; index < students_by_age.length; index++) {
      if (index === 0) {
        students_by_age[index] = {
          ...students_by_age[index],
          [`_${level}_female`]: totalByGender.female,
          [`_${level}male`]: totalByGender.male,
          [`_${level}total`]: totalByGender.total,
        };
      } else {
        const ageKey: StudentsByAgeKeys = ageArray[index];
        if (ageKey) {
          students_by_age[index] = {
            ...students_by_age[index],
            [`_${level}_female`]: processedStudents[ageKey].female,
            [`_${level}male`]: processedStudents[ageKey].male,
            [`_${level}total`]: processedStudents[ageKey].total,
          };
        }
      }
    }
  }
  return students_by_age;
};

export default processStudentsByAgeAndGender;

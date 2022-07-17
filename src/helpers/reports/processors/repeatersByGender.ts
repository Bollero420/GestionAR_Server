import { RepeatersByQuantity, RepeatersKey } from '../../../types';
import { IStudent } from '../../../types/interfaces';

import { repeatersByQuantity, genderProcessedDataInitialValue, repeatersArray } from '../../../utils/constants';

import processStudentsByGender from './studentsByGender';

import { getRepeatingQuantityKey } from '../../../helpers/parsers';

const processRepeatersByGender = (gradesLevels: string[], studentsByLevel: any[]) => {
  let repeaters_by_gender = Array(5).fill({});

  for (let level of gradesLevels) {
    const students: IStudent[] = studentsByLevel[parseInt(level) - 1][level];
    const filteredStudents = students.reduce((acc, current) => {
      const key = getRepeatingQuantityKey(current.repeating_quantity);
      return {
        ...acc,
        [key]: (acc[key] || []).concat(current),
      };
    }, repeatersByQuantity);

    const processedStudents: RepeatersByQuantity = {
      first: processStudentsByGender(filteredStudents.first),
      second: processStudentsByGender(filteredStudents.second),
      third: processStudentsByGender(filteredStudents.third),
      forth: processStudentsByGender(filteredStudents.forth),
    };

    const totalByGender = Object.keys(processedStudents).reduce((acc, repeaters: RepeatersKey) => {
      const value = processedStudents[repeaters];

      return {
        female: acc.female + value.female,
        male: acc.male + value.male,
        total: acc.total + value.total,
      };
    }, genderProcessedDataInitialValue);

    for (let index = 0; index < repeaters_by_gender.length; index++) {
      if (index === 0) {
        repeaters_by_gender[index] = {
          ...repeaters_by_gender[index],
          [`_${level}_female`]: totalByGender.female,
          [`_${level}_male`]: totalByGender.male,
          [`_${level}_total`]: totalByGender.total,
        };
      } else {
        const repeaterKey: RepeatersKey = repeatersArray[index];
        if (repeaterKey) {
          repeaters_by_gender[index] = {
            ...repeaters_by_gender[index],
            [`_${level}_female`]: processedStudents[repeaterKey].female,
            [`_${level}_male`]: processedStudents[repeaterKey].male,
            [`_${level}_total`]: processedStudents[repeaterKey].total,
          };
        }
      }
    }
  }
  return repeaters_by_gender;
};

export default processRepeatersByGender;

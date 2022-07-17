import { IStudent } from '../../../types/interfaces';

import { repeatersByQuantity } from '../../../utils/constants';

import processStudentsByGender from './studentsByGender';

import { getRepeatingQuantityKey } from '../../../helpers/parsers';

const processRepeatersByGender = (gradesLevels: string[], studentsByLevel: any[]) => {
  let repeaters_by_gender = [{ row: 'total' }, { row: 'first' }, { row: 'second' }, { row: 'third' }, { row: 'forth' }];

  for (let level of gradesLevels) {
    const students: IStudent[] = studentsByLevel[parseInt(level) - 1][level];

    const filteredStudents = students.reduce((acc, current) => {
      const key = getRepeatingQuantityKey(current.repeating_quantity);
      if (key === 'none') return acc;
      return {
        ...acc,
        [key]: (acc[key] || []).concat(current),
      };
    }, repeatersByQuantity);

    const rptQty: string[] = Object.keys(filteredStudents);

    const processedStudents = rptQty.reduce((acc, age) => {
      const studentsFromCountry = filteredStudents[age];
      return {
        ...acc,
        [age]: processStudentsByGender(studentsFromCountry),
      };
    }, {});

    // get total by level
    const totalByLevel = rptQty.reduce((acc: any, repeaters: any) => {
      const value = processedStudents[repeaters];

      return {
        [`_${level}_total_female`]: (acc[`_${level}_total_female`] ?? 0) + value.female,
        [`_${level}_total_male`]: (acc[`_${level}_total_male`] ?? 0) + value.male,
        [`_${level}_total_total`]: (acc[`_${level}_total_total`] ?? 0) + value.total,
      };
    }, {});

    rptQty.forEach((amount) => {
      // get age index (row) from acc
      const amountIdx = repeaters_by_gender.findIndex((s_b_c: any) => s_b_c.row === amount);
      // get processedData for age for level
      const value = processedStudents[amount];

      repeaters_by_gender[amountIdx] = {
        // save row
        ...repeaters_by_gender[amountIdx],
        // save values from level
        [`_${level}_female`]: value.female,
        [`_${level}_male`]: value.male,
        [`_${level}_total`]: value.total,
      };

      repeaters_by_gender[0] = {
        ...repeaters_by_gender[0],
        // save total values
        ...totalByLevel,
      };
    });
  }
  return repeaters_by_gender;
};

export default processRepeatersByGender;

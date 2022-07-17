import { Student } from '../../../models';
import { IStudent } from '../../../types/interfaces';

import processStudentsByGender from './studentsByGender';

const processStudentsByCountryAndGender = async (gradesLevels: string[], studentsByLevel: any[]) => {
  try {
    let students_by_country = await Student.find({}).distinct('country');

    students_by_country = students_by_country.map((v) => ({ row: v.toLowerCase() }));

    for (let level of gradesLevels) {
      const students: IStudent[] = studentsByLevel[parseInt(level) - 1][level];

      const filteredStudents = students.reduce((acc, current) => {
        const key = current.country.toLowerCase();
        return {
          ...acc,
          [key]: (acc[key] || []).concat(current),
        };
      }, {});

      const countriesOnLevel = Object.keys(filteredStudents);

      const processedStudents = countriesOnLevel.reduce((acc, country) => {
        const studentsFromCountry = filteredStudents[country];
        return {
          ...acc,
          [country]: processStudentsByGender(studentsFromCountry),
        };
      }, {});

      countriesOnLevel.forEach((country) => {
        // get country index (row) from acc
        const countryIdx = students_by_country.findIndex((s_b_c: any) => s_b_c.row === country);
        // get processedData for country for level
        const value = processedStudents[country];

        students_by_country[countryIdx] = {
          ...students_by_country[countryIdx],
          // increment total value on country row.
          ['_total_female']: (students_by_country[countryIdx]['_total_female'] ?? 0) + value.female,
          ['_total_male']: (students_by_country[countryIdx]['_total_male'] ?? 0) + value.male,
          ['_total_total']: (students_by_country[countryIdx]['_total_total'] ?? 0) + value.total,
          // set values from level on country row.
          [`_${level}_female`]: value.female,
          [`_${level}_male`]: value.male,
          [`_${level}_total`]: value.total,
        };
      });
    }
    return students_by_country;
  } catch (error) {
    console.log('Error - processStudentsByCountryAndGender ->', error);
  }
};

export default processStudentsByCountryAndGender;

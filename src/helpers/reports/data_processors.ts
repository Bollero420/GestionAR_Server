import { DocumentDefinition } from 'mongoose';

import { IStudent } from '../../types/interfaces/IStudent';
import { GENDER } from '../../types/interfaces/IPerson';
import { IAttendance } from '../../types/interfaces/IAttendance';
import {
  GenderProcessedData,
  RepeatersByQuantity,
  RepeatersKey,
  StudentsByAge,
  StudentsByAgeKeys,
} from '../../types/interfaces/IProcessors';

import {
  ageArray,
  genderProcessedDataInitialValue,
  repeatersArray,
  repeatersByQuantity,
  studentsByAge,
  SUBJECT_QTY,
} from '../../utils/constants';
import { getAge, getAgeKey, getRepeatingQuantityKey } from '../parsers/';

export const processStudentsByGender = (data: DocumentDefinition<IStudent>[]): GenderProcessedData => {
  const reducedData = data.reduce((prev, current) => {
    switch (current.gender) {
      case GENDER.MASCULINO:
        return {
          ...prev,
          male: prev.male++,
        };
      case GENDER.FEMENINO:
        return {
          ...prev,
          female: prev.female++,
        };
    }
  }, genderProcessedDataInitialValue);

  reducedData.total = data.length;

  return reducedData;
};

export const processAttendancesByDateAndGender = (
  data: DocumentDefinition<IAttendance>[],
  daysQtyOfTheMonth: number
): GenderProcessedData => {
  const reducedData = data.reduce((prev, current: any) => {
    switch (current.student_id.gender) {
      case GENDER.MASCULINO:
        return {
          ...prev,
          male: Math.round(current.attendancesAmount / SUBJECT_QTY / daysQtyOfTheMonth),
        };
      case GENDER.FEMENINO:
        return {
          ...prev,
          female: Math.round(current.attendancesAmount / SUBJECT_QTY / daysQtyOfTheMonth),
        };
    }
  }, genderProcessedDataInitialValue);

  reducedData.total = data.length;

  return reducedData;
};

export const getRepeatersByGender = (gradesLevels: Set<number>, studentsByLevel: any[]) => {
  let repeaters_by_gender = Array(5).fill({});

  for (let level of gradesLevels) {
    const students: IStudent[] = studentsByLevel[level - 1];
    const filteredStudents = students.reduce((acc, current) => {
      const key = getRepeatingQuantityKey(current.repeating_quantity);
      return {
        ...acc,
        [key]: [...acc[key], current],
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
          [`_${level}male`]: totalByGender.male,
          [`_${level}total`]: totalByGender.total,
        };
        return;
      }

      const repeaterKey: RepeatersKey = repeatersArray[index];

      repeaters_by_gender[index] = {
        ...repeaters_by_gender[index],
        [`_${level}_female`]: processedStudents[repeaterKey].female,
        [`_${level}male`]: processedStudents[repeaterKey].male,
        [`_${level}total`]: processedStudents[repeaterKey].total,
      };
    }
  }

  return repeaters_by_gender;
};

export const getStudentsByAgeAndGender = (gradesLevels: Set<number>, studentsByLevel: any[]) => {
  let students_by_age = Array(14).fill({});

  for (let level of gradesLevels) {
    const students: IStudent[] = studentsByLevel[level - 1];
    const filteredStudents = students.reduce((acc, current) => {
      const key = getAgeKey(getAge(current.birth_date.toDateString()));
      return {
        ...acc,
        [key]: [...acc[key], current],
      };
    }, studentsByAge);

    let processedStudents: StudentsByAge = {
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
        return;
      }

      const ageKey: StudentsByAgeKeys = ageArray[index];

      students_by_age[index] = {
        ...students_by_age[index],
        [`_${level}_female`]: processedStudents[ageKey].female,
        [`_${level}male`]: processedStudents[ageKey].male,
        [`_${level}total`]: processedStudents[ageKey].total,
      };
    }
  }
  return students_by_age;
};
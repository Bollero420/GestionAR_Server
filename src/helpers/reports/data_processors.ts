import { DocumentDefinition } from 'mongoose';

import { IStudent } from '../../types/interfaces/IStudent';
import { GENDER } from '../../types/interfaces/IPerson';
import { IAttendance } from '../../types/interfaces/IAttendance';

import { SUBJECT_QTY } from '../../utils/constants';

export type MonthlyProcessedData = {
  female: number;
  male: number;
  total: number;
};

export type LevelKeys = '1' | '2' | '3' | '4' | '5' | '6' | '7';
export type StudentsByLevel = {
  [k in LevelKeys]: {
    level: string;
    students: IStudent[];
  }[];
};

const initialValue = {
  female: 0,
  male: 0,
  total: 0,
};

export const processStudentsByGender = (data: DocumentDefinition<IStudent>[]): MonthlyProcessedData => {
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
  }, initialValue);

  reducedData.total = data.length;

  return reducedData;
};

export const processAttendancesByDateAndGender = (
  data: DocumentDefinition<IAttendance>[],
  daysQtyOfTheMonth: number
): MonthlyProcessedData => {
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
  }, initialValue);

  reducedData.total = data.length;

  return reducedData;
};

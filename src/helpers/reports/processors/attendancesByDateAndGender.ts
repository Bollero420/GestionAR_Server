import { DocumentDefinition } from 'mongoose';

import { GenderProcessedData } from '../../../types';
import { IAttendance } from '../../../types/interfaces';
import { GENDER } from '../../../types/enum';

import { genderProcessedDataInitialValue } from '../../../utils/constants';

export const processAttendancesByDateAndGender = (data: DocumentDefinition<IAttendance>[]): GenderProcessedData => {
  const reducedData = data.reduce((prev, current: any) => {
    switch (current.student_id.gender) {
      case GENDER.MASCULINO:
        return {
          ...prev,
          male: prev.male + 1,
        };
      case GENDER.FEMENINO:
        return {
          ...prev,
          female: prev.female + 1,
        };
      default:
        return { ...prev };
    }
  }, genderProcessedDataInitialValue);

  reducedData.total = data.length;

  return reducedData;
};

export default processAttendancesByDateAndGender;

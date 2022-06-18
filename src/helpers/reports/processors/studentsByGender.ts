import { DocumentDefinition } from 'mongoose';

import { GenderProcessedData } from '../../../types';
import { IStudent } from '../../../types/interfaces';
import { GENDER } from '../../../types/enum';

import { genderProcessedDataInitialValue } from '../../../utils/constants';

export const processStudentsByGender = (data: DocumentDefinition<IStudent>[]): GenderProcessedData => {
  const reducedData = data.reduce((prev, current) => {
    switch (current.gender as GENDER) {
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

export default processStudentsByGender;

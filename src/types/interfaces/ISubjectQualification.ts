import { IQualification } from "./IQualification";

enum SUBJECT_QUALIFICATION_VALUE {
  NOT_ENOUGH = 'NOT_ENOUGH',
  ENOUGH = 'ENOUGH',
  GOOD = 'GOOD',
  VERY_GOOD = 'VERY_GOOD',
  EXCELLENT = 'EXCELLENT'
}

export interface ISubjectQualification extends IQualification {
  value: SUBJECT_QUALIFICATION_VALUE;
}
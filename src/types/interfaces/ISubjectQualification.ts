import { SUBJECT_QUALIFICATION_VALUE } from '../enum';

import IQualification from './IQualification';

interface ISubjectQualification extends IQualification {
  value: SUBJECT_QUALIFICATION_VALUE;
}

export default ISubjectQualification;

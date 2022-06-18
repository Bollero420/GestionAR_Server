import { OBSERVATION_VALUE } from '../enum';

import IQualification from './IQualification';

interface IObservation extends IQualification {
  description: string;
  worry_and_effort: OBSERVATION_VALUE;
  respect_rules: OBSERVATION_VALUE;
  solidarity_and_collaboration: OBSERVATION_VALUE;
  group_responsibility: OBSERVATION_VALUE;
}

export default IObservation;

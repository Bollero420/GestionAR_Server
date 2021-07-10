import { IQualification } from "./IQualification";

enum OBSERVATION_VALUE {
  NEVER = 'NEVER',
  A_FEW_TIMES = 'A_FEW_TIMES',
  SOMETIMES = 'SOMETIMES',
  FREQUENTLY = 'FREQUENTLY',
  ALWAYS = 'ALWAYS'
}

export interface IObservation extends IQualification {
  description: string;
  worry_and_effort: OBSERVATION_VALUE;
  respect_rules: OBSERVATION_VALUE;
  solidarity_and_collaboration: OBSERVATION_VALUE;
  group_responsibility: OBSERVATION_VALUE;
}
import { IStudent } from './IStudent';

export type StudentsByAge = {
  [k in StudentsByAgeKeys]: GenderProcessedData;
};

export type StudentsByAgeKeys =
  | 'five'
  | 'six'
  | 'seven'
  | 'eight'
  | 'nine'
  | 'ten'
  | 'eleven'
  | 'twelve'
  | 'thirteen'
  | 'fourteen'
  | 'fifteen'
  | 'sixteen'
  | 'seventeen'
  | 'eighteen';

export type GenderProcessedData = {
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

export type RepeatersKey = 'first' | 'second' | 'third' | 'forth';

export type RepeatersByQuantity = {
  [k in RepeatersKey]: GenderProcessedData;
};

export type MonthlyReport = {
  previousMonth: GenderProcessedData;
  newThisMonth: GenderProcessedData;
  goneThisMonth: GenderProcessedData;
  leftThisMonth: GenderProcessedData;
  attendancesThisMonth: GenderProcessedData;
  unAttendancesThisMonth: GenderProcessedData;
  attendancesAverage: GenderProcessedData;
};

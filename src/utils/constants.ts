import { RepeatersKey } from '../types/interfaces/IProcessors';
import { StudentsByAgeKeys } from '../types/interfaces/IProcessors';
import { IStudent } from '../types/interfaces/IStudent';

export const ACCESS_TOKEN_HEADER = 'access-token';
export const REFRESH_TOKEN_HEADER = 'refresh-token';

export const ACCESS_MAX_AGE_SECONDS = 1 * 60 * 60;
export const ACCESS_MAX_AGE_MILI_SECONDS = ACCESS_MAX_AGE_SECONDS * 1000;

export const REFRESH_MAX_AGE_SECONDS = 2 * 60 * 60;
export const REFRESH_MAX_AGE_MILI_SECONDS = REFRESH_MAX_AGE_SECONDS * 1000;

export const SUBJECT_QTY = 10;

export const ageArray: StudentsByAgeKeys[] = [
  'five',
  'six',
  'seven',
  'eight',
  'nine',
  'ten',
  'eleven',
  'twelve',
  'thirteen',
  'fourteen',
  'fifteen',
  'sixteen',
  'seventeen',
  'eighteen',
];

export const repeatersArray: RepeatersKey[] = ['first', 'second', 'third', 'forth'];

export const repeatersByQuantity = {
  first: [] as IStudent[],
  second: [] as IStudent[],
  third: [] as IStudent[],
  forth: [] as IStudent[],
};

export const studentsByAge = {
  five: [] as IStudent[],
  six: [] as IStudent[],
  seven: [] as IStudent[],
  eight: [] as IStudent[],
  nine: [] as IStudent[],
  ten: [] as IStudent[],
  eleven: [] as IStudent[],
  twelve: [] as IStudent[],
  thirteen: [] as IStudent[],
  fourteen: [] as IStudent[],
  fifteen: [] as IStudent[],
  sixteen: [] as IStudent[],
  seventeen: [] as IStudent[],
  eighteen: [] as IStudent[],
};

export const genderProcessedDataInitialValue = {
  female: 0,
  male: 0,
  total: 0,
};

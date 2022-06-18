import { StudentsByAgeKeys, RepeatersKey } from '../types';
import { IStudent } from '../types/interfaces';

const {
  JANUAY_HOLIDAYS,
  FEBRUARY_HOILIDAYS,
  MARCH_HOLIDAYS,
  APRIL_HOLIDAYS,
  MAY_HOLIDAYS,
  JUNE_HOLIDAYS,
  JULY_HOLIDAYS,
  AGUST_HOLIDAYS,
  SEPTEMBER_HOLIDAYS,
  OCTOBER_HOLIDAYS,
  NOVEMBER_HOLIDAYS,
  DECEMBER_HOLIDAYS,
} = process.env;

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

const currentYear = new Date().getFullYear();

export const availableDays = [
  new Date(currentYear, 1, 0).getDate() - parseInt(JANUAY_HOLIDAYS),
  new Date(currentYear, 2, 0).getDate() - parseInt(FEBRUARY_HOILIDAYS),
  new Date(currentYear, 3, 0).getDate() - parseInt(MARCH_HOLIDAYS),
  new Date(currentYear, 4, 0).getDate() - parseInt(APRIL_HOLIDAYS),
  new Date(currentYear, 5, 0).getDate() - parseInt(MAY_HOLIDAYS),
  new Date(currentYear, 6, 0).getDate() - parseInt(JUNE_HOLIDAYS),
  new Date(currentYear, 7, 0).getDate() - parseInt(JULY_HOLIDAYS),
  new Date(currentYear, 8, 0).getDate() - parseInt(AGUST_HOLIDAYS),
  new Date(currentYear, 9, 0).getDate() - parseInt(SEPTEMBER_HOLIDAYS),
  new Date(currentYear, 10, 0).getDate() - parseInt(OCTOBER_HOLIDAYS),
  new Date(currentYear, 11, 0).getDate() - parseInt(NOVEMBER_HOLIDAYS),
  new Date(currentYear, 0, 0).getDate() - parseInt(DECEMBER_HOLIDAYS),
];

import { IGrade } from '../types/interfaces';

import { availableDays } from '../utils/constants';

export const generateDateHelpers = (month = 0, year = 0, day = 0) => ({
  previousMonth: month === 0 ? 11 : month - 1,
  nextMonth: month === 11 ? 0 : month + 1,
  //? TO.DO: store amount of available days per month and use it instead of daysQtyOfTheMonth.
  // Add a new collection for StudentYear? to include this kind of information.
  daysQtyOfTheMonth: availableDays[month],
  previousTwoMonth: month === 1 ? 11 : month === 0 ? 10 : month - 2,
  nextTwoMonth: month === 11 ? 1 : month === 10 ? 0 : month + 2,
});

export const groupBy = (items: any[], key: string, initialData = {}) =>
  items.reduce(
    (result, item) => ({
      ...result,
      [item[key]]: [...(result[item[key]] || []), item],
    }),
    initialData
  );

export const isQualificationCompleted = (qualifications: any[], observation: any) => {
  if (Object.keys(observation)?.some((obsKey) => observation[obsKey] === '')) {
    return false;
  }

  if (qualifications.some((qual: any) => !qual.value)) {
    return false;
  }

  return true;
};

export const useDateHelpersByDate = (date: string) => {
  const formattedDate = new Date(date.toString());

  // Get current date values
  const year = new Date(date.toString()).getFullYear();
  const month = new Date(date.toString()).getMonth();
  const day = new Date(date.toString()).getDate();

  // Get future date values
  // si es el ultimo dia del ultimo mes, entonces es year + 1
  const nextYear = day === new Date(year, 12, 0).getDate() && month === 11 ? year + 1 : year;
  // si es el ultimo dia del mes, entonces es month + 1
  const nextMonth = day === new Date(year, month + 1, 0).getDate() ? month + 1 : month;
  // si es el ultimo dia del mes devolvemos 1
  const nextDay = day + 1;

  //Get past date values
  const previousMonth = day === 1 ? (month === 0 ? 11 : month - 1) : month;
  const previousYear = day === 1 && month === 0 ? year - 1 : year;
  const previousDay = day === 1 ? new Date(year, month, 0).getDate() : day - 1;

  return {
    date,
    formattedDate,
    year,
    month,
    day,
    previousMonth,
    previousYear,
    previousDay,
    nextMonth,
    nextYear,
    nextDay,
  };
};

export const sortGrades = (grades: IGrade[]): void => {
  grades.sort((a, b) => {
    if (a.level === b.level) {
      return a.section > b.section ? 1 : -1;
    }
    return parseInt(a.level) > parseInt(b.level) ? 1 : -1;
  });
};

export const parseGradeName = (grade: IGrade): string => {
  let name = '';
  switch (grade.level) {
    case '1':
      name = '1ero';
      break;
    case '2':
      name = '2ndo';
      break;
    case '3':
      name = '3ero';
      break;
    case '4':
      name = '4to';
      break;
    case '5':
      name = '5to';
      break;
    case '6':
      name = '6to';
      break;
    case '7':
      name = '7to';
      break;
  }
  const result = `${name} "${grade.section}"`;
  return result;
};

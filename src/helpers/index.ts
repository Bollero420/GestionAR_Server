import { availableDays } from '../utils/constants';

export const generateDateHelpers = (month = 0, year = 0, day = 0) => ({
    previousMonth: month === 0 ? 11 : month - 1,
    nextMonth: month === 11 ? 0 : month + 1,
      //? TO.DO: store amount of available days per month and use it instead of daysQtyOfTheMonth.
      // Add a new collection for StudentYear? to include this kind of information.
    daysQtyOfTheMonth: availableDays[month],
    previousTwoMonth : month === 1 ? 11 : month === 0 ? 10 : month - 2,
    nextTwoMonth: month === 11 ? 1 :  month === 10 ? 0 : month + 2
  });

export const groupBy = (items: any[], key: string) =>
  items.reduce(
    (result, item) => ({
      ...result,
      [item[key]]: [...(result[item[key]] || []), item],
    }),
    {}
  );

  export const isQualificationCompleted = (qualifications: any[], observation: any) => {
    if (Object.keys(observation).some(obsKey => observation[obsKey] === '')) {
      return false
    };

    if (qualifications.some((qual: any) => !qual.value)) {
      return false
    }

    return true
  } 
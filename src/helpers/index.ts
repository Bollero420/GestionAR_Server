export const generateDateHelpers = (month = 0, year = 0, day = 0) => ({
    previousMonth: month === 0 ? 11 : month - 1,
    nextMonth: month === 11 ? 0 : month + 1,
    daysQtyOfTheMonth: new Date(year, month, 0).getDate(),
    previousTwoMonth = month === 1 ? 11 : month === 0 ? 10 : month - 2;
    nextTwoMonth = month === 11 ? 1 :  month === 10 ? 0 : month + 2;
  });

export const groupBy = (items: any[], key: string) =>
  items.reduce(
    (result, item) => ({
      ...result,
      [item[key]]: [...(result[item[key]] || []), item],
    }),
    {}
  );
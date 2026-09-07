export const getYearsSince = (date: Temporal.PlainDate): number => {
  const today = Temporal.Now.plainDateISO();

  return date.until(today, { largestUnit: 'years' }).years;
};

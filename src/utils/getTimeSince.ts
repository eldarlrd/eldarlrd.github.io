interface TimeSince {
  days: number;
  years: number;
}

export const getTimeSince = (date: Temporal.PlainDate): TimeSince => {
  const today = Temporal.Now.plainDateISO();
  const years = date.until(today, { largestUnit: 'years' }).years;
  const days = date.until(today, { largestUnit: 'days' }).days;

  return { days, years };
};

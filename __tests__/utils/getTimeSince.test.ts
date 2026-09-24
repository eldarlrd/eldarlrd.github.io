import { describe, expect, test as it } from 'bun:test';

import { getTimeSince } from '%/getTimeSince.ts';

const YEARS_SINCE_BIRTHDAY = 24;
const YEARS_SINCE_BIRTHDAY_TOMORROW = YEARS_SINCE_BIRTHDAY - 1;

describe('getTimeSince', () => {
  it('returns elapsed days and years for today and yesterday', () => {
    const today = Temporal.Now.plainDateISO();
    const yesterday = today.subtract({ days: 1 });

    expect(getTimeSince(today)).toEqual({ days: 0, years: 0 });
    expect(getTimeSince(yesterday)).toEqual({ days: 1, years: 0 });
  });

  it('counts completed years using calendar dates', () => {
    const today = Temporal.Now.plainDateISO();
    const birthday = today.subtract({ years: YEARS_SINCE_BIRTHDAY });
    const birthdayTomorrow = birthday.add({ days: 1 });
    const birthdayYesterday = birthday.subtract({ days: 1 });

    expect(getTimeSince(birthday)).toMatchObject({ years: YEARS_SINCE_BIRTHDAY });
    expect(getTimeSince(birthdayTomorrow)).toMatchObject({ years: YEARS_SINCE_BIRTHDAY_TOMORROW });
    expect(getTimeSince(birthdayYesterday)).toMatchObject({ years: YEARS_SINCE_BIRTHDAY });
  });
});

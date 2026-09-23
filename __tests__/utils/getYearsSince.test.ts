import { describe, expect, test as it } from 'bun:test';

import { getYearsSince } from '%/getYearsSince.ts';

const YEARS_SINCE_BIRTHDAY = 24;
const YEARS_SINCE_BIRTHDAY_TOMORROW = YEARS_SINCE_BIRTHDAY - 1;

describe('getYearsSince', () => {
  it('returns zero for today', () => {
    const today = Temporal.Now.plainDateISO();

    expect(getYearsSince(today)).toBe(0);
  });

  it('counts completed years using calendar dates', () => {
    const today = Temporal.Now.plainDateISO();
    const birthday = today.subtract({ years: YEARS_SINCE_BIRTHDAY });
    const birthdayTomorrow = birthday.add({ days: 1 });
    const birthdayYesterday = birthday.subtract({ days: 1 });

    expect(getYearsSince(birthday)).toBe(YEARS_SINCE_BIRTHDAY);
    expect(getYearsSince(birthdayTomorrow)).toBe(YEARS_SINCE_BIRTHDAY_TOMORROW);
    expect(getYearsSince(birthdayYesterday)).toBe(YEARS_SINCE_BIRTHDAY);
  });
});

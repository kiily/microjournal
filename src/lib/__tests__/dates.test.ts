import {
  getTodayString,
  formatDateString,
  parseDateString,
  getTimeOfDay,
  getCurrentTimeOfDay,
  formatDisplayDate,
  getDayOfYear,
  getDaysInMonth,
  getDaysInMonthArray,
  getMonthStartDayOfWeek,
  formatTimer,
  getSeason,
} from '../dates';

describe('formatDateString', () => {
  it('formats date correctly', () => {
    const date = new Date(2024, 1, 5); // Feb 5, 2024
    expect(formatDateString(date)).toBe('2024-02-05');
  });

  it('handles single-digit months and days', () => {
    const date = new Date(2024, 0, 1); // Jan 1
    expect(formatDateString(date)).toBe('2024-01-01');
  });
});

describe('parseDateString', () => {
  it('parses YYYY-MM-DD correctly', () => {
    const date = parseDateString('2024-02-05');
    expect(date.getFullYear()).toBe(2024);
    expect(date.getMonth()).toBe(1); // 0-indexed
    expect(date.getDate()).toBe(5);
  });
});

describe('getTimeOfDay', () => {
  it('returns morning for 5-10', () => {
    expect(getTimeOfDay(5)).toBe('morning');
    expect(getTimeOfDay(10)).toBe('morning');
  });

  it('returns afternoon for 11-16', () => {
    expect(getTimeOfDay(11)).toBe('afternoon');
    expect(getTimeOfDay(16)).toBe('afternoon');
  });

  it('returns evening for 17-20', () => {
    expect(getTimeOfDay(17)).toBe('evening');
    expect(getTimeOfDay(20)).toBe('evening');
  });

  it('returns night for 21-4', () => {
    expect(getTimeOfDay(21)).toBe('night');
    expect(getTimeOfDay(0)).toBe('night');
    expect(getTimeOfDay(4)).toBe('night');
  });
});

describe('formatDisplayDate', () => {
  it('returns "Today" for today', () => {
    const today = formatDateString(new Date());
    expect(formatDisplayDate(today)).toBe('Today');
  });

  it('returns "Yesterday" for yesterday', () => {
    const yesterday = formatDateString(new Date(Date.now() - 86400000));
    expect(formatDisplayDate(yesterday)).toBe('Yesterday');
  });

  it('formats older dates as month + day', () => {
    // A fixed old date
    const result = formatDisplayDate('2024-01-15');
    expect(result).toBe('Jan 15');
  });
});

describe('getDaysInMonth', () => {
  it('returns 31 for January', () => {
    expect(getDaysInMonth(2024, 1)).toBe(31);
  });

  it('returns 28 for Feb in non-leap year', () => {
    expect(getDaysInMonth(2023, 2)).toBe(28);
  });

  it('returns 29 for Feb in leap year', () => {
    expect(getDaysInMonth(2024, 2)).toBe(29);
  });

  it('returns 30 for April', () => {
    expect(getDaysInMonth(2024, 4)).toBe(30);
  });
});

describe('getDaysInMonthArray', () => {
  it('generates correct number of days', () => {
    const days = getDaysInMonthArray(2024, 2); // Feb 2024 (leap)
    expect(days).toHaveLength(29);
  });

  it('all days are in YYYY-MM-DD format', () => {
    const days = getDaysInMonthArray(2024, 1);
    days.forEach((d) => {
      expect(d).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });
  });

  it('starts with the first day of the month', () => {
    const days = getDaysInMonthArray(2024, 3);
    expect(days[0]).toBe('2024-03-01');
  });
});

describe('formatTimer', () => {
  it('formats 0 seconds as 00:00', () => {
    expect(formatTimer(0)).toBe('00:00');
  });

  it('formats 65 seconds as 01:05', () => {
    expect(formatTimer(65)).toBe('01:05');
  });

  it('formats 25 minutes as 25:00', () => {
    expect(formatTimer(1500)).toBe('25:00');
  });
});

describe('getSeason', () => {
  it('returns spring for March', () => {
    expect(getSeason(new Date(2024, 2, 15))).toBe('spring');
  });

  it('returns summer for July', () => {
    expect(getSeason(new Date(2024, 6, 15))).toBe('summer');
  });

  it('returns autumn for October', () => {
    expect(getSeason(new Date(2024, 9, 15))).toBe('autumn');
  });

  it('returns winter for January', () => {
    expect(getSeason(new Date(2024, 0, 15))).toBe('winter');
  });

  it('returns winter for December', () => {
    expect(getSeason(new Date(2024, 11, 15))).toBe('winter');
  });
});

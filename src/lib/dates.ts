import type { TimeOfDay } from '../types';

/**
 * Returns today's date as YYYY-MM-DD string (local timezone).
 */
export function getTodayString(): string {
  const now = new Date();
  return formatDateString(now);
}

/**
 * Formats a Date to YYYY-MM-DD.
 */
export function formatDateString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Parses a YYYY-MM-DD string to a Date object (local timezone).
 */
export function parseDateString(dateStr: string): Date {
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day);
}

/**
 * Returns the time-of-day bracket for a given hour.
 */
export function getTimeOfDay(hour: number): TimeOfDay {
  if (hour >= 5 && hour < 11) return 'morning';
  if (hour >= 11 && hour < 17) return 'afternoon';
  if (hour >= 17 && hour < 21) return 'evening';
  return 'night';
}

/**
 * Returns the current time-of-day bracket.
 */
export function getCurrentTimeOfDay(): TimeOfDay {
  return getTimeOfDay(new Date().getHours());
}

/**
 * Returns a human-readable display string for a date.
 * Today → "Today", Yesterday → "Yesterday", otherwise → "Feb 19"
 */
export function formatDisplayDate(dateStr: string): string {
  const today = getTodayString();
  const yesterday = formatDateString(new Date(Date.now() - 86400000));

  if (dateStr === today) return 'Today';
  if (dateStr === yesterday) return 'Yesterday';

  const date = parseDateString(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

/**
 * Returns the day-of-year (1-366).
 */
export function getDayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

/**
 * Returns the number of days in a given month (1-12) for a year.
 */
export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}

/**
 * Returns an array of YYYY-MM-DD strings for each day of a given month.
 */
export function getDaysInMonthArray(year: number, month: number): string[] {
  const daysCount = getDaysInMonth(year, month);
  const days: string[] = [];
  for (let d = 1; d <= daysCount; d++) {
    const m = String(month).padStart(2, '0');
    const day = String(d).padStart(2, '0');
    days.push(`${year}-${m}-${day}`);
  }
  return days;
}

/**
 * Returns all YYYY-MM-DD strings for the current year.
 */
export function getAllDaysInYear(year: number): string[] {
  const isLeap = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  const totalDays = isLeap ? 366 : 365;
  const days: string[] = [];
  let current = new Date(year, 0, 1);
  for (let i = 0; i < totalDays; i++) {
    days.push(formatDateString(current));
    current = new Date(current.getTime() + 86400000);
  }
  return days;
}

/**
 * Returns the day of week for the first day of the month (0=Mon, 6=Sun).
 */
export function getMonthStartDayOfWeek(year: number, month: number): number {
  const firstDay = new Date(year, month - 1, 1);
  // Convert from JS (0=Sun) to (0=Mon)
  return (firstDay.getDay() + 6) % 7;
}

/**
 * Formats seconds to MM:SS string.
 */
export function formatTimer(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

/**
 * Returns the real-world season for a given date.
 */
export function getSeason(date: Date): 'spring' | 'summer' | 'autumn' | 'winter' {
  const month = date.getMonth() + 1;
  if (month >= 3 && month <= 5) return 'spring';
  if (month >= 6 && month <= 8) return 'summer';
  if (month >= 9 && month <= 11) return 'autumn';
  return 'winter';
}

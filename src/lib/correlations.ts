import type { HabitMoodCorrelation } from '../types';

export interface DayRecord {
  date: string;
  moodLevel: number;
  completedHabitIds: string[];
}

export interface HabitInfo {
  id: string;
  name: string;
}

const MINIMUM_SAMPLE_SIZE = 5;

/**
 * Analyzes mood-habit correlations from historical data.
 *
 * Returns correlations sorted by impact (largest mood boost first).
 * Only returns correlations with sufficient data (>= MINIMUM_SAMPLE_SIZE days).
 */
export function calculateCorrelations(
  dayRecords: DayRecord[],
  habits: HabitInfo[],
): HabitMoodCorrelation[] {
  if (dayRecords.length < MINIMUM_SAMPLE_SIZE) return [];

  const correlations: HabitMoodCorrelation[] = [];

  for (const habit of habits) {
    const daysWithHabit = dayRecords.filter((d) => d.completedHabitIds.includes(habit.id));
    const daysWithoutHabit = dayRecords.filter((d) => !d.completedHabitIds.includes(habit.id));

    if (daysWithHabit.length < MINIMUM_SAMPLE_SIZE) continue;

    const avgWithHabit = average(daysWithHabit.map((d) => d.moodLevel));
    const avgWithoutHabit =
      daysWithoutHabit.length > 0
        ? average(daysWithoutHabit.map((d) => d.moodLevel))
        : null;

    if (avgWithoutHabit === null) continue;

    correlations.push({
      habitId: habit.id,
      habitName: habit.name,
      averageMoodWithHabit: avgWithHabit,
      averageMoodWithoutHabit: avgWithoutHabit,
      sampleSize: daysWithHabit.length,
    });
  }

  // Sort by mood boost (largest positive correlation first)
  return correlations.sort(
    (a, b) =>
      b.averageMoodWithHabit - b.averageMoodWithoutHabit -
      (a.averageMoodWithHabit - a.averageMoodWithoutHabit),
  );
}

/**
 * Returns the top correlation insight as a human-readable string.
 * Returns null if no significant correlation exists.
 */
export function getTopCorrelationInsight(
  correlations: HabitMoodCorrelation[],
): string | null {
  if (correlations.length === 0) return null;

  const top = correlations[0];
  const diff = top.averageMoodWithHabit - top.averageMoodWithoutHabit;

  // Only surface positive correlations with at least 0.3 difference
  if (diff < 0.3) return null;

  return `You tend to feel ${formatMoodLabel(top.averageMoodWithHabit)} on days you complete ${top.habitName}.`;
}

function average(numbers: number[]): number {
  if (numbers.length === 0) return 0;
  return numbers.reduce((sum, n) => sum + n, 0) / numbers.length;
}

function formatMoodLabel(avgMoodLevel: number): string {
  if (avgMoodLevel >= 4.5) return 'Thriving';
  if (avgMoodLevel >= 3.5) return 'Good';
  if (avgMoodLevel >= 2.5) return 'Steady';
  if (avgMoodLevel >= 1.5) return 'Low';
  return 'Struggling';
}

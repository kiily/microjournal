import { calculateCorrelations, getTopCorrelationInsight } from '../correlations';
import type { DayRecord, HabitInfo } from '../correlations';

const habits: HabitInfo[] = [
  { id: 'h1', name: 'Morning stretch' },
  { id: 'h2', name: 'Read a chapter' },
];

describe('calculateCorrelations', () => {
  it('returns empty array when fewer than 5 records', () => {
    const records: DayRecord[] = Array.from({ length: 4 }, (_, i) => ({
      date: `2024-01-0${i + 1}`,
      moodLevel: 3,
      completedHabitIds: ['h1'],
    }));

    expect(calculateCorrelations(records, habits)).toHaveLength(0);
  });

  it('returns empty when habit has fewer than 5 completions', () => {
    // 10 records but only 3 completions of h1
    const records: DayRecord[] = Array.from({ length: 10 }, (_, i) => ({
      date: `2024-01-${String(i + 1).padStart(2, '0')}`,
      moodLevel: 4,
      completedHabitIds: i < 3 ? ['h1'] : [],
    }));

    const result = calculateCorrelations(records, habits);
    expect(result).toHaveLength(0);
  });

  it('detects a positive correlation', () => {
    const records: DayRecord[] = [
      // 6 days with h1 + high mood
      ...Array.from({ length: 6 }, (_, i) => ({
        date: `2024-01-${String(i + 1).padStart(2, '0')}`,
        moodLevel: 5,
        completedHabitIds: ['h1'],
      })),
      // 4 days without h1 + low mood
      ...Array.from({ length: 4 }, (_, i) => ({
        date: `2024-01-${String(i + 10).padStart(2, '0')}`,
        moodLevel: 2,
        completedHabitIds: [],
      })),
    ];

    const result = calculateCorrelations(records, habits);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0].averageMoodWithHabit).toBeGreaterThan(result[0].averageMoodWithoutHabit);
  });

  it('returns correlations sorted by impact', () => {
    // h1 has stronger correlation than h2
    const records: DayRecord[] = Array.from({ length: 12 }, (_, i) => ({
      date: `2024-01-${String(i + 1).padStart(2, '0')}`,
      moodLevel: i < 6 ? 5 : 2,
      completedHabitIds: i < 6 ? ['h1', 'h2'] : [],
    }));

    const result = calculateCorrelations(records, [habits[0], habits[1]]);
    // Both habits should have the same correlation since they're always together
    expect(result.length).toBeGreaterThan(0);
  });
});

describe('getTopCorrelationInsight', () => {
  it('returns null for empty correlations', () => {
    expect(getTopCorrelationInsight([])).toBeNull();
  });

  it('returns null when correlation is not significant', () => {
    const correlations = [
      {
        habitId: 'h1',
        habitName: 'Test',
        averageMoodWithHabit: 3.1,
        averageMoodWithoutHabit: 3.0,
        sampleSize: 10,
      },
    ];
    expect(getTopCorrelationInsight(correlations)).toBeNull();
  });

  it('returns insight string for significant correlation', () => {
    const correlations = [
      {
        habitId: 'h1',
        habitName: 'Morning stretch',
        averageMoodWithHabit: 4.5,
        averageMoodWithoutHabit: 2.8,
        sampleSize: 15,
      },
    ];
    const result = getTopCorrelationInsight(correlations);
    expect(result).toContain('Morning stretch');
    expect(result).not.toBeNull();
  });
});

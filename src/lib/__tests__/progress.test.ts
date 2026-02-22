import {
  calculateHabitTier,
  getDaysUntilNextTier,
  calculateRoomTier,
  getMoodLogsUntilNextRoomTier,
  getWindowViewLevel,
  getTierProgress,
  detectTierChanges,
} from '../progress';

describe('calculateHabitTier', () => {
  it('returns 0 for 0 completions', () => {
    expect(calculateHabitTier(0)).toBe(0);
  });

  it('returns 0 for completions below tier 1 threshold', () => {
    expect(calculateHabitTier(2)).toBe(0);
  });

  it('returns 1 after 3 completions', () => {
    expect(calculateHabitTier(3)).toBe(1);
  });

  it('returns 1 for completions between tier 1 and 2', () => {
    expect(calculateHabitTier(7)).toBe(1);
  });

  it('returns 2 after 10 completions', () => {
    expect(calculateHabitTier(10)).toBe(2);
  });

  it('returns 2 for completions between tier 2 and 3', () => {
    expect(calculateHabitTier(20)).toBe(2);
  });

  it('returns 3 after 30 completions', () => {
    expect(calculateHabitTier(30)).toBe(3);
  });

  it('returns 3 for completions well above threshold', () => {
    expect(calculateHabitTier(100)).toBe(3);
  });
});

describe('getDaysUntilNextTier', () => {
  it('returns 3 for 0 completions (3 until tier 1)', () => {
    expect(getDaysUntilNextTier(0)).toBe(3);
  });

  it('returns 1 for 2 completions (1 more until tier 1)', () => {
    expect(getDaysUntilNextTier(2)).toBe(1);
  });

  it('returns 7 for 3 completions (7 more until tier 2 at 10)', () => {
    expect(getDaysUntilNextTier(3)).toBe(7);
  });

  it('returns 0 for exactly at threshold', () => {
    expect(getDaysUntilNextTier(10)).toBe(20);
  });

  it('returns null at max tier (30+)', () => {
    expect(getDaysUntilNextTier(30)).toBeNull();
  });

  it('returns null well above max tier', () => {
    expect(getDaysUntilNextTier(50)).toBeNull();
  });
});

describe('calculateRoomTier', () => {
  it('returns 1 for 0 mood logs', () => {
    expect(calculateRoomTier(0)).toBe(1);
  });

  it('returns 1 below 60 logs', () => {
    expect(calculateRoomTier(59)).toBe(1);
  });

  it('returns 2 at 60 logs', () => {
    expect(calculateRoomTier(60)).toBe(2);
  });

  it('returns 3 at 120 logs', () => {
    expect(calculateRoomTier(120)).toBe(3);
  });

  it('returns 4 at 365 logs', () => {
    expect(calculateRoomTier(365)).toBe(4);
  });
});

describe('getMoodLogsUntilNextRoomTier', () => {
  it('returns 60 for 0 logs', () => {
    expect(getMoodLogsUntilNextRoomTier(0)).toBe(60);
  });

  it('returns null at max tier', () => {
    expect(getMoodLogsUntilNextRoomTier(365)).toBeNull();
  });
});

describe('getWindowViewLevel', () => {
  it('returns plain for 0 logs', () => {
    expect(getWindowViewLevel(0)).toBe('plain');
  });

  it('returns tree after 7 logs', () => {
    expect(getWindowViewLevel(7)).toBe('tree');
  });

  it('returns tree-birds after 30 logs', () => {
    expect(getWindowViewLevel(30)).toBe('tree-birds');
  });
});

describe('getTierProgress', () => {
  it('returns 0 at 0 completions', () => {
    expect(getTierProgress(0)).toBe(0);
  });

  it('returns 1 at max tier', () => {
    expect(getTierProgress(30)).toBe(1);
  });

  it('returns partial progress correctly', () => {
    // Between tier 1 (3) and tier 2 (10): 7 total completions = 4/7 ≈ 0.571
    const progress = getTierProgress(7);
    expect(progress).toBeGreaterThan(0);
    expect(progress).toBeLessThan(1);
  });
});

describe('detectTierChanges', () => {
  it('detects a new tier unlock', () => {
    const current = new Map([['habit-1', { count: 3, category: 'body' as const }]]);
    const previous = new Map([['habit-1', { count: 2, category: 'body' as const }]]);

    const changes = detectTierChanges(current, previous);
    expect(changes).toHaveLength(1);
    expect(changes[0].habitId).toBe('habit-1');
    expect(changes[0].oldTier).toBe(0);
    expect(changes[0].newTier).toBe(1);
  });

  it('returns empty array when no tier change', () => {
    const current = new Map([['habit-1', { count: 5, category: 'body' as const }]]);
    const previous = new Map([['habit-1', { count: 4, category: 'body' as const }]]);

    const changes = detectTierChanges(current, previous);
    expect(changes).toHaveLength(0);
  });

  it('handles new habit with no previous completions', () => {
    const current = new Map([['habit-new', { count: 3, category: 'mind' as const }]]);
    const previous = new Map<string, { count: number; category: 'mind' }>();

    const changes = detectTierChanges(current, previous);
    expect(changes).toHaveLength(1);
    expect(changes[0].newTier).toBe(1);
  });
});

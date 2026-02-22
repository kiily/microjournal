import {
  GREETINGS,
  TIME_PROMPTS,
  DAILY_REMINDER_MESSAGES,
  ghostItemTooltip,
  ONBOARDING,
  FOCUS,
  SETTINGS,
  EMPTY_STATES,
} from '../copy';
import type { TimeOfDay } from '../../types';

describe('GREETINGS', () => {
  const timeOfDayValues: TimeOfDay[] = ['morning', 'afternoon', 'evening', 'night'];

  it('has a greeting for every time of day', () => {
    timeOfDayValues.forEach((time) => {
      expect(GREETINGS[time]).toBeDefined();
    });
  });

  it('greetings are non-empty functions', () => {
    timeOfDayValues.forEach((time) => {
      const greeting = GREETINGS[time]('Maya');
      expect(typeof greeting).toBe('string');
      expect(greeting.length).toBeGreaterThan(0);
    });
  });

  it('includes the name in the greeting', () => {
    expect(GREETINGS.morning('Alex')).toContain('Alex');
    expect(GREETINGS.night('Sam')).toContain('Sam');
  });
});

describe('TIME_PROMPTS', () => {
  it('has a prompt for every time of day', () => {
    const times: TimeOfDay[] = ['morning', 'afternoon', 'evening', 'night'];
    times.forEach((time) => {
      expect(TIME_PROMPTS[time]).toBeDefined();
      expect(TIME_PROMPTS[time].length).toBeGreaterThan(0);
    });
  });
});

describe('ghostItemTooltip', () => {
  it('returns a non-empty string', () => {
    const result = ghostItemTooltip('Morning stretch', 3);
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });

  it('includes the habit name', () => {
    expect(ghostItemTooltip('Morning stretch', 3)).toContain('Morning stretch');
  });

  it('uses singular "time" for 1 day', () => {
    const result = ghostItemTooltip('Read', 1);
    expect(result).toContain('time');
    expect(result).not.toContain('times');
  });

  it('uses plural "times" for multiple days', () => {
    const result = ghostItemTooltip('Read', 3);
    expect(result).toContain('times');
  });
});

describe('DAILY_REMINDER_MESSAGES', () => {
  it('contains at least 3 messages', () => {
    expect(DAILY_REMINDER_MESSAGES.length).toBeGreaterThanOrEqual(3);
  });

  it('all messages are non-empty strings', () => {
    DAILY_REMINDER_MESSAGES.forEach((msg) => {
      expect(typeof msg).toBe('string');
      expect(msg.length).toBeGreaterThan(0);
    });
  });

  it('no message contains guilt-inducing language', () => {
    DAILY_REMINDER_MESSAGES.forEach((msg) => {
      expect(msg.toLowerCase()).not.toContain("don't forget");
      expect(msg.toLowerCase()).not.toContain('streak');
    });
  });
});

describe('ONBOARDING copy', () => {
  it('all onboarding strings are defined and non-empty', () => {
    Object.values(ONBOARDING).forEach((value) => {
      expect(typeof value).toBe('string');
      expect((value as string).length).toBeGreaterThan(0);
    });
  });
});

describe('FOCUS copy', () => {
  it('all focus strings are defined', () => {
    Object.values(FOCUS).forEach((value) => {
      expect(typeof value).toBe('string');
      expect((value as string).length).toBeGreaterThan(0);
    });
  });

  it('leave warning does not use "die" or guilt language', () => {
    expect(FOCUS.leaveWarning.toLowerCase()).not.toContain('die');
    expect(FOCUS.leaveWarning.toLowerCase()).not.toContain('killed');
  });
});

describe('EMPTY_STATES', () => {
  it('all empty state strings are defined', () => {
    Object.values(EMPTY_STATES).forEach((value) => {
      expect(typeof value).toBe('string');
      expect((value as string).length).toBeGreaterThan(0);
    });
  });
});

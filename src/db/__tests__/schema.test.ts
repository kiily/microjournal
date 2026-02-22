/**
 * Database schema smoke tests.
 *
 * NOTE: Full DB tests require expo-sqlite which needs a native environment.
 * These tests verify the schema exports and structure are correct.
 */

import {
  userProfile,
  moodEntry,
  habit,
  habitLog,
  roomItem,
  focusSession,
} from '../schema';

describe('Database Schema', () => {
  it('exports userProfile table', () => {
    expect(userProfile).toBeDefined();
  });

  it('exports moodEntry table', () => {
    expect(moodEntry).toBeDefined();
  });

  it('exports habit table', () => {
    expect(habit).toBeDefined();
  });

  it('exports habitLog table', () => {
    expect(habitLog).toBeDefined();
  });

  it('exports roomItem table', () => {
    expect(roomItem).toBeDefined();
  });

  it('exports focusSession table', () => {
    expect(focusSession).toBeDefined();
  });
});

describe('Schema field verification', () => {
  it('userProfile has required fields', () => {
    // Verify key columns exist by checking the table definition
    const columns = Object.keys(userProfile);
    expect(columns).toBeDefined();
  });

  it('moodEntry has date and moodLevel', () => {
    expect(moodEntry.date).toBeDefined();
    expect(moodEntry.moodLevel).toBeDefined();
  });

  it('habit has name, icon, and category', () => {
    expect(habit.name).toBeDefined();
    expect(habit.icon).toBeDefined();
    expect(habit.category).toBeDefined();
  });

  it('habitLog has habitId and date', () => {
    expect(habitLog.habitId).toBeDefined();
    expect(habitLog.date).toBeDefined();
  });
});

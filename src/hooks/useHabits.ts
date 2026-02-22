import { useCallback } from 'react';
import { and, count, eq, ne } from 'drizzle-orm';
import { getDatabase } from '../db/client';
import { habit, habitLog } from '../db/schema';
import { useDayStore } from '../stores/useDayStore';
import { getTodayString } from '../lib/dates';
import { calculateHabitTier } from '../lib/progress';
import type { Habit, HabitWithProgress, HabitCategory } from '../types';

export function useHabits() {
  const { habits, setHabits, toggleHabitCompletion } = useDayStore();

  const loadHabitsForToday = useCallback(async () => {
    const db = getDatabase();
    const today = getTodayString();

    // Get all active habits
    const activeHabits = await db
      .select()
      .from(habit)
      .where(eq(habit.isArchived, false))
      .orderBy(habit.sortOrder);

    // Get completion counts (total, not streak)
    const completionCounts = await db
      .select({
        habitId: habitLog.habitId,
        total: count(),
      })
      .from(habitLog)
      .where(eq(habitLog.completed, true))
      .groupBy(habitLog.habitId);

    const countMap = new Map(completionCounts.map((r) => [r.habitId, r.total]));

    // Get today's completions
    const todayLogs = await db
      .select()
      .from(habitLog)
      .where(and(eq(habitLog.date, today), eq(habitLog.completed, true)));

    const completedTodaySet = new Set(todayLogs.map((l) => l.habitId));

    const habitsWithProgress: HabitWithProgress[] = activeHabits.map((h) => {
      const totalCompletions = countMap.get(h.id) ?? 0;
      return {
        id: h.id,
        name: h.name,
        icon: h.icon,
        category: h.category as HabitCategory,
        isArchived: h.isArchived ?? false,
        sortOrder: h.sortOrder,
        createdAt: h.createdAt,
        updatedAt: h.updatedAt,
        totalCompletions,
        tier: calculateHabitTier(totalCompletions),
        completedToday: completedTodaySet.has(h.id),
      };
    });

    setHabits(habitsWithProgress);
  }, [setHabits]);

  const toggleHabit = useCallback(
    async (habitId: string): Promise<boolean> => {
      const db = getDatabase();
      const today = getTodayString();

      const existing = await db
        .select()
        .from(habitLog)
        .where(and(eq(habitLog.habitId, habitId), eq(habitLog.date, today)))
        .limit(1);

      let newCompleted: boolean;
      if (existing.length > 0) {
        newCompleted = !existing[0].completed;
        await db
          .update(habitLog)
          .set({ completed: newCompleted })
          .where(eq(habitLog.id, existing[0].id));
      } else {
        newCompleted = true;
        await db.insert(habitLog).values({
          habitId,
          date: today,
          completed: true,
        });
      }

      // Optimistically update store
      toggleHabitCompletion(habitId);

      return newCompleted;
    },
    [toggleHabitCompletion],
  );

  const createHabit = useCallback(
    async (name: string, category: HabitCategory, icon: string): Promise<Habit> => {
      const db = getDatabase();

      const maxSortOrder = await db
        .select({ max: habit.sortOrder })
        .from(habit)
        .where(eq(habit.isArchived, false));

      const nextSortOrder = (maxSortOrder[0]?.max ?? -1) + 1;

      const result = await db
        .insert(habit)
        .values({ name, category, icon, sortOrder: nextSortOrder })
        .returning();

      const created: Habit = {
        id: result[0].id,
        name: result[0].name,
        icon: result[0].icon,
        category: result[0].category as HabitCategory,
        isArchived: result[0].isArchived ?? false,
        sortOrder: result[0].sortOrder,
        createdAt: result[0].createdAt,
        updatedAt: result[0].updatedAt,
      };

      // Reload habits
      await loadHabitsForToday();

      return created;
    },
    [loadHabitsForToday],
  );

  const updateHabit = useCallback(
    async (habitId: string, updates: Partial<Pick<Habit, 'name' | 'category' | 'icon'>>): Promise<void> => {
      const db = getDatabase();
      await db
        .update(habit)
        .set({ ...updates, updatedAt: new Date().toISOString() })
        .where(eq(habit.id, habitId));
      await loadHabitsForToday();
    },
    [loadHabitsForToday],
  );

  const archiveHabit = useCallback(
    async (habitId: string): Promise<void> => {
      const db = getDatabase();
      await db
        .update(habit)
        .set({ isArchived: true, updatedAt: new Date().toISOString() })
        .where(eq(habit.id, habitId));
      await loadHabitsForToday();
    },
    [loadHabitsForToday],
  );

  const getTotalCompletions = useCallback(async (habitId: string): Promise<number> => {
    const db = getDatabase();
    const result = await db
      .select({ total: count() })
      .from(habitLog)
      .where(and(eq(habitLog.habitId, habitId), eq(habitLog.completed, true)));
    return result[0]?.total ?? 0;
  }, []);

  return {
    habits,
    loadHabitsForToday,
    toggleHabit,
    createHabit,
    updateHabit,
    archiveHabit,
    getTotalCompletions,
  };
}

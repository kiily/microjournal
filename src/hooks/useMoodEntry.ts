import { useCallback } from 'react';
import { eq } from 'drizzle-orm';
import { getDatabase } from '../db/client';
import { moodEntry } from '../db/schema';
import { useDayStore } from '../stores/useDayStore';
import { getTodayString } from '../lib/dates';
import type { MoodEntry, MoodLevel, MoodTag } from '../types';

/**
 * Hook for reading and writing today's mood entry.
 */
export function useMoodEntry() {
  const { todayMood, setTodayMood, updateMoodLevel, updateMoodTags, updateMoodNote } =
    useDayStore();

  const loadTodayMood = useCallback(async () => {
    const db = getDatabase();
    const today = getTodayString();

    const rows = await db
      .select()
      .from(moodEntry)
      .where(eq(moodEntry.date, today))
      .limit(1);

    if (rows.length > 0) {
      const row = rows[0];
      setTodayMood({
        id: row.id,
        date: row.date,
        moodLevel: row.moodLevel as MoodLevel,
        tags: JSON.parse(row.tags) as MoodTag[],
        note: row.note,
        createdAt: row.createdAt,
        updatedAt: row.updatedAt,
      });
    } else {
      setTodayMood(null);
    }
  }, [setTodayMood]);

  const saveMoodEntry = useCallback(
    async (level: MoodLevel, tags: MoodTag[], note: string): Promise<MoodEntry> => {
      const db = getDatabase();
      const today = getTodayString();
      const now = new Date().toISOString();

      const existing = await db
        .select()
        .from(moodEntry)
        .where(eq(moodEntry.date, today))
        .limit(1);

      if (existing.length > 0) {
        // Upsert — update existing
        await db
          .update(moodEntry)
          .set({
            moodLevel: level,
            tags: JSON.stringify(tags),
            note,
            updatedAt: now,
          })
          .where(eq(moodEntry.id, existing[0].id));

        const updated: MoodEntry = {
          id: existing[0].id,
          date: today,
          moodLevel: level,
          tags,
          note,
          createdAt: existing[0].createdAt,
          updatedAt: now,
        };
        setTodayMood(updated);
        return updated;
      } else {
        // Insert new
        const result = await db
          .insert(moodEntry)
          .values({
            date: today,
            moodLevel: level,
            tags: JSON.stringify(tags),
            note,
          })
          .returning();

        const inserted: MoodEntry = {
          id: result[0].id,
          date: result[0].date,
          moodLevel: result[0].moodLevel as MoodLevel,
          tags: JSON.parse(result[0].tags) as MoodTag[],
          note: result[0].note,
          createdAt: result[0].createdAt,
          updatedAt: result[0].updatedAt,
        };
        setTodayMood(inserted);
        return inserted;
      }
    },
    [setTodayMood],
  );

  const updateLevel = useCallback(
    async (level: MoodLevel) => {
      updateMoodLevel(level);
      if (todayMood) {
        await saveMoodEntry(level, todayMood.tags, todayMood.note);
      }
    },
    [todayMood, updateMoodLevel, saveMoodEntry],
  );

  return {
    todayMood,
    loadTodayMood,
    saveMoodEntry,
    updateLevel,
    updateMoodTags,
    updateMoodNote,
  };
}

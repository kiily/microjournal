import { useState, useEffect } from 'react';
import { and, eq } from 'drizzle-orm';
import { getDatabase } from '../db/client';
import { habit, habitLog, moodEntry } from '../db/schema';
import { calculateCorrelations, getTopCorrelationInsight } from '../lib/correlations';
import type { HabitMoodCorrelation, HabitCategory } from '../types';

const MINIMUM_DAYS_FOR_INSIGHTS = 7;

interface InsightsResult {
  topInsight: string | null;
  correlations: HabitMoodCorrelation[];
  hasEnoughData: boolean;
  isLoading: boolean;
}

export function useInsights(): InsightsResult {
  const [topInsight, setTopInsight] = useState<string | null>(null);
  const [correlations, setCorrelations] = useState<HabitMoodCorrelation[]>([]);
  const [hasEnoughData, setHasEnoughData] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadInsights() {
      try {
        const db = getDatabase();

        // Get all mood entries
        const moodRows = await db.select().from(moodEntry).orderBy(moodEntry.date);

        if (moodRows.length < MINIMUM_DAYS_FOR_INSIGHTS) {
          if (!cancelled) {
            setHasEnoughData(false);
            setIsLoading(false);
          }
          return;
        }

        // Get all active habits
        const habits = await db
          .select()
          .from(habit)
          .where(eq(habit.isArchived, false));

        // Get all habit log completions
        const logs = await db
          .select()
          .from(habitLog)
          .where(eq(habitLog.completed, true));

        // Build day records
        const logsByDate = new Map<string, string[]>();
        for (const log of logs) {
          const existing = logsByDate.get(log.date) ?? [];
          existing.push(log.habitId);
          logsByDate.set(log.date, existing);
        }

        const dayRecords = moodRows.map((m) => ({
          date: m.date,
          moodLevel: m.moodLevel,
          completedHabitIds: logsByDate.get(m.date) ?? [],
        }));

        const habitInfos = habits.map((h) => ({ id: h.id, name: h.name }));
        const correlationResults = calculateCorrelations(dayRecords, habitInfos);
        const insight = getTopCorrelationInsight(correlationResults);

        if (!cancelled) {
          setCorrelations(correlationResults);
          setTopInsight(insight);
          setHasEnoughData(true);
          setIsLoading(false);
        }
      } catch {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    loadInsights();
    return () => {
      cancelled = true;
    };
  }, []);

  return { topInsight, correlations, hasEnoughData, isLoading };
}

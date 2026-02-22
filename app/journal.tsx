import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { eq } from 'drizzle-orm';
import { getDatabase } from '../src/db/client';
import { moodEntry, habitLog, habit } from '../src/db/schema';
import { JournalList } from '../src/components/journal/JournalList';
import { CalendarGrid } from '../src/components/journal/CalendarGrid';
import { InsightCard } from '../src/components/journal/InsightCard';
import { useInsights } from '../src/hooks/useInsights';
import type { MoodEntry, MoodLevel, HabitCategory } from '../src/types';

interface CompletedHabit {
  id: string;
  name: string;
  category: HabitCategory;
}

export default function JournalScreen() {
  const now = new Date();
  const [year] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [habitsByDate, setHabitsByDate] = useState(new Map<string, CompletedHabit[]>());
  const [moodByDate, setMoodByDate] = useState(new Map<string, MoodLevel>());

  const { topInsight, hasEnoughData } = useInsights();

  useEffect(() => {
    loadJournalData();
  }, []);

  async function loadJournalData() {
    const db = getDatabase();

    // Load all mood entries
    const moods = await db.select().from(moodEntry).orderBy(moodEntry.date);
    const parsedEntries: MoodEntry[] = moods.map((m) => ({
      id: m.id,
      date: m.date,
      moodLevel: m.moodLevel as MoodLevel,
      tags: JSON.parse(m.tags),
      note: m.note,
      createdAt: m.createdAt,
      updatedAt: m.updatedAt,
    }));

    setEntries(parsedEntries);

    const moodMap = new Map<string, MoodLevel>();
    parsedEntries.forEach((e) => moodMap.set(e.date, e.moodLevel));
    setMoodByDate(moodMap);

    // Load completed habits per date
    const logs = await db
      .select()
      .from(habitLog)
      .where(eq(habitLog.completed, true));

    const habits = await db.select().from(habit);
    const habitMap = new Map(habits.map((h) => [h.id, h]));

    const byDate = new Map<string, CompletedHabit[]>();
    for (const log of logs) {
      const h = habitMap.get(log.habitId);
      if (!h) continue;
      const existing = byDate.get(log.date) ?? [];
      existing.push({ id: h.id, name: h.name, category: h.category as HabitCategory });
      byDate.set(log.date, existing);
    }
    setHabitsByDate(byDate);
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
          accessibilityRole="button"
          accessibilityLabel="Back to room"
          testID="journal-back-button"
        >
          <Text style={styles.backText}>← Room</Text>
        </TouchableOpacity>
        <Text style={styles.title}>
          {new Date(year, month - 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </Text>
        <TouchableOpacity
          onPress={() => router.push('/year-in-pixels')}
          testID="year-pixels-link"
          accessibilityRole="button"
        >
          <Text style={styles.pixelsLink}>Year →</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Calendar */}
        <View style={styles.calendarContainer}>
          <CalendarGrid
            year={year}
            month={month}
            moodByDate={moodByDate}
          />
        </View>

        {/* Insights */}
        <View style={styles.insightContainer}>
          <InsightCard insight={topInsight} hasEnoughData={hasEnoughData} />
        </View>

        {/* Journal entries */}
        <View style={styles.entriesContainer}>
          <JournalList entries={entries} habitsByDate={habitsByDate} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF6F1',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E8E0D8',
  },
  backButton: {
    paddingVertical: 4,
  },
  backText: {
    fontSize: 15,
    color: '#8B7D72',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C2420',
  },
  pixelsLink: {
    fontSize: 14,
    color: '#D4845A',
    fontWeight: '500',
  },
  scroll: {
    flex: 1,
  },
  calendarContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    padding: 16,
  },
  insightContainer: {
    marginHorizontal: 16,
    marginTop: 8,
  },
  entriesContainer: {
    marginHorizontal: 16,
    marginTop: 8,
    flex: 1,
  },
});

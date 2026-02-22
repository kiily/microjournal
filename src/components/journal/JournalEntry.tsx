import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Pill } from '../ui/Pill';
import type { MoodEntry, HabitCategory } from '../../types';
import { getMoodColor, getMoodLabel, MOODS } from '../../constants/moods';
import { formatDisplayDate } from '../../lib/dates';

interface CompletedHabit {
  id: string;
  name: string;
  category: HabitCategory;
}

interface JournalEntryProps {
  entry: MoodEntry;
  completedHabits: CompletedHabit[];
}

export function JournalEntry({ entry, completedHabits }: JournalEntryProps) {
  const mood = MOODS[entry.moodLevel];
  const moodColor = getMoodColor(entry.moodLevel);
  const displayDate = formatDisplayDate(entry.date);

  return (
    <View style={styles.container} testID={`journal-entry-${entry.date}`}>
      <View style={styles.header}>
        <Text style={styles.dateText}>{displayDate}</Text>
        <View style={[styles.moodBadge, { backgroundColor: moodColor + '25' }]}>
          <Text style={styles.moodEmoji}>{mood.emoji}</Text>
          <Text style={[styles.moodLabel, { color: moodColor }]}>{mood.label}</Text>
        </View>
      </View>

      {entry.note ? (
        <Text style={styles.note} numberOfLines={4}>
          "{entry.note}"
        </Text>
      ) : null}

      {entry.tags.length > 0 && (
        <View style={styles.tags}>
          {entry.tags.map((tag) => (
            <Pill key={tag} label={tag} size="sm" selected={false} />
          ))}
        </View>
      )}

      {completedHabits.length > 0 && (
        <View style={styles.habits}>
          {completedHabits.map((habit) => (
            <View key={habit.id} style={styles.habitItem}>
              <Text style={styles.habitCheck}>✓</Text>
              <Text style={styles.habitName} numberOfLines={1}>
                {habit.name}
              </Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  dateText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C2420',
  },
  moodBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  moodEmoji: {
    fontSize: 13,
  },
  moodLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  note: {
    fontSize: 14,
    color: '#2C2420',
    lineHeight: 21,
    fontStyle: 'italic',
    marginBottom: 10,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 10,
  },
  habits: {
    gap: 4,
  },
  habitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  habitCheck: {
    fontSize: 12,
    color: '#9DB88C',
    fontWeight: '700',
  },
  habitName: {
    fontSize: 13,
    color: '#8B7D72',
  },
});

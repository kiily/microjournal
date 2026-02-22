import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import type { MoodEntry, HabitCategory } from '../../types';
import { JournalEntry } from './JournalEntry';
import { EMPTY_STATES } from '../../constants/copy';

interface CompletedHabit {
  id: string;
  name: string;
  category: HabitCategory;
}

interface JournalListProps {
  entries: MoodEntry[];
  habitsByDate: Map<string, CompletedHabit[]>;
}

export function JournalList({ entries, habitsByDate }: JournalListProps) {
  if (entries.length === 0) {
    return (
      <View style={styles.empty} testID="journal-empty">
        <Text style={styles.emptyText}>{EMPTY_STATES.journal}</Text>
      </View>
    );
  }

  // Sort entries by date descending
  const sortedEntries = [...entries].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <FlatList
      data={sortedEntries}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <JournalEntry
          entry={item}
          completedHabits={habitsByDate.get(item.date) ?? []}
        />
      )}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.list}
      testID="journal-list"
    />
  );
}

const styles = StyleSheet.create({
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
  },
  emptyText: {
    fontSize: 15,
    color: '#B8ADA4',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  list: {
    paddingBottom: 40,
  },
});

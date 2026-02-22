import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import type { HabitWithProgress, MoodLevel, MoodTag } from '../../types';
import { MoodPicker } from './MoodPicker';
import { MoodTags } from './MoodTags';
import { HabitList } from './HabitList';
import { NoteInput } from './NoteInput';
import { ALL_HABITS_DONE } from '../../constants/copy';

interface CheckInSheetProps {
  habits: HabitWithProgress[];
  selectedMood: MoodLevel | null;
  selectedTags: MoodTag[];
  noteValue: string;
  onMoodSelect: (level: MoodLevel) => void;
  onTagsChange: (tags: MoodTag[]) => void;
  onNoteChange: (text: string) => void;
  onHabitToggle: (habitId: string) => void;
  onAddHabit?: () => void;
  onManageHabits?: () => void;
  onLongPressHabit?: (habitId: string) => void;
}

export function CheckInSheet({
  habits,
  selectedMood,
  selectedTags,
  noteValue,
  onMoodSelect,
  onTagsChange,
  onNoteChange,
  onHabitToggle,
  onAddHabit,
  onManageHabits,
  onLongPressHabit,
}: CheckInSheetProps) {
  const allDone = habits.length > 0 && habits.every((h) => h.completedToday);

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      testID="check-in-sheet"
    >
      <MoodPicker selectedLevel={selectedMood} onSelect={onMoodSelect} />

      {selectedMood !== null && (
        <MoodTags selectedTags={selectedTags} onTagsChange={onTagsChange} />
      )}

      <View style={styles.divider} />

      <HabitList
        habits={habits}
        onToggle={onHabitToggle}
        onAddHabit={onAddHabit}
        onManageHabits={onManageHabits}
        onLongPressHabit={onLongPressHabit}
      />

      {allDone && (
        <View style={styles.allDoneBanner} testID="all-done-banner">
          <Text style={styles.allDoneText}>{ALL_HABITS_DONE}</Text>
        </View>
      )}

      <View style={styles.divider} />

      <NoteInput
        value={noteValue}
        onChangeText={onNoteChange}
      />

      <View style={styles.bottomPadding} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#E8E0D8',
    marginVertical: 16,
  },
  allDoneBanner: {
    backgroundColor: '#F2DDD0',
    borderRadius: 10,
    padding: 12,
    marginTop: 4,
  },
  allDoneText: {
    fontSize: 13,
    color: '#D4845A',
    fontWeight: '500',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  bottomPadding: {
    height: 40,
  },
});

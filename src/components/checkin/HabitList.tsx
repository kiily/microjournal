import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { HabitWithProgress } from '../../types';
import { HabitRow } from './HabitRow';

interface HabitListProps {
  habits: HabitWithProgress[];
  onToggle: (habitId: string) => void;
  onAddHabit?: () => void;
  onManageHabits?: () => void;
  onLongPressHabit?: (habitId: string) => void;
}

export function HabitList({
  habits,
  onToggle,
  onAddHabit,
  onManageHabits,
  onLongPressHabit,
}: HabitListProps) {
  return (
    <View testID="habit-list">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {habits.map((habit, index) => (
          <React.Fragment key={habit.id}>
            {index > 0 && <View style={styles.separator} />}
            <HabitRow
              habit={habit}
              onToggle={onToggle}
              onLongPress={onLongPressHabit}
            />
          </React.Fragment>
        ))}

        {habits.length === 0 && (
          <Text style={styles.emptyText}>A new day. Take your time.</Text>
        )}

        <View style={styles.actions}>
          {onAddHabit && (
            <TouchableOpacity
              style={styles.addButton}
              onPress={onAddHabit}
              accessibilityRole="button"
              accessibilityLabel="Add habit"
              testID="add-habit-button"
            >
              <Ionicons name="add" size={16} color="#D4845A" />
              <Text style={styles.addButtonText}>Add habit</Text>
            </TouchableOpacity>
          )}
          {onManageHabits && habits.length > 0 && (
            <TouchableOpacity
              style={styles.manageButton}
              onPress={onManageHabits}
              accessibilityRole="button"
              accessibilityLabel="Manage habits"
              testID="manage-habits-button"
            >
              <Text style={styles.manageButtonText}>Manage</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 8,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#E8E0D8',
    marginLeft: 42,
  },
  emptyText: {
    fontSize: 14,
    color: '#8B7D72',
    textAlign: 'center',
    paddingVertical: 16,
    fontStyle: 'italic',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    marginTop: 4,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  addButtonText: {
    fontSize: 14,
    color: '#D4845A',
    fontWeight: '500',
  },
  manageButton: {
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  manageButtonText: {
    fontSize: 13,
    color: '#B8ADA4',
  },
});

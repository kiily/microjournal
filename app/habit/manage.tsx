import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useHabits } from '../../src/hooks/useHabits';
import { useDayStore } from '../../src/stores/useDayStore';
import type { HabitWithProgress } from '../../src/types';
import { getCategoryColor } from '../../src/constants/categories';

export default function ManageHabitsScreen() {
  const { habits, loadHabitsForToday, archiveHabit } = useHabits();

  useEffect(() => {
    loadHabitsForToday();
  }, [loadHabitsForToday]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.closeButton}
          accessibilityRole="button"
          accessibilityLabel="Close"
        >
          <Ionicons name="close" size={22} color="#2C2420" />
        </TouchableOpacity>
        <Text style={styles.title}>Manage habits</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.push('/habit/new')}
          accessibilityRole="button"
          accessibilityLabel="Add habit"
        >
          <Ionicons name="add" size={22} color="#D4845A" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={habits}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <HabitManageRow
            habit={item}
            onEdit={() => router.push(`/habit/${item.id}`)}
            onArchive={() => archiveHabit(item.id)}
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={styles.listContent}
        testID="manage-habits-list"
      />
    </SafeAreaView>
  );
}

function HabitManageRow({
  habit,
  onEdit,
  onArchive,
}: {
  habit: HabitWithProgress;
  onEdit: () => void;
  onArchive: () => void;
}) {
  const categoryColor = getCategoryColor(habit.category);

  return (
    <View style={styles.row} testID={`manage-habit-${habit.id}`}>
      <View style={[styles.colorBar, { backgroundColor: categoryColor }]} />
      <View style={styles.rowContent}>
        <Text style={styles.habitName} numberOfLines={1}>{habit.name}</Text>
        <Text style={styles.habitMeta}>
          {habit.category} · {habit.totalCompletions} days
        </Text>
      </View>
      <View style={styles.rowActions}>
        <TouchableOpacity
          onPress={onEdit}
          style={styles.actionButton}
          accessibilityRole="button"
          accessibilityLabel={`Edit ${habit.name}`}
        >
          <Ionicons name="create-outline" size={18} color="#8B7D72" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onArchive}
          style={styles.actionButton}
          accessibilityRole="button"
          accessibilityLabel={`Archive ${habit.name}`}
        >
          <Ionicons name="archive-outline" size={18} color="#B8ADA4" />
        </TouchableOpacity>
      </View>
    </View>
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
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E8E0D8',
  },
  closeButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    color: '#2C2420',
  },
  addButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContent: {
    paddingVertical: 8,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#E8E0D8',
    marginLeft: 56,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    gap: 12,
  },
  colorBar: {
    width: 4,
    height: 40,
    borderRadius: 2,
  },
  rowContent: {
    flex: 1,
  },
  habitName: {
    fontSize: 15,
    fontWeight: '500',
    color: '#2C2420',
    marginBottom: 2,
  },
  habitMeta: {
    fontSize: 12,
    color: '#8B7D72',
    textTransform: 'capitalize',
  },
  rowActions: {
    flexDirection: 'row',
    gap: 4,
  },
  actionButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { eq } from 'drizzle-orm';
import { getDatabase } from '../../src/db/client';
import { habit } from '../../src/db/schema';
import { HabitForm } from '../../src/components/habit/HabitForm';
import { useHabits } from '../../src/hooks/useHabits';
import type { Habit, HabitCategory } from '../../src/types';

export default function EditHabitScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [habitData, setHabitData] = useState<Habit | null>(null);
  const { updateHabit, archiveHabit } = useHabits();

  useEffect(() => {
    async function loadHabit() {
      if (!id) return;
      const db = getDatabase();
      const rows = await db.select().from(habit).where(eq(habit.id, id)).limit(1);
      if (rows.length > 0) {
        const h = rows[0];
        setHabitData({
          id: h.id,
          name: h.name,
          icon: h.icon,
          category: h.category as HabitCategory,
          isArchived: h.isArchived ?? false,
          sortOrder: h.sortOrder,
          createdAt: h.createdAt,
          updatedAt: h.updatedAt,
        });
      }
    }
    loadHabit();
  }, [id]);

  const handleSubmit = async (name: string, category: HabitCategory, icon: string) => {
    if (!id) return;
    await updateHabit(id, { name, category, icon });
    router.back();
  };

  const handleArchive = () => {
    Alert.alert(
      'Archive habit',
      'This will hide the habit from your daily list. Your history is preserved.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Archive',
          style: 'destructive',
          onPress: async () => {
            if (!id) return;
            await archiveHabit(id);
            router.back();
          },
        },
      ],
    );
  };

  if (!habitData) return null;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Edit habit</Text>
      </View>
      <HabitForm
        initialName={habitData.name}
        initialCategory={habitData.category}
        initialIcon={habitData.icon}
        onSubmit={handleSubmit}
        onCancel={() => router.back()}
        submitLabel="Save changes"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF6F1',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E8E0D8',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C2420',
    textAlign: 'center',
  },
});

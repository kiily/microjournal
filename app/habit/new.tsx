import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import { HabitForm } from '../../src/components/habit/HabitForm';
import { useHabits } from '../../src/hooks/useHabits';
import type { HabitCategory } from '../../src/types';

export default function NewHabitScreen() {
  const { createHabit } = useHabits();

  const handleSubmit = async (name: string, category: HabitCategory, icon: string) => {
    await createHabit(name, category, icon);
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>New habit</Text>
      </View>
      <HabitForm
        onSubmit={handleSubmit}
        onCancel={() => router.back()}
        submitLabel="Add habit"
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

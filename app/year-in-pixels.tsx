import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { getDatabase } from '../src/db/client';
import { moodEntry } from '../src/db/schema';
import { YearPixels } from '../src/components/journal/YearPixels';
import type { MoodLevel } from '../src/types';

export default function YearInPixelsScreen() {
  const [year] = useState(new Date().getFullYear());
  const [moodByDate, setMoodByDate] = useState(new Map<string, MoodLevel>());

  useEffect(() => {
    loadMoodData();
  }, []);

  async function loadMoodData() {
    const db = getDatabase();
    const moods = await db.select().from(moodEntry);
    const map = new Map<string, MoodLevel>();
    moods.forEach((m) => map.set(m.date, m.moodLevel as MoodLevel));
    setMoodByDate(map);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel="Back"
          testID="year-pixels-back"
        >
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{year}</Text>
        <View style={styles.spacer} />
      </View>

      <YearPixels year={year} moodByDate={moodByDate} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF6F1',
    paddingTop: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  backText: {
    fontSize: 15,
    color: '#8B7D72',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C2420',
  },
  spacer: {
    width: 60,
  },
});

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import type { MoodLevel } from '../../types';
import { getMoodColor } from '../../constants/moods';
import {
  getDaysInMonthArray,
  getMonthStartDayOfWeek,
  parseDateString,
  getTodayString,
} from '../../lib/dates';

interface CalendarGridProps {
  year: number;
  month: number; // 1-12
  moodByDate: Map<string, MoodLevel>;
  onDayPress?: (date: string) => void;
}

const DAY_LABELS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

export function CalendarGrid({ year, month, moodByDate, onDayPress }: CalendarGridProps) {
  const days = getDaysInMonthArray(year, month);
  const startDayOfWeek = getMonthStartDayOfWeek(year, month);
  const today = getTodayString();

  // Fill leading empty days
  const emptyCells = Array(startDayOfWeek).fill(null);

  return (
    <View testID="calendar-grid">
      {/* Day labels */}
      <View style={styles.dayLabels}>
        {DAY_LABELS.map((label) => (
          <Text key={label} style={styles.dayLabel}>
            {label}
          </Text>
        ))}
      </View>

      {/* Days grid */}
      <View style={styles.grid}>
        {emptyCells.map((_, i) => (
          <View key={`empty-${i}`} style={styles.dayCell} />
        ))}
        {days.map((dateStr) => {
          const moodLevel = moodByDate.get(dateStr);
          const isToday = dateStr === today;
          const dayNum = parseDateString(dateStr).getDate();

          return (
            <TouchableOpacity
              key={dateStr}
              style={[styles.dayCell, isToday && styles.todayCell]}
              onPress={() => onDayPress?.(dateStr)}
              accessibilityLabel={`${dateStr}${moodLevel ? `, mood: ${moodLevel}` : ', no entry'}`}
              accessibilityRole="button"
              testID={`calendar-day-${dateStr}`}
            >
              <View
                style={[
                  styles.dot,
                  moodLevel
                    ? { backgroundColor: getMoodColor(moodLevel) }
                    : styles.emptyDot,
                  isToday && styles.todayDot,
                ]}
              />
              <Text style={[styles.dayNum, isToday && styles.todayNum]}>{dayNum}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dayLabels: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  dayLabel: {
    flex: 1,
    textAlign: 'center',
    fontSize: 11,
    fontWeight: '600',
    color: '#B8ADA4',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: `${100 / 7}%`,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
  },
  todayCell: {
    backgroundColor: '#F2DDD0',
    borderRadius: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  emptyDot: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderStyle: 'dotted',
    borderColor: '#B8ADA4',
  },
  todayDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  dayNum: {
    fontSize: 10,
    color: '#8B7D72',
  },
  todayNum: {
    color: '#D4845A',
    fontWeight: '600',
  },
});

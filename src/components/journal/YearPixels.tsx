import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import type { MoodLevel } from '../../types';
import { getMoodColor } from '../../constants/moods';
import { getAllDaysInYear, getTodayString } from '../../lib/dates';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CELL_SIZE = Math.floor((SCREEN_WIDTH - 40) / 52); // 52 weeks in a year
const CELL_GAP = 2;

interface YearPixelsProps {
  year: number;
  moodByDate: Map<string, MoodLevel>;
  onDayPress?: (date: string) => void;
}

const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function YearPixels({ year, moodByDate, onDayPress }: YearPixelsProps) {
  const allDays = getAllDaysInYear(year);
  const today = getTodayString();

  // Organize days into weeks (columns of 7)
  const weeks: (string | null)[][] = [];
  let week: (string | null)[] = [];

  // Find the starting day of week for Jan 1 (0=Mon)
  const jan1 = new Date(year, 0, 1);
  const startPadding = (jan1.getDay() + 6) % 7;

  // Add padding to first week
  for (let i = 0; i < startPadding; i++) {
    week.push(null);
  }

  for (const day of allDays) {
    week.push(day);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }
  if (week.length > 0) {
    weeks.push(week);
  }

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
      testID="year-pixels"
    >
      <View>
        {/* Month labels */}
        <View style={styles.monthRow}>
          {MONTH_LABELS.map((label, i) => (
            <Text
              key={label}
              style={[styles.monthLabel, { left: getMonthOffset(year, i + 1) }]}
            >
              {label}
            </Text>
          ))}
        </View>

        {/* Pixel grid */}
        <View style={styles.grid}>
          {weeks.map((weekDays, weekIndex) => (
            <View key={weekIndex} style={styles.week}>
              {weekDays.map((dateStr, dayIndex) => {
                if (!dateStr) {
                  return <View key={`empty-${dayIndex}`} style={styles.cell} />;
                }

                const moodLevel = moodByDate.get(dateStr);
                const isToday = dateStr === today;
                const isFuture = dateStr > today;

                return (
                  <TouchableOpacity
                    key={dateStr}
                    style={[
                      styles.cell,
                      moodLevel
                        ? { backgroundColor: getMoodColor(moodLevel) }
                        : isFuture
                        ? styles.futureCell
                        : styles.emptyCell,
                      isToday && styles.todayCell,
                    ]}
                    onPress={() => !isFuture && onDayPress?.(dateStr)}
                    disabled={isFuture}
                    accessibilityLabel={`${dateStr}${moodLevel ? `, mood level ${moodLevel}` : ', no entry'}`}
                    testID={`pixel-${dateStr}`}
                  />
                );
              })}
            </View>
          ))}
        </View>

        {/* Legend */}
        <View style={styles.legend}>
          <Text style={styles.legendLabel}>Struggling</Text>
          {([1, 2, 3, 4, 5] as MoodLevel[]).map((level) => (
            <View
              key={level}
              style={[styles.legendCell, { backgroundColor: getMoodColor(level) }]}
            />
          ))}
          <Text style={styles.legendLabel}>Thriving</Text>
        </View>
      </View>
    </ScrollView>
  );
}

function getMonthOffset(year: number, month: number): number {
  // Calculate which week index month starts at
  const jan1DayOfWeek = (new Date(year, 0, 1).getDay() + 6) % 7;
  const daysBeforeMonth = getDaysBeforeMonth(year, month);
  const totalOffset = jan1DayOfWeek + daysBeforeMonth;
  const weekIndex = Math.floor(totalOffset / 7);
  return weekIndex * (CELL_SIZE + CELL_GAP);
}

function getDaysBeforeMonth(year: number, month: number): number {
  let days = 0;
  for (let m = 1; m < month; m++) {
    days += new Date(year, m, 0).getDate();
  }
  return days;
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: 20,
  },
  monthRow: {
    height: 20,
    position: 'relative',
    marginBottom: 4,
  },
  monthLabel: {
    position: 'absolute',
    fontSize: 10,
    color: '#8B7D72',
    fontWeight: '500',
  },
  grid: {
    flexDirection: 'row',
    gap: CELL_GAP,
  },
  week: {
    flexDirection: 'column',
    gap: CELL_GAP,
  },
  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    borderRadius: 2,
  },
  emptyCell: {
    borderWidth: 1,
    borderStyle: 'dotted',
    borderColor: '#D4CEC8',
    backgroundColor: 'transparent',
  },
  futureCell: {
    backgroundColor: '#F0EDE8',
  },
  todayCell: {
    borderWidth: 2,
    borderColor: '#D4845A',
  },
  legend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 12,
    justifyContent: 'flex-end',
  },
  legendLabel: {
    fontSize: 10,
    color: '#8B7D72',
  },
  legendCell: {
    width: 10,
    height: 10,
    borderRadius: 2,
  },
});

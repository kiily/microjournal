import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { Ionicons } from '@expo/vector-icons';
import type { HabitWithProgress } from '../../types';
import { getCategoryColor } from '../../constants/categories';

interface HabitRowProps {
  habit: HabitWithProgress;
  onToggle: (habitId: string) => void;
  onLongPress?: (habitId: string) => void;
}

const SPRING_CONFIG = {
  damping: 12,
  stiffness: 300,
  mass: 0.6,
};

export function HabitRow({ habit, onToggle, onLongPress }: HabitRowProps) {
  const scale = useSharedValue(1);
  const categoryColor = getCategoryColor(habit.category);

  const handleToggle = useCallback(async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    // Spring animation
    scale.value = withSequence(
      withSpring(0.85, { damping: 15, stiffness: 400 }),
      withSpring(1.1, SPRING_CONFIG),
      withSpring(1, SPRING_CONFIG),
    );

    onToggle(habit.id);
  }, [habit.id, onToggle, scale]);

  const handleLongPress = useCallback(async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onLongPress?.(habit.id);
  }, [habit.id, onLongPress]);

  const animatedCircleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <View style={styles.container} testID={`habit-row-${habit.id}`}>
      <TouchableOpacity
        style={styles.toggleArea}
        onPress={handleToggle}
        onLongPress={handleLongPress}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: habit.completedToday }}
        accessibilityLabel={`${habit.name}: ${habit.completedToday ? 'completed' : 'incomplete'}`}
        testID={`habit-toggle-${habit.id}`}
      >
        <Animated.View
          style={[
            styles.circle,
            habit.completedToday
              ? { backgroundColor: categoryColor, borderColor: categoryColor }
              : { borderColor: '#B8ADA4' },
            animatedCircleStyle,
          ]}
        >
          {habit.completedToday && (
            <Ionicons name="checkmark" size={14} color="#FFFFFF" />
          )}
        </Animated.View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.content}
        onPress={handleToggle}
        onLongPress={handleLongPress}
        activeOpacity={0.6}
      >
        <Text
          style={[
            styles.name,
            habit.completedToday && styles.nameCompleted,
          ]}
          numberOfLines={1}
        >
          {habit.name}
        </Text>
      </TouchableOpacity>

      <View
        style={[styles.categoryDot, { backgroundColor: categoryColor }]}
        accessibilityLabel={`Category: ${habit.category}`}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 12,
  },
  toggleArea: {
    padding: 4,
  },
  circle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: 15,
    fontWeight: '400',
    color: '#2C2420',
  },
  nameCompleted: {
    color: '#8B7D72',
    textDecorationLine: 'line-through',
  },
  categoryDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});

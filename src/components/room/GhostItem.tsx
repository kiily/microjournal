import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import type { HabitCategory } from '../../types';
import { getCategoryColor } from '../../constants/categories';
import { getDaysUntilNextTier } from '../../lib/progress';
import { ghostItemTooltip } from '../../constants/copy';

interface GhostItemProps {
  habitName: string;
  category: HabitCategory;
  totalCompletions: number;
  onPress?: () => void;
}

export function GhostItem({ habitName, category, totalCompletions, onPress }: GhostItemProps) {
  const opacity = useRef(new Animated.Value(0.3)).current;
  const daysLeft = getDaysUntilNextTier(totalCompletions) ?? 0;
  const categoryColor = getCategoryColor(category);
  const tooltipText = ghostItemTooltip(habitName, daysLeft);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.5,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.2,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [opacity]);

  return (
    <TouchableOpacity
      onPress={onPress}
      testID={`ghost-item-${habitName}`}
      accessibilityLabel={tooltipText}
      accessibilityRole="button"
    >
      <Animated.View
        style={[
          styles.ghost,
          {
            borderColor: categoryColor,
            opacity,
          },
        ]}
      >
        <Text style={[styles.label, { color: categoryColor }]}>
          {daysLeft}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  ghost: {
    width: 48,
    height: 48,
    borderRadius: 12,
    borderWidth: 2,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
  },
});

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';
import type { MoodLevel } from '../../types';
import { MOODS, MOOD_LEVELS } from '../../constants/moods';
import { MOOD_PROMPT } from '../../constants/copy';

interface MoodPickerProps {
  selectedLevel: MoodLevel | null;
  onSelect: (level: MoodLevel) => void;
}

export function MoodPicker({ selectedLevel, onSelect }: MoodPickerProps) {
  const handleSelect = async (level: MoodLevel) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onSelect(level);
  };

  return (
    <View testID="mood-picker">
      <Text style={styles.prompt}>{MOOD_PROMPT}</Text>
      <View style={styles.options}>
        {MOOD_LEVELS.map((level) => {
          const mood = MOODS[level];
          const isSelected = selectedLevel === level;

          return (
            <TouchableOpacity
              key={level}
              style={[
                styles.option,
                isSelected && { borderColor: mood.color, backgroundColor: mood.color + '20' },
              ]}
              onPress={() => handleSelect(level)}
              accessibilityLabel={`Mood: ${mood.label}`}
              accessibilityRole="radio"
              accessibilityState={{ checked: isSelected }}
              testID={`mood-option-${level}`}
              activeOpacity={0.7}
            >
              <Text style={styles.emoji}>{mood.emoji}</Text>
              <View
                style={[styles.dot, { backgroundColor: isSelected ? mood.color : '#D4D0CB' }]}
              />
              <Text style={[styles.label, isSelected && { color: mood.color, fontWeight: '600' }]}>
                {mood.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  prompt: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2C2420',
    marginBottom: 16,
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 6,
  },
  option: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 4,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: 'transparent',
    gap: 6,
  },
  emoji: {
    fontSize: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  label: {
    fontSize: 10,
    color: '#8B7D72',
    textAlign: 'center',
    fontWeight: '400',
  },
});

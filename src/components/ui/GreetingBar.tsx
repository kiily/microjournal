import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { TimeOfDay } from '../../types';
import { GREETINGS } from '../../constants/copy';

interface GreetingBarProps {
  displayName: string;
  timeOfDay: TimeOfDay;
  onSettingsPress?: () => void;
  onFocusPress?: () => void;
}

export function GreetingBar({
  displayName,
  timeOfDay,
  onSettingsPress,
  onFocusPress,
}: GreetingBarProps) {
  const greetingText = GREETINGS[timeOfDay](displayName || 'there');

  return (
    <View style={styles.container} testID="greeting-bar">
      <View style={styles.left}>
        <TimeIcon timeOfDay={timeOfDay} />
        <Text style={styles.greeting} testID="greeting-text">
          {greetingText}
        </Text>
      </View>
      <View style={styles.actions}>
        {onFocusPress && (
          <TouchableOpacity
            style={styles.iconButton}
            onPress={onFocusPress}
            accessibilityLabel="Focus timer"
            accessibilityRole="button"
            testID="focus-button"
          >
            <Ionicons name="timer-outline" size={22} color="#2C2420" />
          </TouchableOpacity>
        )}
        {onSettingsPress && (
          <TouchableOpacity
            style={styles.iconButton}
            onPress={onSettingsPress}
            accessibilityLabel="Settings"
            accessibilityRole="button"
            testID="settings-button"
          >
            <Ionicons name="settings-outline" size={22} color="#2C2420" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

function TimeIcon({ timeOfDay }: { timeOfDay: TimeOfDay }) {
  const iconName = {
    morning: 'sunny-outline',
    afternoon: 'partly-sunny-outline',
    evening: 'partly-sunny-outline',
    night: 'moon-outline',
  }[timeOfDay] as 'sunny-outline' | 'partly-sunny-outline' | 'moon-outline';

  return (
    <Ionicons name={iconName} size={16} color="#8B7D72" style={styles.timeIcon} />
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'transparent',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  timeIcon: {
    marginRight: 4,
  },
  greeting: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2C2420',
    letterSpacing: -0.2,
  },
  actions: {
    flexDirection: 'row',
    gap: 4,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

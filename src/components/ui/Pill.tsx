import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface PillProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  color?: string;
  size?: 'sm' | 'md';
  testID?: string;
}

export function Pill({
  label,
  selected = false,
  onPress,
  color = '#D4845A',
  size = 'md',
  testID,
}: PillProps) {
  const containerStyle: ViewStyle = {
    ...styles.container,
    ...(size === 'sm' ? styles.containerSm : styles.containerMd),
    backgroundColor: selected ? color : 'transparent',
    borderColor: selected ? color : '#B8ADA4',
  };

  const textStyle: TextStyle = {
    ...styles.label,
    ...(size === 'sm' ? styles.labelSm : styles.labelMd),
    color: selected ? '#FFFFFF' : '#8B7D72',
  };

  return (
    <TouchableOpacity
      style={containerStyle}
      onPress={onPress}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      testID={testID ?? `pill-${label}`}
    >
      <Text style={textStyle}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 100,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  containerMd: {
    paddingHorizontal: 14,
    paddingVertical: 7,
  },
  containerSm: {
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  label: {
    fontWeight: '500',
    letterSpacing: 0.1,
  },
  labelMd: {
    fontSize: 14,
  },
  labelSm: {
    fontSize: 12,
  },
});

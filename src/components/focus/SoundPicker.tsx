import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { AmbientSound } from '../../types';
import { AMBIENT_SOUND_OPTIONS } from '../../constants/sounds';
import { getFocusSoundLabel, getFocusSoundIcon } from '../../lib/sounds';

interface SoundPickerProps {
  selectedSound: AmbientSound;
  onSoundSelect: (sound: AmbientSound) => void;
}

export function SoundPicker({ selectedSound, onSoundSelect }: SoundPickerProps) {
  return (
    <View style={styles.container} testID="sound-picker">
      <View style={styles.grid}>
        {AMBIENT_SOUND_OPTIONS.map((sound) => {
          const isSelected = selectedSound === sound;
          const label = getFocusSoundLabel(sound);
          const icon = getFocusSoundIcon(sound);

          return (
            <TouchableOpacity
              key={sound ?? 'silence'}
              style={[styles.option, isSelected && styles.optionSelected]}
              onPress={() => onSoundSelect(sound)}
              testID={`sound-option-${sound ?? 'silence'}`}
              accessibilityRole="radio"
              accessibilityState={{ checked: isSelected }}
              accessibilityLabel={label}
            >
              <Ionicons
                name={icon as 'cloud-rain' | 'musical-notes' | 'volume-mute'}
                size={22}
                color={isSelected ? '#D4845A' : '#8B7D72'}
              />
              <Text style={[styles.label, isSelected && styles.labelSelected]}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  grid: {
    flexDirection: 'row',
    gap: 12,
  },
  option: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: 'transparent',
    gap: 6,
    minWidth: 72,
  },
  optionSelected: {
    borderColor: '#D4845A',
    backgroundColor: '#F2DDD0',
  },
  label: {
    fontSize: 12,
    color: '#8B7D72',
    fontWeight: '500',
  },
  labelSelected: {
    color: '#D4845A',
  },
});

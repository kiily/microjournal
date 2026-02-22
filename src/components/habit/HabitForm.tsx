import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import type { HabitCategory } from '../../types';
import { CategoryPicker } from './CategoryPicker';
import { IconGrid } from './IconGrid';
import { ADD_HABIT_PLACEHOLDER } from '../../constants/copy';

interface HabitFormProps {
  initialName?: string;
  initialCategory?: HabitCategory;
  initialIcon?: string;
  onSubmit: (name: string, category: HabitCategory, icon: string) => void;
  onCancel?: () => void;
  submitLabel?: string;
}

export function HabitForm({
  initialName = '',
  initialCategory,
  initialIcon,
  onSubmit,
  onCancel,
  submitLabel = 'Save',
}: HabitFormProps) {
  const [name, setName] = useState(initialName);
  const [category, setCategory] = useState<HabitCategory | null>(initialCategory ?? null);
  const [icon, setIcon] = useState<string | null>(initialIcon ?? null);

  const handleCategorySelect = (cat: HabitCategory) => {
    setCategory(cat);
    // Reset icon when category changes
    if (category !== cat) {
      setIcon(null);
    }
  };

  const handleSubmit = () => {
    if (!name.trim()) {
      Alert.alert('', 'What do you want to do?');
      return;
    }
    if (!category) {
      Alert.alert('', 'Pick a category.');
      return;
    }
    if (!icon) {
      Alert.alert('', 'Pick an icon.');
      return;
    }
    onSubmit(name.trim(), category, icon);
  };

  const isValid = name.trim().length > 0 && category !== null && icon !== null;

  return (
    <ScrollView
      style={styles.container}
      keyboardShouldPersistTaps="handled"
      testID="habit-form"
      showsVerticalScrollIndicator={false}
    >
      {/* Name input */}
      <View style={styles.section}>
        <TextInput
          style={styles.nameInput}
          value={name}
          onChangeText={setName}
          placeholder={ADD_HABIT_PLACEHOLDER}
          placeholderTextColor="#B8ADA4"
          maxLength={60}
          returnKeyType="done"
          autoFocus
          testID="habit-name-input"
          accessibilityLabel="Habit name"
        />
      </View>

      <View style={styles.divider} />

      {/* Category picker */}
      <View style={styles.section}>
        <CategoryPicker selectedCategory={category} onSelect={handleCategorySelect} />
      </View>

      <View style={styles.divider} />

      {/* Icon grid */}
      <View style={styles.section}>
        <IconGrid category={category} selectedIcon={icon} onSelect={setIcon} />
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        {onCancel && (
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={onCancel}
            testID="habit-form-cancel"
            accessibilityRole="button"
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.submitButton, !isValid && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={!isValid}
          testID="habit-form-submit"
          accessibilityRole="button"
          accessibilityState={{ disabled: !isValid }}
        >
          <Text style={styles.submitText}>{submitLabel}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomPadding} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF6F1',
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  nameInput: {
    fontSize: 22,
    fontWeight: '500',
    color: '#2C2420',
    paddingVertical: 4,
    borderBottomWidth: 2,
    borderBottomColor: '#E8E0D8',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#E8E0D8',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  cancelButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  cancelText: {
    fontSize: 15,
    color: '#8B7D72',
  },
  submitButton: {
    backgroundColor: '#D4845A',
    borderRadius: 100,
    paddingVertical: 12,
    paddingHorizontal: 28,
  },
  submitButtonDisabled: {
    backgroundColor: '#D4CEC8',
  },
  submitText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  bottomPadding: {
    height: 40,
  },
});

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import type { HabitCategory } from '../../types';
import { CATEGORY_LIST } from '../../constants/categories';

interface CategoryPickerProps {
  selectedCategory: HabitCategory | null;
  onSelect: (category: HabitCategory) => void;
}

export function CategoryPicker({ selectedCategory, onSelect }: CategoryPickerProps) {
  return (
    <View testID="category-picker">
      <Text style={styles.label}>Category</Text>
      <View style={styles.grid}>
        {CATEGORY_LIST.map((category) => {
          const isSelected = selectedCategory === category.id;
          return (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.option,
                { borderColor: isSelected ? category.color : 'transparent' },
                isSelected && { backgroundColor: category.color + '20' },
              ]}
              onPress={() => onSelect(category.id)}
              testID={`category-option-${category.id}`}
              accessibilityRole="radio"
              accessibilityState={{ checked: isSelected }}
              accessibilityLabel={`${category.label}: ${category.description}`}
            >
              <View style={[styles.colorDot, { backgroundColor: category.color }]} />
              <Text style={[styles.categoryLabel, isSelected && { color: category.color, fontWeight: '600' }]}>
                {category.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#8B7D72',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: 12,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 100,
    borderWidth: 1.5,
    backgroundColor: '#F5EDE4',
  },
  colorDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  categoryLabel: {
    fontSize: 14,
    color: '#2C2420',
    fontWeight: '400',
  },
});

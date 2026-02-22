import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { HabitCategory } from '../../types';
import { CATEGORIES, getCategoryColor } from '../../constants/categories';

interface IconGridProps {
  category: HabitCategory | null;
  selectedIcon: string | null;
  onSelect: (icon: string) => void;
}

// Map icon strings to Ionicons names for rendering
const ICON_MAP: Record<string, keyof typeof Ionicons.glyphMap> = {
  'droplets': 'water-outline',
  'moon': 'moon-outline',
  'heart': 'heart-outline',
  'sun': 'sunny-outline',
  'leaf': 'leaf-outline',
  'apple': 'nutrition-outline',
  'shield': 'shield-outline',
  'smile': 'happy-outline',
  'zap': 'flash-outline',
  'feather': 'feather',
  'thermometer': 'thermometer-outline',
  'activity': 'pulse-outline',
  'book-open': 'book-outline',
  'brain': 'bulb-outline',
  'lightbulb': 'bulb-outline',
  'pen': 'pencil-outline',
  'graduation-cap': 'school-outline',
  'search': 'search-outline',
  'compass': 'compass-outline',
  'target': 'radio-button-on-outline',
  'layers': 'layers-outline',
  'bookmark': 'bookmark-outline',
  'edit': 'create-outline',
  'file-text': 'document-text-outline',
  'phone': 'call-outline',
  'message-circle': 'chatbubble-outline',
  'users': 'people-outline',
  'mail': 'mail-outline',
  'send': 'send-outline',
  'home': 'home-outline',
  'coffee': 'cafe-outline',
  'gift': 'gift-outline',
  'star': 'star-outline',
  'handshake': 'hand-right-outline',
  'bicycle': 'bicycle-outline',
  'running': 'walk-outline',
  'mountain': 'trail-sign-outline',
  'flame': 'flame-outline',
  'wind': 'cloud-outline',
  'shuffle': 'shuffle-outline',
  'trending-up': 'trending-up-outline',
  'award': 'trophy-outline',
  'navigation': 'navigate-outline',
  'map-pin': 'location-outline',
  'music': 'musical-notes-outline',
  'camera': 'camera-outline',
  'image': 'image-outline',
  'pen-tool': 'brush-outline',
  'scissors': 'cut-outline',
  'code': 'code-outline',
  'film': 'film-outline',
  'mic': 'mic-outline',
  'edit-3': 'create-outline',
  'palette': 'color-palette-outline',
  'brush': 'brush-outline',
  'sparkles': 'sparkles-outline',
  'cloud': 'cloud-outline',
  'battery': 'battery-half-outline',
  'pause': 'pause-circle-outline',
  'sunset': 'partly-sunny-outline',
  'umbrella': 'umbrella-outline',
  'waves': 'water-outline',
  'anchor': 'glasses-outline',
  'eye': 'eye-outline',
};

export function IconGrid({ category, selectedIcon, onSelect }: IconGridProps) {
  const icons = category ? CATEGORIES[category].icons : [];
  const categoryColor = category ? getCategoryColor(category) : '#D4845A';

  if (!category) {
    return (
      <View style={styles.placeholder}>
        <Text style={styles.placeholderText}>Select a category first</Text>
      </View>
    );
  }

  return (
    <View testID="icon-grid">
      <Text style={styles.label}>Icon</Text>
      <View style={styles.grid}>
        {icons.map((icon) => {
          const isSelected = selectedIcon === icon;
          const ioniconsName = ICON_MAP[icon] ?? 'ellipse-outline';

          return (
            <TouchableOpacity
              key={icon}
              style={[
                styles.iconButton,
                isSelected && {
                  backgroundColor: categoryColor + '25',
                  borderColor: categoryColor,
                },
              ]}
              onPress={() => onSelect(icon)}
              testID={`icon-option-${icon}`}
              accessibilityRole="radio"
              accessibilityState={{ checked: isSelected }}
              accessibilityLabel={icon}
            >
              <Ionicons
                name={ioniconsName}
                size={22}
                color={isSelected ? categoryColor : '#8B7D72'}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  placeholder: {
    padding: 20,
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 13,
    color: '#B8ADA4',
    fontStyle: 'italic',
  },
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
    gap: 10,
  },
  iconButton: {
    width: 50,
    height: 50,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: 'transparent',
    backgroundColor: '#F5EDE4',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

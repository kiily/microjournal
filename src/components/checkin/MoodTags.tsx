import React from 'react';
import { View, StyleSheet } from 'react-native';
import type { MoodTag } from '../../types';
import { MOOD_TAGS, MAX_MOOD_TAGS } from '../../constants/moods';
import { Pill } from '../ui/Pill';

interface MoodTagsProps {
  selectedTags: MoodTag[];
  onTagsChange: (tags: MoodTag[]) => void;
}

export function MoodTags({ selectedTags, onTagsChange }: MoodTagsProps) {
  const handleTagPress = (tagId: MoodTag) => {
    const isSelected = selectedTags.includes(tagId);
    if (isSelected) {
      onTagsChange(selectedTags.filter((t) => t !== tagId));
    } else if (selectedTags.length < MAX_MOOD_TAGS) {
      onTagsChange([...selectedTags, tagId]);
    }
  };

  return (
    <View style={styles.container} testID="mood-tags">
      <View style={styles.tagGrid}>
        {MOOD_TAGS.map((tag) => (
          <Pill
            key={tag.id}
            label={tag.label}
            selected={selectedTags.includes(tag.id)}
            onPress={() => handleTagPress(tag.id)}
            size="sm"
            testID={`mood-tag-${tag.id}`}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
  },
  tagGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
});

import type { HabitCategory } from '../types';

export interface CategoryDefinition {
  id: HabitCategory;
  label: string;
  color: string;
  iconArea: string;
  description: string;
  icons: string[];
}

export const CATEGORIES: Record<HabitCategory, CategoryDefinition> = {
  body: {
    id: 'body',
    label: 'Body',
    color: '#9DB88C',
    iconArea: 'Sage',
    description: 'Physical self-care: water, skincare, sleep',
    icons: ['droplets', 'moon', 'heart', 'sun', 'leaf', 'apple', 'shield', 'smile', 'zap', 'feather', 'thermometer', 'activity'],
  },
  mind: {
    id: 'mind',
    label: 'Mind',
    color: '#7B8FA1',
    iconArea: 'Slate',
    description: 'Learning, reading, growth',
    icons: ['book-open', 'brain', 'lightbulb', 'pen', 'graduation-cap', 'search', 'compass', 'target', 'layers', 'bookmark', 'edit', 'file-text'],
  },
  connect: {
    id: 'connect',
    label: 'Connect',
    color: '#C4889B',
    iconArea: 'Dusty rose',
    description: 'Relationships, social, communication',
    icons: ['phone', 'message-circle', 'users', 'heart', 'mail', 'send', 'home', 'smile', 'coffee', 'gift', 'star', 'handshake'],
  },
  move: {
    id: 'move',
    label: 'Move',
    color: '#D4A76A',
    iconArea: 'Amber',
    description: 'Exercise, walking, stretching',
    icons: ['activity', 'bicycle', 'running', 'mountain', 'flame', 'wind', 'shuffle', 'trending-up', 'award', 'zap', 'navigation', 'map-pin'],
  },
  create: {
    id: 'create',
    label: 'Create',
    color: '#A1A1C4',
    iconArea: 'Lavender',
    description: 'Art, music, writing, making',
    icons: ['music', 'camera', 'image', 'pen-tool', 'scissors', 'code', 'film', 'mic', 'edit-3', 'palette', 'brush', 'sparkles'],
  },
  rest: {
    id: 'rest',
    label: 'Rest',
    color: '#8FB8A8',
    iconArea: 'Seafoam',
    description: 'Meditation, journaling, downtime',
    icons: ['moon', 'cloud', 'feather', 'battery', 'pause', 'sunset', 'umbrella', 'waves', 'anchor', 'eye', 'smile', 'leaf'],
  },
};

export const CATEGORY_LIST = Object.values(CATEGORIES);

export function getCategoryColor(category: HabitCategory): string {
  return CATEGORIES[category].color;
}

export function getCategoryLabel(category: HabitCategory): string {
  return CATEGORIES[category].label;
}

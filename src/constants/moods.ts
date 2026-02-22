import type { MoodLevel, MoodTag } from '../types';

export interface MoodDefinition {
  level: MoodLevel;
  label: string;
  color: string;
  avatarState: string;
  roomEffect: string;
  emoji: string;
}

export const MOODS: Record<MoodLevel, MoodDefinition> = {
  1: {
    level: 1,
    label: 'Struggling',
    color: '#7B8FA1',
    avatarState: 'sitting-floor',
    roomEffect: 'overcast',
    emoji: '😔',
  },
  2: {
    level: 2,
    label: 'Low',
    color: '#A1A1C4',
    avatarState: 'sitting-slumped',
    roomEffect: 'cloudy',
    emoji: '😞',
  },
  3: {
    level: 3,
    label: 'Steady',
    color: '#C4B89C',
    avatarState: 'standing-neutral',
    roomEffect: 'daylight',
    emoji: '😐',
  },
  4: {
    level: 4,
    label: 'Good',
    color: '#9DB88C',
    avatarState: 'upright-smile',
    roomEffect: 'warm',
    emoji: '😊',
  },
  5: {
    level: 5,
    label: 'Thriving',
    color: '#D4A76A',
    avatarState: 'animated-arms',
    roomEffect: 'golden',
    emoji: '🌟',
  },
};

export const MOOD_TAGS: { id: MoodTag; label: string }[] = [
  { id: 'energetic', label: 'Energetic' },
  { id: 'calm', label: 'Calm' },
  { id: 'anxious', label: 'Anxious' },
  { id: 'grateful', label: 'Grateful' },
  { id: 'tired', label: 'Tired' },
  { id: 'creative', label: 'Creative' },
  { id: 'lonely', label: 'Lonely' },
  { id: 'focused', label: 'Focused' },
  { id: 'restless', label: 'Restless' },
  { id: 'hopeful', label: 'Hopeful' },
  { id: 'overwhelmed', label: 'Overwhelmed' },
  { id: 'content', label: 'Content' },
];

export const MAX_MOOD_TAGS = 3;

export const MOOD_LEVELS = [1, 2, 3, 4, 5] as const;

export function getMoodColor(level: MoodLevel): string {
  return MOODS[level].color;
}

export function getMoodLabel(level: MoodLevel): string {
  return MOODS[level].label;
}

import type { AmbientSound, MoodLevel, TimeOfDay } from '../types';

export interface SoundAsset {
  id: string;
  label: string;
  file: string;
  icon: string;
}

export const AMBIENT_SOUNDS: SoundAsset[] = [
  { id: 'rain', label: 'Rain', file: 'assets/sounds/rain.mp3', icon: 'cloud-rain' },
  { id: 'forest', label: 'Forest', file: 'assets/sounds/forest.mp3', icon: 'tree' },
  { id: 'lofi', label: 'Lo-fi', file: 'assets/sounds/lofi.mp3', icon: 'music' },
];

export const ROOM_AMBIENT_SOUNDS: Record<TimeOfDay, string> = {
  morning: 'assets/sounds/ambient-morning.mp3',
  afternoon: 'assets/sounds/ambient-afternoon.mp3',
  evening: 'assets/sounds/ambient-evening.mp3',
  night: 'assets/sounds/ambient-night.mp3',
};

// Override sounds based on mood level
export function getSoundOverrideForMood(moodLevel: MoodLevel): string | null {
  if (moodLevel <= 2) return 'assets/sounds/rain.mp3';
  return null;
}

export const DEFAULT_VOLUME = 0.3; // 30%
export const AMBIENT_SOUND_OPTIONS: AmbientSound[] = ['rain', 'forest', 'lofi', null];

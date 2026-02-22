import type { MoodLevel, TimeOfDay, AmbientSound } from '../types';
import { ROOM_AMBIENT_SOUNDS, getSoundOverrideForMood, DEFAULT_VOLUME } from '../constants/sounds';

/**
 * Determines which ambient sound file should be played given the time of day and mood.
 * Mood override (rain for low moods) takes priority.
 */
export function selectAmbientSound(timeOfDay: TimeOfDay, moodLevel: MoodLevel | null): string {
  if (moodLevel !== null) {
    const override = getSoundOverrideForMood(moodLevel);
    if (override) return override;
  }

  return ROOM_AMBIENT_SOUNDS[timeOfDay];
}

/**
 * Returns a display label for a focus ambient sound option.
 */
export function getFocusSoundLabel(sound: AmbientSound): string {
  switch (sound) {
    case 'rain': return 'Rain';
    case 'forest': return 'Forest';
    case 'lofi': return 'Lo-fi';
    case null: return 'Silence';
  }
}

/**
 * Returns the icon name for a focus ambient sound.
 */
export function getFocusSoundIcon(sound: AmbientSound): string {
  switch (sound) {
    case 'rain': return 'cloud-rain';
    case 'forest': return 'tree-pine';
    case 'lofi': return 'music';
    case null: return 'volume-x';
  }
}

/**
 * Clamps a volume value to [0, 1].
 */
export function clampVolume(volume: number): number {
  return Math.min(1, Math.max(0, volume));
}

/**
 * Applies a fade-in effect by returning incremental volume values.
 * Use with setInterval for smooth transitions.
 */
export function* fadeVolume(
  from: number,
  to: number,
  steps: number = 10,
): Generator<number> {
  const step = (to - from) / steps;
  for (let i = 1; i <= steps; i++) {
    yield clampVolume(from + step * i);
  }
}

export { DEFAULT_VOLUME };

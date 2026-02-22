import type { MoodLevel, TimeOfDay } from '../../types';

export interface LightingConfig {
  ambientIntensity: number;
  ambientColor: string;
  directionalIntensity: number;
  directionalColor: string;
  shadowIntensity: number;
  fogColor: string;
  fogDensity: number;
  description: string;
}

/**
 * Returns the lighting configuration based on time of day and mood.
 * Mood overrides when moodLevel <= 2 (Struggling/Low).
 */
export function getLightingConfig(
  timeOfDay: TimeOfDay,
  moodLevel: MoodLevel | null,
): LightingConfig {
  // Mood overrides for struggling/low states
  if (moodLevel !== null && moodLevel <= 2) {
    return MOOD_LIGHTING[moodLevel] ?? TIME_LIGHTING[timeOfDay];
  }

  // Mood boost for thriving
  if (moodLevel === 5) {
    return {
      ...TIME_LIGHTING[timeOfDay],
      ambientIntensity: TIME_LIGHTING[timeOfDay].ambientIntensity * 1.3,
      directionalIntensity: TIME_LIGHTING[timeOfDay].directionalIntensity * 1.4,
      description: `${TIME_LIGHTING[timeOfDay].description} (thriving glow)`,
    };
  }

  return TIME_LIGHTING[timeOfDay];
}

const TIME_LIGHTING: Record<TimeOfDay, LightingConfig> = {
  morning: {
    ambientIntensity: 0.6,
    ambientColor: '#FFF8E7',
    directionalIntensity: 1.2,
    directionalColor: '#FFD580',
    shadowIntensity: 0.4,
    fogColor: '#FAF6F1',
    fogDensity: 0.01,
    description: 'Soft morning light, golden hour through window',
  },
  afternoon: {
    ambientIntensity: 0.8,
    ambientColor: '#FFFFFF',
    directionalIntensity: 1.5,
    directionalColor: '#FFFAF0',
    shadowIntensity: 0.6,
    fogColor: '#FAF6F1',
    fogDensity: 0.005,
    description: 'Bright daylight, shadows short',
  },
  evening: {
    ambientIntensity: 0.5,
    ambientColor: '#FFE4B5',
    directionalIntensity: 0.9,
    directionalColor: '#FF8C42',
    shadowIntensity: 0.7,
    fogColor: '#F5EDE4',
    fogDensity: 0.02,
    description: 'Warm sunset tones, longer shadows',
  },
  night: {
    ambientIntensity: 0.2,
    ambientColor: '#D4C5A9',
    directionalIntensity: 0.3,
    directionalColor: '#8FA8C8',
    shadowIntensity: 0.9,
    fogColor: '#1C1917',
    fogDensity: 0.05,
    description: 'Lamp light, night sky, stars',
  },
};

const MOOD_LIGHTING: Partial<Record<MoodLevel, LightingConfig>> = {
  1: {
    ambientIntensity: 0.25,
    ambientColor: '#C8D8E8',
    directionalIntensity: 0.4,
    directionalColor: '#9AAFC4',
    shadowIntensity: 0.8,
    fogColor: '#7B8FA1',
    fogDensity: 0.06,
    description: 'Overcast light, muted colors, rain on window',
  },
  2: {
    ambientIntensity: 0.4,
    ambientColor: '#D4D4E8',
    directionalIntensity: 0.6,
    directionalColor: '#A8A8CC',
    shadowIntensity: 0.7,
    fogColor: '#A1A1C4',
    fogDensity: 0.04,
    description: 'Cloudy, cool tones, dimmer',
  },
};

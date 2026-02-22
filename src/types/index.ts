// ─── Mood ────────────────────────────────────────────────────────────────────

export type MoodLevel = 1 | 2 | 3 | 4 | 5;

export type MoodTag =
  | 'energetic'
  | 'calm'
  | 'anxious'
  | 'grateful'
  | 'tired'
  | 'creative'
  | 'lonely'
  | 'focused'
  | 'restless'
  | 'hopeful'
  | 'overwhelmed'
  | 'content';

export interface MoodEntry {
  id: string;
  date: string; // YYYY-MM-DD
  moodLevel: MoodLevel;
  tags: MoodTag[];
  note: string;
  createdAt: string;
  updatedAt: string;
}

// ─── Habits ──────────────────────────────────────────────────────────────────

export type HabitCategory = 'body' | 'mind' | 'connect' | 'move' | 'create' | 'rest';

export interface Habit {
  id: string;
  name: string;
  icon: string;
  category: HabitCategory;
  isArchived: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface HabitLog {
  id: string;
  habitId: string;
  date: string; // YYYY-MM-DD
  completed: boolean;
  createdAt: string;
}

export interface HabitWithProgress extends Habit {
  totalCompletions: number;
  tier: 0 | 1 | 2 | 3; // 0=not unlocked yet
  completedToday: boolean;
}

// ─── Room ─────────────────────────────────────────────────────────────────────

export type RoomTier = 1 | 2 | 3 | 4; // Studio, One-Bed, Loft, Penthouse

export type ItemTier = 1 | 2 | 3;

export interface RoomItem {
  id: string;
  itemType: string;
  tier: ItemTier;
  modelPath: string;
  position: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number };
  scale: number;
  sourceHabitId: string | null;
  unlockedAt: string;
}

export interface RoomItemCatalogEntry {
  itemType: string;
  category: HabitCategory;
  tiers: {
    tier: ItemTier;
    modelPath: string;
    requiredDays: number;
    description: string;
  }[];
  zone: RoomZone;
  slotIndex: number;
}

export type RoomZone = 'body' | 'mind' | 'connect' | 'move' | 'create' | 'rest' | 'focus';

// ─── Focus ────────────────────────────────────────────────────────────────────

export type AmbientSound = 'rain' | 'forest' | 'lofi' | null;

export interface FocusSession {
  id: string;
  targetDurationMinutes: number;
  actualDurationMinutes: number;
  completed: boolean;
  ambientSound: AmbientSound;
  blockedApps: string[];
  rewardPlantType: string | null;
  startedAt: string;
  endedAt: string | null;
}

// ─── User ─────────────────────────────────────────────────────────────────────

export interface UserProfile {
  id: string;
  displayName: string;
  avatarConfig: Record<string, unknown>;
  roomTier: RoomTier;
  onboarded: boolean;
  createdAt: string;
  updatedAt: string;
}

// ─── Time of Day ─────────────────────────────────────────────────────────────

export type TimeOfDay = 'morning' | 'afternoon' | 'evening' | 'night';

// ─── Insights ─────────────────────────────────────────────────────────────────

export interface HabitMoodCorrelation {
  habitId: string;
  habitName: string;
  averageMoodWithHabit: number;
  averageMoodWithoutHabit: number;
  sampleSize: number;
}

// ─── Navigation ───────────────────────────────────────────────────────────────

export type RootStackParamList = {
  index: undefined;
  journal: undefined;
  'year-in-pixels': undefined;
  'onboarding/index': undefined;
  'habit/new': undefined;
  'habit/[id]': { id: string };
  'habit/manage': undefined;
  'focus/index': undefined;
  'focus/apps': undefined;
  'settings/index': undefined;
  'settings/reminders': undefined;
  'settings/appearance': undefined;
  'settings/avatar': undefined;
  'settings/privacy': undefined;
};

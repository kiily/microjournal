import type { TimeOfDay } from '../types';

// ─── Greetings ────────────────────────────────────────────────────────────────

export const GREETINGS: Record<TimeOfDay, (name: string) => string> = {
  morning: (name) => `Morning, ${name}`,
  afternoon: (name) => `Afternoon, ${name}`,
  evening: (name) => `Evening, ${name}`,
  night: (name) => `Hey, ${name}`,
};

export const TIME_PROMPTS: Record<TimeOfDay, string> = {
  morning: "What's on your plate today?",
  afternoon: "How's the day going?",
  evening: 'How was today?',
  night: 'Before you wind down...',
};

// ─── Mood ─────────────────────────────────────────────────────────────────────

export const MOOD_PROMPT = "How's today feeling?";

// ─── Habit check-in ───────────────────────────────────────────────────────────

export const ALL_HABITS_DONE = "Everything done. Your room feels a little cozier tonight.";
export const NO_HABITS_YET = "A new day. Take your time.";
export const ADD_HABIT_PLACEHOLDER = "What do you want to do?";
export const NOTE_PLACEHOLDER = "Add a note...";

// ─── Room / Items ─────────────────────────────────────────────────────────────

export const ITEM_UNLOCKED = "Something new appeared in your room.";
export const FIRST_COMPLETION = "Every habit you complete adds to your room. Over time, it fills up.";

export function ghostItemTooltip(habitName: string, daysLeft: number): string {
  return `Complete ${habitName} ${daysLeft} more time${daysLeft === 1 ? '' : 's'} to unlock this.`;
}

// ─── Notifications ────────────────────────────────────────────────────────────

export const DAILY_REMINDER_MESSAGES = [
  "Your room is waiting.",
  "A minute for yourself?",
  "How was today?",
];

export const RETURN_AFTER_SHORT_ABSENCE = "Welcome back whenever you're ready. No rush.";
export const RETURN_AFTER_LONG_ABSENCE = "Nook is here when you need it. We'll stay quiet until then.";

// ─── Onboarding ───────────────────────────────────────────────────────────────

export const ONBOARDING = {
  roomIntro1: 'This is your room.',
  roomIntro2: "Let's make it yours.",
  namePrompt: 'What should we call you?',
  nameButton: 'Continue',
  moodIntro: 'Your room reflects how you feel.',
  habitsIntro: "Here are some habits to start with. Keep what feels right.",
  completionCta: 'Try completing one.',
  done: "That's it. Come back whenever you're ready.",
};

// ─── Focus mode ───────────────────────────────────────────────────────────────

export const FOCUS = {
  begin: 'Begin',
  cancel: 'Tap to cancel',
  leaveWarning: "Your plant won't grow if you leave. End session?",
  leaveConfirm: 'End session',
  leaveCancel: 'Keep going',
};

// ─── Settings ─────────────────────────────────────────────────────────────────

export const SETTINGS = {
  name: 'Display name',
  reminders: 'Reminders',
  appearance: 'Appearance',
  avatar: 'Avatar',
  privacy: 'Privacy',
  exportData: 'Export my data',
  resetApp: 'Reset app',
  sound: 'Ambient sound',
  volume: 'Volume',
  theme: 'Theme',
  darkMode: 'Dark mode',
};

// ─── Empty states ─────────────────────────────────────────────────────────────

export const EMPTY_STATES = {
  journal: 'Your entries will appear here.',
  noEntry: 'A new day. Take your time.',
  noInsights: 'Keep logging to discover patterns.',
};

// ─── Struggling mood copy ─────────────────────────────────────────────────────

export const STRUGGLING_COPY = 'Noted. Some days are just like that.';
export const WELCOME_BACK = 'Welcome back. Pick up wherever you feel ready.';

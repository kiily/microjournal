import { create } from 'zustand';
import type { MoodEntry, MoodLevel, MoodTag, HabitWithProgress } from '../types';

interface DayState {
  // Today's date
  todayDate: string;

  // Today's mood entry (null if not logged yet)
  todayMood: MoodEntry | null;

  // Today's habits with completion status
  habits: HabitWithProgress[];

  // Loading states
  isMoodLoading: boolean;
  isHabitsLoading: boolean;

  // Actions
  setTodayDate: (date: string) => void;
  setTodayMood: (mood: MoodEntry | null) => void;
  updateMoodLevel: (level: MoodLevel) => void;
  updateMoodTags: (tags: MoodTag[]) => void;
  updateMoodNote: (note: string) => void;
  setHabits: (habits: HabitWithProgress[]) => void;
  toggleHabitCompletion: (habitId: string) => void;
  setMoodLoading: (loading: boolean) => void;
  setHabitsLoading: (loading: boolean) => void;
}

function getTodayDateString(): string {
  return new Date().toISOString().split('T')[0];
}

export const useDayStore = create<DayState>((set) => ({
  todayDate: getTodayDateString(),
  todayMood: null,
  habits: [],
  isMoodLoading: true,
  isHabitsLoading: true,

  setTodayDate: (date) => set({ todayDate: date }),

  setTodayMood: (mood) => set({ todayMood: mood, isMoodLoading: false }),

  updateMoodLevel: (level) =>
    set((state) => ({
      todayMood: state.todayMood
        ? { ...state.todayMood, moodLevel: level, updatedAt: new Date().toISOString() }
        : {
            id: '',
            date: state.todayDate,
            moodLevel: level,
            tags: [],
            note: '',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
    })),

  updateMoodTags: (tags) =>
    set((state) => ({
      todayMood: state.todayMood
        ? { ...state.todayMood, tags, updatedAt: new Date().toISOString() }
        : null,
    })),

  updateMoodNote: (note) =>
    set((state) => ({
      todayMood: state.todayMood
        ? { ...state.todayMood, note, updatedAt: new Date().toISOString() }
        : null,
    })),

  setHabits: (habits) => set({ habits, isHabitsLoading: false }),

  toggleHabitCompletion: (habitId) =>
    set((state) => ({
      habits: state.habits.map((h) =>
        h.id === habitId ? { ...h, completedToday: !h.completedToday } : h,
      ),
    })),

  setMoodLoading: (loading) => set({ isMoodLoading: loading }),
  setHabitsLoading: (loading) => set({ isHabitsLoading: loading }),
}));

export function selectAllHabitsDone(state: DayState): boolean {
  return state.habits.length > 0 && state.habits.every((h) => h.completedToday);
}

export function selectCompletedHabitsCount(state: DayState): number {
  return state.habits.filter((h) => h.completedToday).length;
}

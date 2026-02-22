import { create } from 'zustand';
import type { AmbientSound, FocusSession } from '../types';

type FocusStatus = 'idle' | 'running' | 'completed' | 'cancelled';

interface FocusState {
  // Session config
  targetDuration: number; // minutes
  ambientSound: AmbientSound;
  blockedApps: string[];

  // Active session
  sessionId: string | null;
  status: FocusStatus;
  startedAt: Date | null;
  elapsedSeconds: number;

  // History
  sessions: FocusSession[];

  // Actions
  setTargetDuration: (minutes: number) => void;
  setAmbientSound: (sound: AmbientSound) => void;
  setBlockedApps: (apps: string[]) => void;
  startSession: (sessionId: string) => void;
  tickElapsed: () => void;
  completeSession: () => void;
  cancelSession: () => void;
  setSessions: (sessions: FocusSession[]) => void;
  reset: () => void;
}

export const FOCUS_PRESETS = [15, 25, 45, 60] as const;
export type FocusPreset = (typeof FOCUS_PRESETS)[number];

const DEFAULT_STATE = {
  targetDuration: 25,
  ambientSound: null as AmbientSound,
  blockedApps: [] as string[],
  sessionId: null,
  status: 'idle' as FocusStatus,
  startedAt: null,
  elapsedSeconds: 0,
  sessions: [] as FocusSession[],
};

export const useFocusStore = create<FocusState>((set) => ({
  ...DEFAULT_STATE,

  setTargetDuration: (minutes) => set({ targetDuration: minutes }),

  setAmbientSound: (sound) => set({ ambientSound: sound }),

  setBlockedApps: (apps) => set({ blockedApps: apps }),

  startSession: (sessionId) =>
    set({
      sessionId,
      status: 'running',
      startedAt: new Date(),
      elapsedSeconds: 0,
    }),

  tickElapsed: () =>
    set((state) => ({
      elapsedSeconds: state.elapsedSeconds + 1,
    })),

  completeSession: () =>
    set({
      status: 'completed',
    }),

  cancelSession: () =>
    set({
      status: 'cancelled',
    }),

  setSessions: (sessions) => set({ sessions }),

  reset: () => set(DEFAULT_STATE),
}));

export function selectElapsedMinutes(state: FocusState): number {
  return Math.floor(state.elapsedSeconds / 60);
}

export function selectRemainingSeconds(state: FocusState): number {
  const totalSeconds = state.targetDuration * 60;
  return Math.max(0, totalSeconds - state.elapsedSeconds);
}

export function selectProgressPercent(state: FocusState): number {
  const totalSeconds = state.targetDuration * 60;
  if (totalSeconds === 0) return 0;
  return Math.min(1, state.elapsedSeconds / totalSeconds);
}

import { create } from 'zustand';
import type { UserProfile, RoomTier } from '../types';

interface AppState {
  // User profile
  profile: UserProfile | null;
  isLoading: boolean;
  isOnboarded: boolean;

  // Actions
  setProfile: (profile: UserProfile) => void;
  updateDisplayName: (name: string) => void;
  completeOnboarding: () => void;
  setRoomTier: (tier: RoomTier) => void;
  setLoading: (loading: boolean) => void;
  reset: () => void;
}

const DEFAULT_STATE = {
  profile: null,
  isLoading: true,
  isOnboarded: false,
};

export const useAppStore = create<AppState>((set) => ({
  ...DEFAULT_STATE,

  setProfile: (profile) =>
    set({
      profile,
      isOnboarded: profile.onboarded,
      isLoading: false,
    }),

  updateDisplayName: (name) =>
    set((state) => ({
      profile: state.profile
        ? { ...state.profile, displayName: name, updatedAt: new Date().toISOString() }
        : null,
    })),

  completeOnboarding: () =>
    set((state) => ({
      isOnboarded: true,
      profile: state.profile
        ? { ...state.profile, onboarded: true, updatedAt: new Date().toISOString() }
        : null,
    })),

  setRoomTier: (tier) =>
    set((state) => ({
      profile: state.profile
        ? { ...state.profile, roomTier: tier, updatedAt: new Date().toISOString() }
        : null,
    })),

  setLoading: (loading) => set({ isLoading: loading }),

  reset: () => set(DEFAULT_STATE),
}));

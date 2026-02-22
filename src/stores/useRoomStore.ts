import { create } from 'zustand';
import type { RoomItem, RoomTier, MoodLevel, TimeOfDay } from '../types';

interface CameraState {
  orbitX: number;
  orbitY: number;
  zoom: number;
}

const DEFAULT_CAMERA: CameraState = {
  orbitX: 0,
  orbitY: 0,
  zoom: 1,
};

interface RoomState {
  // Room items currently in the room
  items: RoomItem[];

  // Room tier (affects room size/layout)
  tier: RoomTier;

  // Current lighting state
  timeOfDay: TimeOfDay;
  moodLevel: MoodLevel | null;
  isLightingOverridden: boolean;

  // Camera state
  camera: CameraState;

  // UI state
  selectedItemId: string | null;
  isInspecting: boolean;
  isShimmering: string | null; // item zone currently shimmering

  // Loading
  isLoading: boolean;

  // Actions
  setItems: (items: RoomItem[]) => void;
  addItem: (item: RoomItem) => void;
  upgradeItem: (itemType: string, newTier: 1 | 2 | 3, newModelPath: string) => void;
  setTier: (tier: RoomTier) => void;
  setTimeOfDay: (timeOfDay: TimeOfDay) => void;
  setMoodLevel: (level: MoodLevel | null) => void;
  updateCamera: (camera: Partial<CameraState>) => void;
  resetCamera: () => void;
  selectItem: (itemId: string | null) => void;
  startShimmer: (zone: string) => void;
  stopShimmer: () => void;
  setLoading: (loading: boolean) => void;
}

export const useRoomStore = create<RoomState>((set) => ({
  items: [],
  tier: 1,
  timeOfDay: 'morning',
  moodLevel: null,
  isLightingOverridden: false,
  camera: DEFAULT_CAMERA,
  selectedItemId: null,
  isInspecting: false,
  isShimmering: null,
  isLoading: true,

  setItems: (items) => set({ items, isLoading: false }),

  addItem: (item) =>
    set((state) => ({
      items: [...state.items, item],
    })),

  upgradeItem: (itemType, newTier, newModelPath) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.itemType === itemType
          ? { ...item, tier: newTier, modelPath: newModelPath }
          : item,
      ),
    })),

  setTier: (tier) => set({ tier }),

  setTimeOfDay: (timeOfDay) => set({ timeOfDay }),

  setMoodLevel: (moodLevel) =>
    set({
      moodLevel,
      isLightingOverridden: moodLevel !== null && moodLevel <= 2,
    }),

  updateCamera: (camera) =>
    set((state) => ({
      camera: { ...state.camera, ...camera },
    })),

  resetCamera: () => set({ camera: DEFAULT_CAMERA }),

  selectItem: (itemId) =>
    set({
      selectedItemId: itemId,
      isInspecting: itemId !== null,
    }),

  startShimmer: (zone) => set({ isShimmering: zone }),

  stopShimmer: () => set({ isShimmering: null }),

  setLoading: (loading) => set({ isLoading: loading }),
}));

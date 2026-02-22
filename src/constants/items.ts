import type { HabitCategory, RoomItemCatalogEntry, RoomZone } from '../types';

// Threshold in total completed days to unlock each tier
export const ITEM_TIER_THRESHOLDS = {
  1: 3,   // Tier 1 unlocked after 3 total completions
  2: 10,  // Tier 2 after 10 total completions
  3: 30,  // Tier 3 after 30 total completions
} as const;

// Room expansion thresholds (total mood logs)
export const ROOM_TIER_THRESHOLDS = {
  1: 0,    // Studio — default
  2: 60,   // One-Bed — 60 days of total logging
  3: 120,  // Loft — 120 days
  4: 365,  // Penthouse — 365 days
} as const;

// Mood log thresholds for window upgrades
export const WINDOW_UPGRADE_THRESHOLDS = {
  tree: 7,    // Window view → with a tree outside
  birds: 30,  // Tree + birds + clouds
} as const;

// Instant feedback items (appear after first habit completion)
export const INSTANT_FEEDBACK_ITEMS = [
  { itemType: 'coffee-mug', modelPath: 'assets/models/items/instant/coffee-mug.glb' },
  { itemType: 'shoes-by-door', modelPath: 'assets/models/items/instant/shoes.glb' },
];

// Room item catalog
export const ROOM_ITEM_CATALOG: RoomItemCatalogEntry[] = [
  // Body zone — physical self-care items
  {
    itemType: 'plant-small',
    category: 'body',
    zone: 'body',
    slotIndex: 0,
    tiers: [
      { tier: 1, modelPath: 'assets/models/items/body/plant-small.glb', requiredDays: 3, description: 'Small plant' },
      { tier: 2, modelPath: 'assets/models/items/body/herb-garden.glb', requiredDays: 10, description: 'Window herb garden' },
      { tier: 3, modelPath: 'assets/models/items/body/indoor-tree.glb', requiredDays: 30, description: 'Indoor tree' },
    ],
  },

  // Mind zone — learning items
  {
    itemType: 'bookshelf',
    category: 'mind',
    zone: 'mind',
    slotIndex: 0,
    tiers: [
      { tier: 1, modelPath: 'assets/models/items/mind/paperback.glb', requiredDays: 3, description: 'Paperback on shelf' },
      { tier: 2, modelPath: 'assets/models/items/mind/bookshelf-small.glb', requiredDays: 10, description: 'Small bookshelf with lamp' },
      { tier: 3, modelPath: 'assets/models/items/mind/bookcase-full.glb', requiredDays: 30, description: 'Full bookcase' },
    ],
  },

  // Connect zone — relationship items
  {
    itemType: 'postcard',
    category: 'connect',
    zone: 'connect',
    slotIndex: 0,
    tiers: [
      { tier: 1, modelPath: 'assets/models/items/connect/postcard.glb', requiredDays: 3, description: 'Postcard on wall' },
      { tier: 2, modelPath: 'assets/models/items/connect/framed-photos.glb', requiredDays: 10, description: 'Framed photos' },
      { tier: 3, modelPath: 'assets/models/items/connect/reading-nook.glb', requiredDays: 30, description: 'Cozy reading nook with pillows' },
    ],
  },

  // Move zone — exercise items
  {
    itemType: 'yoga-mat',
    category: 'move',
    zone: 'move',
    slotIndex: 0,
    tiers: [
      { tier: 1, modelPath: 'assets/models/items/move/yoga-mat-rolled.glb', requiredDays: 3, description: 'Yoga mat rolled up' },
      { tier: 2, modelPath: 'assets/models/items/move/yoga-mat-blocks.glb', requiredDays: 10, description: 'Mat + blocks laid out' },
      { tier: 3, modelPath: 'assets/models/items/move/workout-corner.glb', requiredDays: 30, description: 'Full workout corner' },
    ],
  },

  // Create zone — creative items
  {
    itemType: 'sketchbook',
    category: 'create',
    zone: 'create',
    slotIndex: 0,
    tiers: [
      { tier: 1, modelPath: 'assets/models/items/create/sketchbook.glb', requiredDays: 3, description: 'Sketchbook on desk' },
      { tier: 2, modelPath: 'assets/models/items/create/easel-supplies.glb', requiredDays: 10, description: 'Easel + supplies' },
      { tier: 3, modelPath: 'assets/models/items/create/art-corner.glb', requiredDays: 30, description: 'Art corner with finished piece' },
    ],
  },

  // Rest zone — mindfulness items
  {
    itemType: 'candle',
    category: 'rest',
    zone: 'rest',
    slotIndex: 0,
    tiers: [
      { tier: 1, modelPath: 'assets/models/items/rest/candle.glb', requiredDays: 3, description: 'Single candle' },
      { tier: 2, modelPath: 'assets/models/items/rest/candle-incense.glb', requiredDays: 10, description: 'Candle + incense holder' },
      { tier: 3, modelPath: 'assets/models/items/rest/zen-corner.glb', requiredDays: 30, description: 'Zen corner with cushion + plant' },
    ],
  },
];

// Focus plants (placed on windowsill after focus sessions)
export const FOCUS_PLANTS: Record<number, { plantType: string; modelPath: string; description: string }> = {
  15: { plantType: 'succulent', modelPath: 'assets/models/items/focus/succulent.glb', description: 'Small succulent' },
  25: { plantType: 'potted-herb', modelPath: 'assets/models/items/focus/potted-herb.glb', description: 'Potted herb' },
  45: { plantType: 'flowering-plant', modelPath: 'assets/models/items/focus/flowering-plant.glb', description: 'Small flowering plant' },
  60: { plantType: 'full-bloom', modelPath: 'assets/models/items/focus/full-bloom.glb', description: 'Full potted plant with bloom' },
};

export function getItemTierForCompletions(totalCompletions: number): 0 | 1 | 2 | 3 {
  if (totalCompletions >= ITEM_TIER_THRESHOLDS[3]) return 3;
  if (totalCompletions >= ITEM_TIER_THRESHOLDS[2]) return 2;
  if (totalCompletions >= ITEM_TIER_THRESHOLDS[1]) return 1;
  return 0;
}

export function getItemCatalogForCategory(category: HabitCategory): RoomItemCatalogEntry | undefined {
  return ROOM_ITEM_CATALOG.find((entry) => entry.category === category);
}

export function getFocusPlant(durationMinutes: number): { plantType: string; modelPath: string; description: string } | null {
  if (durationMinutes >= 60) return FOCUS_PLANTS[60];
  if (durationMinutes >= 45) return FOCUS_PLANTS[45];
  if (durationMinutes >= 25) return FOCUS_PLANTS[25];
  if (durationMinutes >= 15) return FOCUS_PLANTS[15];
  return null;
}

export const ZONE_POSITIONS: Record<RoomZone, { x: number; y: number; z: number }> = {
  body: { x: -2, y: 0, z: 1 },
  mind: { x: 2, y: 0, z: -1 },
  connect: { x: 0, y: 0, z: -2 },
  move: { x: -2, y: 0, z: -1 },
  create: { x: 2, y: 0, z: 1 },
  rest: { x: 0, y: 0, z: 2 },
  focus: { x: 0, y: 1, z: -2 },
};

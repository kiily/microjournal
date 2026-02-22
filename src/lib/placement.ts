import type { HabitCategory, RoomZone } from '../types';
import { ZONE_POSITIONS } from '../constants/items';

export interface ItemPlacement {
  position: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number };
  scale: number;
}

// Category → room zone mapping
export const CATEGORY_TO_ZONE: Record<HabitCategory, RoomZone> = {
  body: 'body',
  mind: 'mind',
  connect: 'connect',
  move: 'move',
  create: 'create',
  rest: 'rest',
};

// Slot offsets within each zone (for multiple items)
const SLOT_OFFSETS = [
  { x: 0, y: 0, z: 0 },
  { x: 0.5, y: 0, z: 0.2 },
  { x: -0.4, y: 0, z: 0.3 },
];

/**
 * Returns the world position for a given category zone + slot index.
 */
export function getZonePosition(
  category: HabitCategory,
  slotIndex: number = 0,
): { x: number; y: number; z: number } {
  const zone = CATEGORY_TO_ZONE[category];
  const basePosition = ZONE_POSITIONS[zone];
  const offset = SLOT_OFFSETS[slotIndex % SLOT_OFFSETS.length];

  return {
    x: basePosition.x + offset.x,
    y: basePosition.y + offset.y,
    z: basePosition.z + offset.z,
  };
}

/**
 * Returns the default placement for a room item in a given category zone.
 */
export function getDefaultPlacement(category: HabitCategory, slotIndex: number = 0): ItemPlacement {
  return {
    position: getZonePosition(category, slotIndex),
    rotation: { x: 0, y: 0, z: 0 },
    scale: 1.0,
  };
}

/**
 * Returns the placement for a focus plant on the windowsill.
 * Plants accumulate left-to-right.
 */
export function getFocusPlantPlacement(plantIndex: number): ItemPlacement {
  return {
    position: {
      x: -1.5 + plantIndex * 0.4,
      y: 1.2, // on windowsill height
      z: -2.5,
    },
    rotation: { x: 0, y: 0, z: 0 },
    scale: 0.6,
  };
}

/**
 * Checks if a zone has available slots given existing items.
 */
export function hasAvailableSlot(
  category: HabitCategory,
  existingItemCount: number,
  maxSlots: number = 3,
): boolean {
  return existingItemCount < maxSlots;
}

/**
 * Returns the capacity for a given room tier.
 */
export function getRoomCapacity(roomTier: number): number {
  switch (roomTier) {
    case 1: return 6;  // Studio: 6 item zones
    case 2: return 9;  // One-Bed: 9 slots
    case 3: return 12; // Loft: 12 slots
    case 4: return 18; // Penthouse: 18 slots
    default: return 6;
  }
}

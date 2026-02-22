import type { HabitCategory, RoomTier } from '../types';
import {
  getItemTierForCompletions,
  ITEM_TIER_THRESHOLDS,
  ROOM_TIER_THRESHOLDS,
  WINDOW_UPGRADE_THRESHOLDS,
} from '../constants/items';

export type ItemTier = 0 | 1 | 2 | 3;

/**
 * Calculates the current item tier for a habit given its total completions.
 * Returns 0 if no tier has been unlocked yet.
 */
export function calculateHabitTier(totalCompletions: number): ItemTier {
  return getItemTierForCompletions(totalCompletions);
}

/**
 * Returns how many more completions are needed for the next tier.
 * Returns null if already at max tier.
 */
export function getDaysUntilNextTier(totalCompletions: number): number | null {
  const currentTier = calculateHabitTier(totalCompletions);
  if (currentTier >= 3) return null;

  const nextThreshold = ITEM_TIER_THRESHOLDS[(currentTier + 1) as 1 | 2 | 3];
  return Math.max(0, nextThreshold - totalCompletions);
}

/**
 * Returns the total completions needed to reach a specific tier.
 */
export function getThresholdForTier(tier: 1 | 2 | 3): number {
  return ITEM_TIER_THRESHOLDS[tier];
}

/**
 * Calculates the room tier based on total mood logs.
 */
export function calculateRoomTier(totalMoodLogs: number): RoomTier {
  if (totalMoodLogs >= ROOM_TIER_THRESHOLDS[4]) return 4;
  if (totalMoodLogs >= ROOM_TIER_THRESHOLDS[3]) return 3;
  if (totalMoodLogs >= ROOM_TIER_THRESHOLDS[2]) return 2;
  return 1;
}

/**
 * Returns how many more mood logs until the next room tier.
 * Returns null if at max tier.
 */
export function getMoodLogsUntilNextRoomTier(totalMoodLogs: number): number | null {
  const currentTier = calculateRoomTier(totalMoodLogs);
  if (currentTier >= 4) return null;

  const nextThreshold = ROOM_TIER_THRESHOLDS[(currentTier + 1) as 2 | 3 | 4];
  return Math.max(0, nextThreshold - totalMoodLogs);
}

/**
 * Determines window view level based on total mood logs.
 */
export function getWindowViewLevel(totalMoodLogs: number): 'plain' | 'tree' | 'tree-birds' {
  if (totalMoodLogs >= WINDOW_UPGRADE_THRESHOLDS.birds) return 'tree-birds';
  if (totalMoodLogs >= WINDOW_UPGRADE_THRESHOLDS.tree) return 'tree';
  return 'plain';
}

/**
 * Given a map of habitId → totalCompletions, returns which habits have newly
 * upgraded (or newly unlocked) compared to the previous snapshot.
 */
export interface TierChange {
  habitId: string;
  oldTier: ItemTier;
  newTier: ItemTier;
  category: HabitCategory;
}

export function detectTierChanges(
  currentCompletions: Map<string, { count: number; category: HabitCategory }>,
  previousCompletions: Map<string, { count: number; category: HabitCategory }>,
): TierChange[] {
  const changes: TierChange[] = [];

  for (const [habitId, current] of currentCompletions) {
    const previous = previousCompletions.get(habitId);
    const oldCount = previous?.count ?? 0;

    const oldTier = calculateHabitTier(oldCount);
    const newTier = calculateHabitTier(current.count);

    if (newTier > oldTier) {
      changes.push({
        habitId,
        oldTier,
        newTier,
        category: current.category,
      });
    }
  }

  return changes;
}

/**
 * Returns the percentage progress toward the next tier (0–1).
 */
export function getTierProgress(totalCompletions: number): number {
  const currentTier = calculateHabitTier(totalCompletions);
  if (currentTier >= 3) return 1;

  const lowerBound =
    currentTier === 0 ? 0 : ITEM_TIER_THRESHOLDS[currentTier as 1 | 2 | 3];
  const upperBound = ITEM_TIER_THRESHOLDS[(currentTier + 1) as 1 | 2 | 3];

  return Math.min(1, (totalCompletions - lowerBound) / (upperBound - lowerBound));
}

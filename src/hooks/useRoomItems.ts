import { useCallback } from 'react';
import { eq } from 'drizzle-orm';
import { getDatabase } from '../db/client';
import { roomItem } from '../db/schema';
import { useRoomStore } from '../stores/useRoomStore';
import type { RoomItem, HabitCategory } from '../types';
import type { ItemTier } from '../lib/progress';
import { getItemCatalogForCategory, getFocusPlant } from '../constants/items';
import { getDefaultPlacement, getFocusPlantPlacement } from '../lib/placement';
import { INSTANT_FEEDBACK_ITEMS } from '../constants/items';

export function useRoomItems() {
  const { items, setItems, addItem, upgradeItem } = useRoomStore();

  const loadRoomItems = useCallback(async () => {
    const db = getDatabase();
    const rows = await db.select().from(roomItem);

    const mapped: RoomItem[] = rows.map((r) => ({
      id: r.id,
      itemType: r.itemType,
      tier: r.tier as 1 | 2 | 3,
      modelPath: r.modelPath,
      position: JSON.parse(r.position) as { x: number; y: number; z: number },
      rotation: JSON.parse(r.rotation) as { x: number; y: number; z: number },
      scale: r.scale,
      sourceHabitId: r.sourceHabitId,
      unlockedAt: r.unlockedAt,
    }));

    setItems(mapped);
  }, [setItems]);

  /**
   * Adds the instant feedback item (tiny detail) after first habit completion.
   */
  const addInstantFeedbackItem = useCallback(async (): Promise<void> => {
    const db = getDatabase();

    // Check if already added
    const existing = await db
      .select()
      .from(roomItem)
      .where(eq(roomItem.itemType, INSTANT_FEEDBACK_ITEMS[0].itemType))
      .limit(1);

    if (existing.length > 0) return;

    const feedbackItem = INSTANT_FEEDBACK_ITEMS[0];
    const placement = { position: { x: 0.5, y: 0.8, z: 1.0 }, rotation: { x: 0, y: 0, z: 0 }, scale: 0.5 };

    const result = await db
      .insert(roomItem)
      .values({
        itemType: feedbackItem.itemType,
        tier: 1,
        modelPath: feedbackItem.modelPath,
        position: JSON.stringify(placement.position),
        rotation: JSON.stringify(placement.rotation),
        scale: placement.scale,
      })
      .returning();

    addItem({
      id: result[0].id,
      itemType: result[0].itemType,
      tier: 1,
      modelPath: result[0].modelPath,
      position: placement.position,
      rotation: placement.rotation,
      scale: result[0].scale,
      sourceHabitId: null,
      unlockedAt: result[0].unlockedAt,
    });
  }, [addItem]);

  /**
   * Unlocks a new tier-1 item for a habit category, or upgrades existing.
   */
  const unlockOrUpgradeItem = useCallback(
    async (habitId: string, category: HabitCategory, newTier: ItemTier): Promise<void> => {
      if (newTier === 0) return;

      const db = getDatabase();
      const catalog = getItemCatalogForCategory(category);
      if (!catalog) return;

      const tierEntry = catalog.tiers.find((t) => t.tier === newTier);
      if (!tierEntry) return;

      const placement = getDefaultPlacement(category, catalog.slotIndex);

      // Check if item already exists for this habit
      const existing = await db
        .select()
        .from(roomItem)
        .where(eq(roomItem.sourceHabitId, habitId))
        .limit(1);

      if (existing.length > 0) {
        // Upgrade existing item
        await db
          .update(roomItem)
          .set({
            tier: newTier,
            modelPath: tierEntry.modelPath,
          })
          .where(eq(roomItem.id, existing[0].id));

        upgradeItem(catalog.itemType, newTier as 1 | 2 | 3, tierEntry.modelPath);
      } else {
        // Insert new item
        const result = await db
          .insert(roomItem)
          .values({
            itemType: catalog.itemType,
            tier: newTier,
            modelPath: tierEntry.modelPath,
            position: JSON.stringify(placement.position),
            rotation: JSON.stringify(placement.rotation),
            scale: placement.scale,
            sourceHabitId: habitId,
          })
          .returning();

        addItem({
          id: result[0].id,
          itemType: result[0].itemType,
          tier: newTier as 1 | 2 | 3,
          modelPath: result[0].modelPath,
          position: placement.position,
          rotation: placement.rotation,
          scale: result[0].scale,
          sourceHabitId: habitId,
          unlockedAt: result[0].unlockedAt,
        });
      }
    },
    [addItem, upgradeItem],
  );

  /**
   * Adds a focus plant to the windowsill after a completed focus session.
   */
  const addFocusPlant = useCallback(
    async (durationMinutes: number, sessionId: string): Promise<void> => {
      const plant = getFocusPlant(durationMinutes);
      if (!plant) return;

      const db = getDatabase();

      // Count existing focus plants for slot positioning
      const existingPlants = await db
        .select()
        .from(roomItem)
        .where(eq(roomItem.itemType, plant.plantType));

      const plantIndex = existingPlants.length;
      const placement = getFocusPlantPlacement(plantIndex);

      const result = await db
        .insert(roomItem)
        .values({
          itemType: plant.plantType,
          tier: 1,
          modelPath: plant.modelPath,
          position: JSON.stringify(placement.position),
          rotation: JSON.stringify(placement.rotation),
          scale: placement.scale,
        })
        .returning();

      addItem({
        id: result[0].id,
        itemType: result[0].itemType,
        tier: 1,
        modelPath: result[0].modelPath,
        position: placement.position,
        rotation: placement.rotation,
        scale: result[0].scale,
        sourceHabitId: null,
        unlockedAt: result[0].unlockedAt,
      });
    },
    [addItem],
  );

  return {
    items,
    loadRoomItems,
    addInstantFeedbackItem,
    unlockOrUpgradeItem,
    addFocusPlant,
  };
}

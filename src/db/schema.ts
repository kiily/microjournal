import { sql } from 'drizzle-orm';
import {
  index,
  integer,
  real,
  sqliteTable,
  text,
  uniqueIndex,
} from 'drizzle-orm/sqlite-core';

// ─── User Profile ─────────────────────────────────────────────────────────────

export const userProfile = sqliteTable('user_profile', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  displayName: text('display_name').notNull().default(''),
  avatarConfig: text('avatar_config').notNull().default('{}'),
  roomTier: integer('room_tier').notNull().default(1),
  onboarded: integer('onboarded', { mode: 'boolean' }).notNull().default(false),
  createdAt: text('created_at')
    .notNull()
    .default(sql`(datetime('now'))`),
  updatedAt: text('updated_at')
    .notNull()
    .default(sql`(datetime('now'))`),
});

// ─── Mood Entry ───────────────────────────────────────────────────────────────

export const moodEntry = sqliteTable(
  'mood_entry',
  {
    id: text('id')
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    date: text('date').notNull().unique(),
    moodLevel: integer('mood_level').notNull(),
    tags: text('tags').notNull().default('[]'),
    note: text('note').notNull().default(''),
    createdAt: text('created_at')
      .notNull()
      .default(sql`(datetime('now'))`),
    updatedAt: text('updated_at')
      .notNull()
      .default(sql`(datetime('now'))`),
  },
  (table) => ({
    dateIdx: index('idx_mood_entry_date').on(table.date),
  }),
);

// ─── Habit ────────────────────────────────────────────────────────────────────

export const habit = sqliteTable(
  'habit',
  {
    id: text('id')
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    name: text('name').notNull(),
    icon: text('icon').notNull(),
    category: text('category').notNull(),
    isArchived: integer('is_archived', { mode: 'boolean' }).notNull().default(false),
    sortOrder: integer('sort_order').notNull().default(0),
    createdAt: text('created_at')
      .notNull()
      .default(sql`(datetime('now'))`),
    updatedAt: text('updated_at')
      .notNull()
      .default(sql`(datetime('now'))`),
  },
  (table) => ({
    activeIdx: index('idx_habit_active').on(table.isArchived, table.sortOrder),
  }),
);

// ─── Habit Log ────────────────────────────────────────────────────────────────

export const habitLog = sqliteTable(
  'habit_log',
  {
    id: text('id')
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    habitId: text('habit_id')
      .notNull()
      .references(() => habit.id, { onDelete: 'cascade' }),
    date: text('date').notNull(),
    completed: integer('completed', { mode: 'boolean' }).notNull().default(false),
    createdAt: text('created_at')
      .notNull()
      .default(sql`(datetime('now'))`),
  },
  (table) => ({
    habitDateIdx: index('idx_habit_log_habit_date').on(table.habitId, table.date),
    dateIdx: index('idx_habit_log_date').on(table.date),
    uniqueHabitDate: uniqueIndex('habit_log_habit_id_date_unique').on(table.habitId, table.date),
  }),
);

// ─── Room Item ────────────────────────────────────────────────────────────────

export const roomItem = sqliteTable('room_item', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  itemType: text('item_type').notNull(),
  tier: integer('tier').notNull().default(1),
  modelPath: text('model_path').notNull(),
  position: text('position').notNull().default('{}'),
  rotation: text('rotation').notNull().default('{}'),
  scale: real('scale').notNull().default(1.0),
  sourceHabitId: text('source_habit_id').references(() => habit.id, {
    onDelete: 'set null',
  }),
  unlockedAt: text('unlocked_at')
    .notNull()
    .default(sql`(datetime('now'))`),
});

// ─── Focus Session ────────────────────────────────────────────────────────────

export const focusSession = sqliteTable(
  'focus_session',
  {
    id: text('id')
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    targetDurationMinutes: integer('target_duration_minutes').notNull(),
    actualDurationMinutes: integer('actual_duration_minutes').notNull().default(0),
    completed: integer('completed', { mode: 'boolean' }).notNull().default(false),
    ambientSound: text('ambient_sound'),
    blockedApps: text('blocked_apps').notNull().default('[]'),
    rewardPlantType: text('reward_plant_type'),
    startedAt: text('started_at')
      .notNull()
      .default(sql`(datetime('now'))`),
    endedAt: text('ended_at'),
  },
  (table) => ({
    dateIdx: index('idx_focus_session_date').on(table.startedAt),
  }),
);

// ─── Types from schema ────────────────────────────────────────────────────────

export type UserProfileRow = typeof userProfile.$inferSelect;
export type NewUserProfile = typeof userProfile.$inferInsert;

export type MoodEntryRow = typeof moodEntry.$inferSelect;
export type NewMoodEntry = typeof moodEntry.$inferInsert;

export type HabitRow = typeof habit.$inferSelect;
export type NewHabit = typeof habit.$inferInsert;

export type HabitLogRow = typeof habitLog.$inferSelect;
export type NewHabitLog = typeof habitLog.$inferInsert;

export type RoomItemRow = typeof roomItem.$inferSelect;
export type NewRoomItem = typeof roomItem.$inferInsert;

export type FocusSessionRow = typeof focusSession.$inferSelect;
export type NewFocusSession = typeof focusSession.$inferInsert;

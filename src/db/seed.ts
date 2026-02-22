import { eq } from 'drizzle-orm';
import type { Database } from './client';
import { habit, userProfile } from './schema';

// Template habits seeded on first launch
export const TEMPLATE_HABITS = [
  {
    id: 'template-morning-stretch',
    name: 'Morning stretch',
    icon: 'activity',
    category: 'move' as const,
    sortOrder: 0,
  },
  {
    id: 'template-read-chapter',
    name: 'Read a chapter',
    icon: 'book-open',
    category: 'mind' as const,
    sortOrder: 1,
  },
  {
    id: 'template-call-someone',
    name: 'Call or text someone',
    icon: 'phone',
    category: 'connect' as const,
    sortOrder: 2,
  },
];

export async function seedDatabase(db: Database): Promise<void> {
  // Check if already seeded
  const existingProfile = await db.select().from(userProfile).limit(1);

  if (existingProfile.length > 0) {
    // Already seeded
    return;
  }

  // Create user profile
  await db.insert(userProfile).values({
    displayName: '',
    avatarConfig: '{}',
    roomTier: 1,
    onboarded: false,
  });

  // Seed template habits
  for (const templateHabit of TEMPLATE_HABITS) {
    const existing = await db
      .select()
      .from(habit)
      .where(eq(habit.id, templateHabit.id))
      .limit(1);

    if (existing.length === 0) {
      await db.insert(habit).values({
        id: templateHabit.id,
        name: templateHabit.name,
        icon: templateHabit.icon,
        category: templateHabit.category,
        isArchived: false,
        sortOrder: templateHabit.sortOrder,
      });
    }
  }
}

export async function runMigrations(db: Database): Promise<void> {
  const sqliteDb = (db as unknown as { session: { exec: (sql: string) => void } }).session;

  // Create tables if not exists (fallback for when drizzle migrations aren't available)
  const raw = db as unknown as { execute: (query: { sql: string }) => Promise<void> };

  const createTableStatements = [
    `CREATE TABLE IF NOT EXISTS user_profile (
      id TEXT PRIMARY KEY,
      display_name TEXT NOT NULL DEFAULT '',
      avatar_config TEXT NOT NULL DEFAULT '{}',
      room_tier INTEGER NOT NULL DEFAULT 1,
      onboarded INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    )`,
    `CREATE TABLE IF NOT EXISTS mood_entry (
      id TEXT PRIMARY KEY,
      date TEXT NOT NULL UNIQUE,
      mood_level INTEGER NOT NULL CHECK (mood_level BETWEEN 1 AND 5),
      tags TEXT NOT NULL DEFAULT '[]',
      note TEXT NOT NULL DEFAULT '',
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    )`,
    `CREATE TABLE IF NOT EXISTS habit (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      icon TEXT NOT NULL,
      category TEXT NOT NULL CHECK (category IN ('body', 'mind', 'connect', 'move', 'create', 'rest')),
      is_archived INTEGER NOT NULL DEFAULT 0,
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    )`,
    `CREATE TABLE IF NOT EXISTS habit_log (
      id TEXT PRIMARY KEY,
      habit_id TEXT NOT NULL REFERENCES habit(id) ON DELETE CASCADE,
      date TEXT NOT NULL,
      completed INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      UNIQUE(habit_id, date)
    )`,
    `CREATE TABLE IF NOT EXISTS room_item (
      id TEXT PRIMARY KEY,
      item_type TEXT NOT NULL,
      tier INTEGER NOT NULL DEFAULT 1,
      model_path TEXT NOT NULL,
      position TEXT NOT NULL DEFAULT '{}',
      rotation TEXT NOT NULL DEFAULT '{}',
      scale REAL NOT NULL DEFAULT 1.0,
      source_habit_id TEXT REFERENCES habit(id) ON DELETE SET NULL,
      unlocked_at TEXT NOT NULL DEFAULT (datetime('now'))
    )`,
    `CREATE TABLE IF NOT EXISTS focus_session (
      id TEXT PRIMARY KEY,
      target_duration_minutes INTEGER NOT NULL,
      actual_duration_minutes INTEGER NOT NULL DEFAULT 0,
      completed INTEGER NOT NULL DEFAULT 0,
      ambient_sound TEXT,
      blocked_apps TEXT NOT NULL DEFAULT '[]',
      reward_plant_type TEXT,
      started_at TEXT NOT NULL DEFAULT (datetime('now')),
      ended_at TEXT
    )`,
    `CREATE INDEX IF NOT EXISTS idx_mood_entry_date ON mood_entry(date)`,
    `CREATE INDEX IF NOT EXISTS idx_habit_log_habit_date ON habit_log(habit_id, date)`,
    `CREATE INDEX IF NOT EXISTS idx_habit_log_date ON habit_log(date)`,
    `CREATE INDEX IF NOT EXISTS idx_habit_active ON habit(is_archived, sort_order)`,
    `CREATE INDEX IF NOT EXISTS idx_focus_session_date ON focus_session(started_at)`,
  ];

  for (const statement of createTableStatements) {
    try {
      await raw.execute({ sql: statement });
    } catch {
      // Table may already exist — safe to ignore
    }
  }
}

import * as SQLite from 'expo-sqlite';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import * as schema from './schema';

const DATABASE_NAME = 'nook.db';

let _db: ReturnType<typeof drizzle> | null = null;
let _sqliteDb: SQLite.SQLiteDatabase | null = null;

export function getDatabase() {
  if (!_db) {
    _sqliteDb = SQLite.openDatabaseSync(DATABASE_NAME);
    _db = drizzle(_sqliteDb, { schema });
  }
  return _db;
}

export function getSQLiteDatabase() {
  if (!_sqliteDb) {
    getDatabase();
  }
  return _sqliteDb!;
}

export type Database = ReturnType<typeof getDatabase>;

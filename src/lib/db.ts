/**
 * SQLite helpers for contact + guestbook.
 * Lab 05 (OpenCode) implements persistence. Stubs return null until finishe.
 */
import Database from 'better-sqlite3';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';

export type ContactMessage = {
  id: number;
  name: string;
  email: string;
  message: string;
  created_at: string;
};

export type GuestbookEntry = {
  id: number;
  name: string;
  message: string;
  created_at: string;
};

let db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (db) return db;
  const dir = process.env.DATA_DIR || join(process.cwd(), 'data');
  mkdirSync(dir, { recursive: true });
  db = new Database(join(dir, 'site.sqlite'));
  db.exec(`
    CREATE TABLE IF NOT EXISTS contact_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
    CREATE TABLE IF NOT EXISTS guestbook (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);
  return db;
}

/**
 * Validate a required trimmed string field (DECISIONS D11: validate ความยาว).
 * Throws Error('VALIDATION: ...') — API routes map this to 400 with a fixed message.
 */
function requireString(
  value: unknown,
  field: string,
  max: number,
): string {
  if (typeof value !== 'string') {
    throw new Error(`VALIDATION: ${field} must be a string`);
  }
  const trimmed = value.trim();
  if (trimmed.length === 0) {
    throw new Error(`VALIDATION: ${field} must not be empty`);
  }
  if (trimmed.length > max) {
    throw new Error(`VALIDATION: ${field} exceeds ${max} characters`);
  }
  return trimmed;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Limits mirror the client form maxlengths (contact.astro / guestbook.astro). */
const LIMITS = {
  contact: { name: 80, email: 120, message: 2000 },
  guestbook: { name: 80, message: 500 },
} as const;

/** Cap on rows returned by listGuestbook (DECISIONS D9 — เพดานจำนวนแถว). */
const GUESTBOOK_LIST_LIMIT = 100;

export function insertContact(input: {
  name: string;
  email: string;
  message: string;
}): ContactMessage {
  const name = requireString(input?.name, 'name', LIMITS.contact.name);
  const email = requireString(input?.email, 'email', LIMITS.contact.email);
  const message = requireString(input?.message, 'message', LIMITS.contact.message);
  if (!EMAIL_RE.test(email)) {
    throw new Error('VALIDATION: email is not a valid address');
  }
  const db = getDb();
  const info = db
    .prepare('INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)')
    .run(name, email, message);
  const row = db
    .prepare('SELECT id, name, email, message, created_at FROM contact_messages WHERE id = ?')
    .get(info.lastInsertRowid) as ContactMessage;
  return row;
}

export function listGuestbook(): GuestbookEntry[] {
  const db = getDb();
  return db
    .prepare(
      `SELECT id, name, message, created_at FROM guestbook ORDER BY id DESC LIMIT ${GUESTBOOK_LIST_LIMIT}`,
    )
    .all() as GuestbookEntry[];
}

export function insertGuestbook(input: {
  name: string;
  message: string;
}): GuestbookEntry {
  const name = requireString(input?.name, 'name', LIMITS.guestbook.name);
  const message = requireString(input?.message, 'message', LIMITS.guestbook.message);
  const db = getDb();
  const info = db
    .prepare('INSERT INTO guestbook (name, message) VALUES (?, ?)')
    .run(name, message);
  const row = db
    .prepare('SELECT id, name, message, created_at FROM guestbook WHERE id = ?')
    .get(info.lastInsertRowid) as GuestbookEntry;
  return row;
}

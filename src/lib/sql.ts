import fs from "fs";
import path from "path";
import initSqlJs, { Database } from "sql.js";

// Absolute path to the SQLite file so it can be opened with DB Browser for SQLite
const DB_DIR = path.join(process.cwd(), "data");
const DB_PATH = path.join(DB_DIR, "fitbeast.sqlite");

let _db: Database | null = null;
let _initing: Promise<Database> | null = null;

async function loadOrCreateDb(): Promise<Database> {
  const SQL = await initSqlJs({
    locateFile: (file) => path.join(process.cwd(), "node_modules", "sql.js", "dist", file),
  });

  if (!fs.existsSync(DB_DIR)) fs.mkdirSync(DB_DIR, { recursive: true });

  if (fs.existsSync(DB_PATH)) {
    const filebuffer = fs.readFileSync(DB_PATH);
    const db = new SQL.Database(new Uint8Array(filebuffer));
    // Ensure latest schema (no-op if already present)
    bootstrap(db);
    persist(db);
    return db;
  }
  // fresh DB
  const db = new SQL.Database();
  bootstrap(db);
  persist(db);
  return db;
}

function bootstrap(db: Database) {
  db.exec(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now'))
    );
    CREATE TABLE IF NOT EXISTS bookings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      class_title TEXT NOT NULL,
      class_time TEXT NOT NULL,
      date TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY(user_id) REFERENCES users(id)
    );
    CREATE TABLE IF NOT EXISTS carts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER UNIQUE NOT NULL,
      updated_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY(user_id) REFERENCES users(id)
    );
    CREATE TABLE IF NOT EXISTS cart_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      cart_id INTEGER NOT NULL,
      product_id TEXT NOT NULL,
      name TEXT NOT NULL,
      price REAL NOT NULL,
      image TEXT,
      category TEXT,
      qty INTEGER NOT NULL,
      FOREIGN KEY(cart_id) REFERENCES carts(id)
    );
    CREATE TABLE IF NOT EXISTS program_progress (
      user_id INTEGER NOT NULL,
      level TEXT NOT NULL,
      day INTEGER NOT NULL,
      completed INTEGER NOT NULL DEFAULT 0,
      PRIMARY KEY(user_id, level, day),
      FOREIGN KEY(user_id) REFERENCES users(id)
    );
    CREATE TABLE IF NOT EXISTS subscriptions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      plan TEXT NOT NULL,
      started_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY(user_id) REFERENCES users(id)
    );
    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      name TEXT,
      email TEXT,
      phone TEXT,
      subject TEXT,
      message TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );
  `);
}

export async function getDb(): Promise<Database> {
  if (_db) return _db;
  if (_initing) return _initing;
  _initing = loadOrCreateDb().then((db) => {
    _db = db;
    return db;
  });
  return _initing;
}

export function persist(db: Database) {
  const data = db.export();
  const buffer = Buffer.from(data);
  fs.writeFileSync(DB_PATH, buffer);
}

export function dbPath() {
  return DB_PATH;
}

import fs from 'fs';
import path from 'path';
import initSqlJs from 'sql.js';

const DB_PATH = path.join(process.cwd(), 'data', 'fitbeast.sqlite');

const run = async () => {
  const SQL = await initSqlJs({ locateFile: (file) => path.join(process.cwd(), 'node_modules', 'sql.js', 'dist', file) });
  if (!fs.existsSync(DB_PATH)) {
    console.error('DB not found at', DB_PATH, '- run scripts/init-db.mjs first');
    process.exit(1);
  }
  const buf = fs.readFileSync(DB_PATH);
  const db = new SQL.Database(new Uint8Array(buf));
  db.exec(`
    CREATE TABLE IF NOT EXISTS carts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER UNIQUE NOT NULL,
      updated_at TEXT DEFAULT (datetime('now'))
    );
    CREATE TABLE IF NOT EXISTS cart_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      cart_id INTEGER NOT NULL,
      product_id TEXT NOT NULL,
      name TEXT NOT NULL,
      price REAL NOT NULL,
      image TEXT,
      category TEXT,
      qty INTEGER NOT NULL
    );
    CREATE TABLE IF NOT EXISTS program_progress (
      user_id INTEGER NOT NULL,
      level TEXT NOT NULL,
      day INTEGER NOT NULL,
      completed INTEGER NOT NULL DEFAULT 0,
      PRIMARY KEY(user_id, level, day)
    );
    CREATE TABLE IF NOT EXISTS subscriptions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      plan TEXT NOT NULL,
      started_at TEXT DEFAULT (datetime('now'))
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
  const out = Buffer.from(db.export());
  fs.writeFileSync(DB_PATH, out);
  console.log('Migration applied:', DB_PATH);
};
run();

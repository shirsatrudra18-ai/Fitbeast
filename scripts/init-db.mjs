import fs from 'fs';
import path from 'path';
import initSqlJs from 'sql.js';

const DB_DIR = path.join(process.cwd(), 'data');
const DB_PATH = path.join(DB_DIR, 'fitbeast.sqlite');

const run = async () => {
  const SQL = await initSqlJs({ locateFile: (file) => path.join(process.cwd(), 'node_modules', 'sql.js', 'dist', file) });
  if (!fs.existsSync(DB_DIR)) fs.mkdirSync(DB_DIR, { recursive: true });
  let db;
  if (fs.existsSync(DB_PATH)) {
    console.log('DB already exists at', DB_PATH);
    return;
  }
  db = new SQL.Database();
  db.exec(`
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
      created_at TEXT DEFAULT (datetime('now'))
    );
  `);
  const buf = Buffer.from(db.export());
  fs.writeFileSync(DB_PATH, buf);
  console.log('Created DB at', DB_PATH);
};
run();

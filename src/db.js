const Database = require('better-sqlite3');
const db = new Database('todos.db');

db.prepare(`
  CREATE TABLE IF NOT EXISTS items (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT
  )
`).run();

module.exports = db;

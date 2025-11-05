const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3('shop.db');
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS product(
            id   INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            price REAL,
            stock INTEGER,
            pics TEXT   -- 存 JSON 字符串 ["a.jpg","b.jpg"]
         )`);
});
module.exports = db;
// We use mysql2/promise to work with async/await.
// A pool manages multiple connections efficiently.

const mysql = require("mysql2/promise");
require("dotenv").config(); // loads variables from .env

// using pool because we don't want to open a new connection for every request (a pool reuses them)
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  ssl: { rejectUnauthorized: true },
  waitForConnections: true,
  connectionLimit: 10, // max number of simultaneous connections
  queueLimit: 0, // unlimited waiting queries
});

module.exports = pool;

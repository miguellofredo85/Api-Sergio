const mysql = require('mysql2/promise');

require('dotenv').config()

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "password",
  database: process.env.DB_NAME || "usersdb",
  port: process.env.PORTS || 33060,
});

module.exports = pool;

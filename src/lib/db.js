import mysql from 'mysql2/promise';

export const pool = mysql.createPool({
  host: process.env.DATABASE_HOST, // En Hostinger suele ser 'localhost' o la IP asignada
  user: process.env.DATABASE_USER, // u269079254_root
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME, // u269079254_acema
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});
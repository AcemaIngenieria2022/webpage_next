import mysql from 'mysql2/promise';

export const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  user: process.env.DB_USER || 'u269079254_root',
  password: process.env.DB_PASSWORD || 'Acema2022.s',
  database: process.env.DB_NAME || 'u269079254_acema',

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,

  enableKeepAlive: true,
  keepAliveInitialDelay: 10000
});

pool.on('error', (err) => {
  console.error('[Hostinger MySQL Pool Error]:', err.message);
});

export default pool;
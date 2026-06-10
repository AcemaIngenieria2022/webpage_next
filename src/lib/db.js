import mysql from 'mysql2/promise';

export const pool = mysql.createPool({
  host: process.env.DATABASE_HOST || '127.0.0.1', // '127.0.0.1' evita problemas de resolución de DNS locales
  user: process.env.DATABASE_USER, // u269079254_root
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME, // u269079254_acema
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 10000
});

// Manejador global para evitar que caídas de red levanten un 503 posterior
pool.on('error', (err) => {
  console.error('[MySQL Pool Error]:', err.message);
});
import mysql from 'mysql2/promise';

export const pool = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',       // Mapeado con tu .env (localhost -> 127.0.0.1)
  port: parseInt(process.env.DB_PORT || '3306', 10),
  user: process.env.DB_USER,                       // Mapeado con tu DB_USER
  password: process.env.DB_PASSWORD,               // Mapeado con tu DB_PASSWORD
  database: process.env.DB_NAME,                   // Mapeado con tu DB_NAME
  waitForConnections: true,
  connectionLimit: 5,                              // Ideal para planes compartidos de Hostinger
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 10000
});

// Evita que un error de conexión suelto tire el proceso Node de Hostinger (Evita el 503)
pool.on('error', (err) => {
  console.error('[MySQL Pool Error] Error inesperado en base de datos:', err.message);
});
import mysql from 'mysql2/promise';

// Creamos el pool con configuraciones optimizadas para hosting compartido
export const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 5, // Límite bajo para no saturar Hostinger
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 10000
});

// Log básico para diagnóstico en los registros de Hostinger
pool.on('error', (err) => {
  console.error('[MYSQL POOL ERROR]:', err.message);
});
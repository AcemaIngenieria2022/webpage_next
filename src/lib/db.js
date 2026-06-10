import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1', // 127.0.0.1 es más directo y rápido en Hostinger que 'localhost'
  port: parseInt(process.env.DB_PORT || '3306', 10),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 5, // Límite seguro para evitar que Hostinger bloquee tu plan compartido
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 10000
});

// Evita que errores de timeout o conexiones inactivas rompan el proceso de Node (Previene el 503)
pool.on('error', (err) => {
  console.error('[MySQL Pool Error] Error inesperado en la base de datos:', err.message);
});

// Mantenemos ambos tipos de exportación para asegurar compatibilidad total con tus servicios
export { pool };
export default pool;
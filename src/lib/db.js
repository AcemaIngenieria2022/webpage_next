import mysql from 'mysql2/promise';

// Validación rápida para detectar si falta alguna variable
const requiredEnv = ['DB_HOST', 'DB_USER', 'DB_NAME', 'DB_PASSWORD'];
requiredEnv.forEach(key => {
  if (!process.env[key]) {
    console.error(`[ERROR] Variable de entorno faltante: ${key}`);
  }
});

export const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306', 10),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 10000
});

// Prueba de conexión al arrancar el pool
pool.getConnection()
  .then(conn => {
    console.log("[DEBUG] Conexión a base de datos establecida correctamente");
    conn.release();
  })
  .catch(err => {
    console.error("[ERROR CRÍTICO] No se pudo conectar a MySQL:", err.message);
  });

export default pool;
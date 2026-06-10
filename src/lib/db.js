import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,       // Equivalente a 'max: 10' en pg
  queueLimit: 0,
  idleTimeout: 30000,        // Tiempo en milisegundos para cerrar conexiones inactivas
});

// Forzamos la exportación directa para evitar que Turbopack la envuelva mal
export { pool };
export default pool;
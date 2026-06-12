import mysql from 'mysql2/promise';

export const pool = mysql.createPool({
  host: process.env.DB_HOST, // Asegúrate de que esto sea 'localhost'
  port: parseInt(process.env.DB_PORT || '3306', 10),
  user: process.env.DB_USER, // Aquí tomará 'u269079254_root'
  password: process.env.DB_PASSWORD, // Aquí tu contraseña
  database: process.env.DB_NAME, // Aquí tomará 'u269079254_acema'
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 10000
});

pool.on('error', (err) => {
  // Cambié el nombre del log para que sea más genérico para tu entorno actual
  console.error('[MySQL Pool Error]:', err.message);
});

export default pool;
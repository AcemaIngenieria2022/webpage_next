import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  
  // Configuración de pool
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  
  // Optimización de conexión
  enableKeepAlive: true,
  keepAliveInitialDelay: 10000
});

// Verificación de salud del pool
pool.getConnection()
  .then(connection => {
    console.log('✅ Conexión a la base de datos establecida correctamente.');
    connection.release();
  })
  .catch(err => {
    console.error('❌ Error al conectar a la base de datos:', err.message);
  });

export default pool;
import pg from 'pg';
const { Pool } = pg;

const connectionConfig = process.env.DATABASE_URL
  ? { connectionString: process.env.DATABASE_URL }
  : {
      host: process.env.DB_HOST || '127.0.0.1',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'neondb',
    };

// Activar SSL obligatorio para Neon o servidores externos de Postgres
if (connectionConfig.connectionString || (connectionConfig.host && connectionConfig.host !== '127.0.0.1' && connectionConfig.host !== 'localhost')) {
  connectionConfig.ssl = {
    rejectUnauthorized: false
  };
}

export const pool = new Pool(connectionConfig);

pool.on('error', (err) => {
  console.error('[PostgreSQL Pool Error]:', err.message);
});

export default pool;
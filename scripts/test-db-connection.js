const { loadEnvConfig } = require('@next/env');
const { Pool } = require('pg');

// Cargar variables de entorno del proyecto
const projectDir = process.cwd();
const { loadedEnvFiles } = loadEnvConfig(projectDir);

console.log('Archivos de entorno cargados:', loadedEnvFiles.map(f => f.path));
console.log('Intentando conectar con las siguientes variables:');
console.log(`- Connection String: ${process.env.DATABASE_URL ? process.env.DATABASE_URL.replace(/:([^:@]+)@/, ':***@') : '(no definida)'}`);

async function testConnection() {
  let pool;
  try {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    });

    const client = await pool.connect();
    console.log('\n✅ ¡Conexión establecida con éxito!');
    
    const { rows } = await client.query('SELECT 1 + 1 AS result');
    console.log(`Prueba de consulta (SELECT 1 + 1): ${rows[0].result === 2 ? 'EXITOSA' : 'FALLIDA'}`);
    client.release();
    
  } catch (error) {
    console.error('\n❌ Error al conectar a la base de datos PostgreSQL:');
    console.error(error.message);
  } finally {
    if (pool) {
      await pool.end();
    }
  }
}

testConnection();

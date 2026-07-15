#!/usr/bin/env node

/**
 * Script para verificar la conexión a la base de datos PostgreSQL en Neon
 * Uso: npm run verify-db
 */

const { Pool } = require('pg');
require('dotenv').config({ path: '.env.local' });

async function verifyConnection() {
  console.log('\n🔍 Verificando conexión a Base de Datos PostgreSQL (Neon)\n');

  const connectionString = process.env.DATABASE_URL;

  console.log('📋 Configuración:');
  console.log(`  • DATABASE_URL: ${connectionString ? connectionString.replace(/:([^:@]+)@/, ':***@') : '(no definida)'}\n`);

  if (!connectionString) {
    console.error('❌ Error: Falta la variable de entorno DATABASE_URL\n');
    console.log('Verifica que .env.local contenga:');
    console.log('  DATABASE_URL=postgresql://...\n');
    process.exit(1);
  }

  let pool;
  try {
    console.log('⏳ Conectando...\n');
    pool = new Pool({
      connectionString,
      ssl: {
        rejectUnauthorized: false
      }
    });

    const client = await pool.connect();
    console.log('✅ Conexión exitosa!\n');

    // Test simple query
    try {
      const result = await client.query('SELECT 1 + 1 as test');
      console.log('✅ Query simple ejecutada: SELECT 1 + 1\n');
    } catch (err) {
      console.warn('⚠️  Error en query simple:', err.message);
    }

    // Verificar tablas
    console.log('📊 Tablas en la base de datos:\n');
    try {
      const { rows: tables } = await client.query(
        "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name"
      );

      if (tables.length === 0) {
        console.log('  ⚠️  No se encontraron tablas.');
        console.log('  Necesitas ejecutar el script SQL en Neon SQL Editor:\n');
        console.log('  1. Abre tu consola de Neon');
        console.log('  2. Ve a SQL Editor');
        console.log('  3. Copia el contenido de: scripts/setup-neon-db.sql');
        console.log('  4. Haz clic en Run\n');
      } else {
        tables.forEach((table) => {
          console.log(`  • ${table.table_name}`);
        });
        console.log('');

        // Detallar cada tabla
        for (const table of tables) {
          console.log(`📋 Estructura de ${table.table_name}:`);
          try {
            const { rows: columns } = await client.query(
              `SELECT column_name, data_type, is_nullable FROM information_schema.columns WHERE table_name = $1 AND table_schema = 'public'`,
              [table.table_name]
            );
            columns.forEach(col => {
              console.log(`    • ${col.column_name.padEnd(20)} ${col.data_type.padEnd(30)} ${col.is_nullable === 'NO' ? 'NOT NULL' : 'NULL'}`);
            });
            console.log('');
          } catch (err) {
            console.error(`    Error al obtener estructura: ${err.message}`);
          }
        }
      }
    } catch (err) {
      console.error('❌ Error al obtener tablas:', err.message);
    }

    client.release();
    console.log('✨ Verificación completada exitosamente.\n');
    process.exit(0);

  } catch (error) {
    console.error('❌ Error al conectar:\n');
    console.error(`  ${error.message}\n`);
    process.exit(1);
  } finally {
    if (pool) {
      await pool.end();
    }
  }
}

verifyConnection();

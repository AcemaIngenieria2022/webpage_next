/**
 * Ejecuta un archivo .sql contra la base de datos de DATABASE_URL (.env)
 * y muestra las columnas de pqrs_leads antes y después.
 *
 * Uso: node --env-file=.env scripts/run-migration.js scripts/migrate-pqrs-user-type.sql
 */
const fs = require('fs');
const pg = require('pg');

const sqlFile = process.argv[2];
if (!sqlFile || !fs.existsSync(sqlFile)) {
  console.error('Indica el archivo .sql a ejecutar.');
  process.exit(1);
}

const columnsQuery = "SELECT column_name FROM information_schema.columns WHERE table_name = 'pqrs_leads' ORDER BY ordinal_position";

(async () => {
  const client = new pg.Client({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
  await client.connect();
  try {
    const before = await client.query(columnsQuery);
    console.log('Columnas ANTES:', before.rows.map((r) => r.column_name).join(', '));

    await client.query('BEGIN');
    await client.query(fs.readFileSync(sqlFile, 'utf8'));
    await client.query('COMMIT');
    console.log('Migración aplicada.');

    const after = await client.query(columnsQuery);
    console.log('Columnas DESPUÉS:', after.rows.map((r) => r.column_name).join(', '));
  } catch (error) {
    await client.query('ROLLBACK').catch(() => {});
    console.error('ERROR, no se aplicó ningún cambio:', error.message);
    process.exitCode = 1;
  } finally {
    await client.end();
  }
})();

import { pool } from '@/lib/db';

/**
 * Radicado único compartido con el chatbot (formato ACEMA-AAAA-NNNNN).
 *
 * Pide el siguiente número a la función radicar_solicitud() de Neon, que también crea la fila
 * en la tabla común `solicitudes` (la que consulta el bot). Luego ejecuta `guardarDetalle`
 * (por ejemplo, savePqrsLead) dentro de la MISMA transacción: si el detalle no se puede guardar,
 * se revierte todo y el número no se pierde.
 *
 * Ver scripts/migrate-radicado-unico.sql.
 *
 * @param {object} solicitud  { tipo, subtipo, nombre, documento, email, telefono }
 * @param {(radicado: string, db: import('pg').PoolClient) => Promise<any>} [guardarDetalle]
 * @returns {Promise<string>} el radicado asignado
 */
export async function radicarSolicitud({ tipo, subtipo, nombre, documento, email, telefono }, guardarDetalle) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const { rows } = await client.query(
      `SELECT radicar_solicitud(
         p_canal => 'web', p_tipo => $1, p_subtipo => $2, p_nombre => $3,
         p_documento => $4, p_email => $5, p_telefono => $6
       ) AS radicado`,
      [tipo, subtipo || null, nombre || null, documento || null, email || null, telefono || null],
    );
    const radicado = rows[0].radicado;

    if (guardarDetalle) {
      await guardarDetalle(radicado, client);
    }

    await client.query('COMMIT');
    return radicado;
  } catch (error) {
    await client.query('ROLLBACK').catch(() => {});
    throw error;
  } finally {
    client.release();
  }
}

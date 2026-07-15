import { pool } from '@/lib/db';

export async function saveEticaLead({ tipoReporte, descripcion, fechaOcurrencia, tieneEvidencia, adjuntos = [], observaciones = '', ipOrigen, userAgent }) {
  const query = `
    INSERT INTO etica_leads (
      tipo_reporte,
      descripcion,
      fecha_ocurrencia,
      tiene_evidencia,
      adjuntos,
      estado,
      observaciones,
      ip_origen,
      user_agent
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING id;
  `;

  const values = [
    tipoReporte,
    descripcion,
    fechaOcurrencia,
    tieneEvidencia,
    JSON.stringify(adjuntos),
    'Pendiente',
    observaciones,
    ipOrigen,
    userAgent,
  ];

  try {
    const result = await pool.query(query, values);
    return { id: result.rows[0]?.id };
  } catch (error) {
    console.error('[ETICA DB ERROR]', {
      code: error.code,
      message: error.message,
      query: query.substring(0, 100),
    });
    throw new Error(`DB Error al guardar línea ética: ${error.message}`);
  }
}

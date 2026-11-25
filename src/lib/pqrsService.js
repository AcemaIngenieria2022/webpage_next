import { pool } from '@/lib/db';

// `db` permite pasar el cliente de una transacción (ver radicadoService.js).

export async function savePqrsLead({
  radicado, name, userType, idNumber, email, phone, requestType, pqrsSubtype, description,
  city, department, position, tieneEvidencia = false, adjuntos = [],
}, db = pool) {
  const query = `
    INSERT INTO pqrs_leads (
      radicado, name, user_type, id_number, email, phone, request_type, pqrs_subtype, description,
      city, department, position, has_evidence, attachments
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
    RETURNING id;
  `;
  const values = [
    radicado, name, userType || null, idNumber, email, phone, requestType, pqrsSubtype || null, description,
    city || null, department || null, position || null, Boolean(tieneEvidencia), JSON.stringify(adjuntos || []),
  ];

  try {
    const result = await db.query(query, values);
    const insertId = result.rows[0].id;
    return { id: insertId };
  } catch (error) {
    // Código de error para clave única duplicada en PostgreSQL es '23505'
    if (error.code === '23505') {
      console.error(`[PostgreSQL Error] El radicado duplicado localmente: ${radicado}`);
    }
    throw error;
  }
}

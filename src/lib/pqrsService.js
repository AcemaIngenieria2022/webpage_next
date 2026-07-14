import { pool } from '@/lib/db';

export async function savePqrsLead({ radicado, name, idNumber, email, phone, requestType, description }) {
  const query = `
    INSERT INTO pqrs_leads (radicado, name, id_number, email, phone, request_type, description)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING id;
  `;
  const values = [radicado, name, idNumber, email, phone, requestType, description];
  
  try {
    const result = await pool.query(query, values);
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
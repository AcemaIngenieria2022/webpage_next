import { pool } from '@/lib/db';

export async function saveContactLead({ name, phone, email, company, requestType, message }) {
  const query = `
    INSERT INTO contact_leads (name, phone, email, company, request_type, message)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING id;
  `;
  const values = [name, phone, email, company, requestType, message];
  
  try {
    const result = await pool.query(query, values);
    const insertId = result.rows[0].id;
    console.log('[CONTACT] Registro guardado ID:', insertId);
    return { id: insertId };
  } catch (error) {
    console.error('[CONTACT DB ERROR]', {
      code: error.code,
      message: error.message,
      query: query.substring(0, 100)
    });
    throw new Error(`DB Error al guardar contacto: ${error.message}`);
  }
}
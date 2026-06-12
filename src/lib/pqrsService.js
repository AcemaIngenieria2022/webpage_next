import { pool } from '@/lib/db';

export async function savePqrsLead({ radicado, name, idNumber, email, phone, requestType, description }) {
  const query = `
    INSERT INTO pqrs_leads (radicado, name, id_number, email, phone, request_type, description)
    VALUES (?, ?, ?, ?, ?, ?, ?);
  `;
  const values = [radicado, name, idNumber, email, phone, requestType, description];
  
  try {
    const [result] = await pool.query(query, values);
    return { id: result.insertId };
  } catch (error) {
    // Código de error para clave única duplicada en MySQL
    if (error.code === 'ER_DUP_ENTRY') {
      console.error(`[MySQL Error] El radicado duplicado localmente: ${radicado}`);
    }
    throw error;
  }
}
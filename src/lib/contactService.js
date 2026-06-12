import { pool } from '@/lib/db';

export async function saveContactLead({ name, phone, email, company, requestType, message }) {
  try {
    const query = `
      INSERT INTO contact_leads (name, phone, email, company, request_type, message)
      VALUES (?, ?, ?, ?, ?, ?);
    `;
    const values = [name, phone, email, company, requestType, message];
    
    // Ejecución de la consulta
    const [result] = await pool.query(query, values);
    
    return { success: true, id: result.insertId };
  } catch (error) {
    console.error('Error al guardar el lead en la base de datos:', error);
    // Retornamos un objeto indicando el error para manejarlo en la UI
    return { success: false, error: 'No se pudo guardar el contacto. Intenta de nuevo más tarde.' };
  }
}
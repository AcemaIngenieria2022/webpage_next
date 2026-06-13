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
    console.error('Error detallado al guardar en la BD:', error.message);
    // Lanzamos el error para que el endpoint (route.js) pueda manejarlo
    throw new Error('No se pudo guardar la información en la base de datos.');
  }
}
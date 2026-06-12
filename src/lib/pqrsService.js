import { pool } from '@/lib/db';

// Guardar Lead de Contacto
export async function saveContactLead({ name, phone, email, company, requestType, message }) {
  try {
    const query = `
      INSERT INTO contact_leads (name, phone, email, company, request_type, message)
      VALUES (?, ?, ?, ?, ?, ?);
    `;
    const values = [name, phone, email, company, requestType, message];
    
    const [result] = await pool.query(query, values);
    return { success: true, id: result.insertId };
  } catch (error) {
    console.error('Error al guardar contacto:', error);
    return { success: false, error: 'No se pudo procesar el contacto.' };
  }
}

// Guardar Lead de PQRS
export async function savePqrsLead({ radicado, name, idNumber, email, phone, requestType, description }) {
  const query = `
    INSERT INTO pqrs_leads (radicado, name, id_number, email, phone, request_type, description)
    VALUES (?, ?, ?, ?, ?, ?, ?);
  `;
  const values = [radicado, name, idNumber, email, phone, requestType, description];
  
  try {
    const [result] = await pool.query(query, values);
    return { success: true, id: result.insertId };
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return { success: false, error: 'El número de radicado ya existe.' };
    }
    console.error('Error al guardar PQRS:', error);
    return { success: false, error: 'Ocurrió un error inesperado.' };
  }
}
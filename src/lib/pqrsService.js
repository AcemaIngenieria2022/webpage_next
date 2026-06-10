import { pool } from './db';

export async function savePqrsLead({ radicado, name, idNumber, email, phone, requestType, description }) {
  // 1. Cambiamos los placeholders ($1, $2...) por "?" y removemos RETURNING id
  const query = `
    INSERT INTO pqrs_leads (radicado, name, id_number, email, phone, request_type, description)
    VALUES (?, ?, ?, ?, ?, ?, ?);
  `;
  const values = [radicado, name, idNumber, email, phone, requestType, description];
  
  try {
    // 2. Ejecutamos la consulta usando la sintaxis de desestructuración de mysql2/promise
    const [result] = await pool.query(query, values);
    
    // 3. Retornamos el ID autoincremental usando result.insertId para mantener compatibilidad
    return { id: result.insertId };
  } catch (error) {
    // Captura opcional por si ocurre un duplicado en el campo UNIQUE 'radicado'
    if (error.code === 'ER_DUP_ENTRY') {
      console.error(`Error: El radicado '${radicado}' ya existe en la base de datos.`);
    }
    throw error;
  }
}
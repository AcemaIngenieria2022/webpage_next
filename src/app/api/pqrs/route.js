import pool from './db'; // Tu conexión configurada con mysql2/promise

export async function savePqrsLead(data) {
  const { radicado, name, idNumber, email, phone, requestType, description } = data;

  // Sintaxis de MySQL utilizando "?" como placeholders
  const query = `
    INSERT INTO pqrs_leads (radicado, name, id_number, email, phone, request_type, description)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [radicado, name, idNumber, email, phone, requestType, description];

  try {
    // Desestructuramos el resultado del pool de mysql2
    const [result] = await pool.query(query, values);
    return result;
  } catch (error) {
    // Manejo específico por si el número de radicado aleatorio llega a duplicarse (Error 1062 en MySQL)
    if (error.code === 'ER_DUP_ENTRY') {
      console.error(`Conflicto de duplicidad con el radicado: ${radicado}. Reintentando o lanzando excepción.`);
    }
    
    console.error('Error al guardar la PQRS en MySQL:', error);
    throw error; // Al relanzarlo, el catch del endpoint responderá con Status 500 de forma segura
  }
}
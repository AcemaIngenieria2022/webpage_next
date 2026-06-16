import { pool } from '@/lib/db';

export async function saveContactLead({ name, phone, email, company, requestType, message }) {
  let connection;
  try {
    // 1. Obtener una conexión del pool
    connection = await pool.getConnection();
    
    // 2. Ejecutar la consulta
    const query = `
      INSERT INTO contact_leads (name, phone, email, company, request_type, message)
      VALUES (?, ?, ?, ?, ?, ?);
    `;
    const values = [name, phone, email, company, requestType, message];
    
    const [result] = await connection.execute(query, values);
    
    // 3. Retornar el ID insertado
    return { id: result.insertId };

  } catch (error) {
    console.error('[DATABASE ERROR]:', error);
    throw new Error('No se pudo guardar el contacto. Inténtelo más tarde.');
  } finally {
    // 4. ¡MUY IMPORTANTE!: Liberar la conexión SIEMPRE
    if (connection) connection.release();
  }
}
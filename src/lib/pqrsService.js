import { pool } from '@/lib/db';

export async function savePqrsLead(data) {
  let connection;
  try {
    connection = await pool.getConnection();
    const query = `
      INSERT INTO pqrs_leads 
      (radicado, name, idNumber, email, phone, requestType, description) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      data.radicado, data.name, data.idNumber, 
      data.email, data.phone, data.requestType, data.description
    ];
    
    await connection.execute(query, values);
    return { success: true };
  } catch (error) {
    console.error('[DB SAVE ERROR]:', error);
    throw new Error('Error al guardar en base de datos');
  } finally {
    if (connection) connection.release(); // CRÍTICO: Libera la conexión
  }
}
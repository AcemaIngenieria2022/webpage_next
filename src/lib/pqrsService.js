import { pool } from '@/lib/db';

export async function savePqrsLead(data) {
  let connection;
  try {
    connection = await pool.getConnection();
    const query = `INSERT INTO pqrs_leads (radicado, name, idNumber, email, phone, requestType, description) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const values = [data.radicado, data.name, data.idNumber, data.email, data.phone, data.requestType, data.description];
    
    await connection.execute(query, values);
    return { success: true };
  } catch (error) {
    // ESTO SALDRÁ EN LOS REGISTROS DE HOSTINGER
    console.error('--- ERROR DETALLADO DE BASE DE DATOS ---', error.message);
    throw error; // Lanzamos el error para que el endpoint pueda verlo
  } finally {
    if (connection) connection.release();
  }
}
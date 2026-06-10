import { pool } from './db';

export async function saveContactLead({ name, phone, email, company, requestType, message }) {
  // 1. Cambiamos los placeholders ($1, $2...) por "?" y removemos RETURNING
  const query = `
    INSERT INTO contact_leads (name, phone, email, company, request_type, message)
    VALUES (?, ?, ?, ?, ?, ?);
  `;
  const values = [name, phone, email, company, requestType, message];
  
  // 2. En mysql2/promise, pool.query() devuelve un array donde el primer elemento es el resultado del comando
  const [result] = await pool.query(query, values);
  
  // 3. MySQL devuelve el ID generado en la propiedad "insertId" del resultado
  return { id: result.insertId };
}
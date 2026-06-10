import { pool } from './db';

export async function savePqrsLead({ radicado, name, idNumber, email, phone, requestType, description }) {
  const query = `
    INSERT INTO pqrs_leads (radicado, name, id_number, email, phone, request_type, description)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING id;
  `;
  const values = [radicado, name, idNumber, email, phone, requestType, description];
  const result = await pool.query(query, values);
  return result.rows[0];
}
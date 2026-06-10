import { pool } from './db';

export async function saveContactLead({ name, phone, email, company, requestType, message }) {
  const query = `
    INSERT INTO contact_leads (name, phone, email, company, request_type, message)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING id;
  `;
  const values = [name, phone, email, company, requestType, message];
  const result = await pool.query(query, values);
  return result.rows[0];
}
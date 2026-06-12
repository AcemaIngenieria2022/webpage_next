import { pool } from '@/lib/db';

export async function saveContactLead({ name, phone, email, company, requestType, message }) {
  const query = `
    INSERT INTO contact_leads (name, phone, email, company, request_type, message)
    VALUES (?, ?, ?, ?, ?, ?);
  `;
  const values = [name, phone, email, company, requestType, message];
  
  const [result] = await pool.query(query, values);
  return { id: result.insertId };
}
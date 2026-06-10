import { pool } from './db';

export async function saveContactLead(data) {
  try {
    console.log('Conectando a PostgreSQL...');

    const result = await pool.query(
      `
      INSERT INTO contact_leads
      (name, phone, email, company, request_type, message)
      VALUES ($1,$2,$3,$4,$5,$6)
      RETURNING id
      `,
      [
        data.name,
        data.phone,
        data.email,
        data.company,
        data.requestType,
        data.message
      ]
    );

    console.log('Registro creado:', result.rows[0]);

    return result.rows[0];
  } catch (error) {
    console.error('ERROR SQL:', error);
    throw error;
  }
}
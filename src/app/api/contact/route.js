import pool from './db'; // Tu nuevo archivo de conexión con mysql2

export async function saveContactLead(data) {
  const { name, phone, email, company, requestType, message } = data;

  // Sintaxis de MySQL: usamos "?" en lugar de "$1, $2..."
  const query = `
    INSERT INTO contact_leads (name, phone, email, company, request_type, message)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  const values = [name, phone, email, company, requestType, message];

  try {
    // En mysql2/promise se desestructura el resultado [rows, fields]
    const [result] = await pool.query(query, values);
    return result;
  } catch (error) {
    console.error('Error al guardar el lead de contacto en MySQL:', error);
    throw error; // Lo relanzamos para que lo capture el catch del endpoint (NextResponse 500)
  }
}
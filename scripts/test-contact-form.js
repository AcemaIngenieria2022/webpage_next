// Script para probar la conexión a BD y validación del formulario de contacto
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env.local') });

const validationFunctions = {
  escapeHtml(str = '') {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  },

  isValidEmail(email) {
    if (!email) return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  },

  isValidPhone(phone) {
    if (!phone) return false;
    const cleaned = String(phone).replace(/[\s()+\-\.]/g, '');
    return /^[0-9]{7,15}$/.test(cleaned);
  },

  validateContactPayload({ name, phone, email, company, requestType, message }) {
    const errors = [];
    if (!name || String(name).trim().length < 2) errors.push('Nombre inválido');
    if (!this.isValidPhone(phone)) errors.push('Teléfono inválido');
    if (!this.isValidEmail(email)) errors.push('Email inválido');
    if (!company || String(company).trim().length < 2) errors.push('Empresa inválida');
    if (!requestType || String(requestType).trim().length < 2) errors.push('Tipo de solicitud inválido');
    if (!message || String(message).trim().length < 5) errors.push('Mensaje demasiado corto');
    if (String(name).length > 200) errors.push('Nombre demasiado largo');
    if (String(company).length > 200) errors.push('Empresa demasiado larga');
    if (String(message).length > 5000) errors.push('Mensaje demasiado largo');
    return { ok: errors.length === 0, errors };
  }
};

async function testConnection() {
  console.log('\n=== PRUEBA DE CONEXIÓN A BD ===\n');
  
  const config = {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'webpage_db',
  };

  console.log('Configuración de BD:');
  console.log(`  Host: ${config.host}`);
  console.log(`  Puerto: ${config.port}`);
  console.log(`  Usuario: ${config.user}`);
  console.log(`  BD: ${config.database}`);
  console.log('');

  try {
    const connection = await mysql.createConnection(config);
    console.log('✅ Conexión exitosa a BD\n');

    // Verificar si la tabla contact_leads existe
    const [tables] = await connection.query(
      "SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'contact_leads'",
      [config.database]
    );

    if (tables.length > 0) {
      console.log('✅ Tabla contact_leads existe\n');

      // Obtener estructura de la tabla
      const [columns] = await connection.query(
        'DESCRIBE contact_leads'
      );
      console.log('Estructura de contact_leads:');
      console.table(columns);
    } else {
      console.log('❌ Tabla contact_leads NO existe\n');
      console.log('Ejecuta el archivo SQL para crear la tabla:');
      console.log('  mysql -u root -p webpage_db < u269079254_webpage_db.sql');
    }

    await connection.end();
  } catch (error) {
    console.error('❌ Error al conectar a BD:', error.message);
    console.log('\nPosibles soluciones:');
    console.log('1. Verifica que MySQL esté corriendo');
    console.log('2. Verifica las credenciales en .env.local');
    console.log('3. Verifica que la BD existe: CREATE DATABASE webpage_db;');
  }
}

function testValidation() {
  console.log('\n=== PRUEBA DE VALIDACIÓN ===\n');

  // Casos de prueba
  const testCases = [
    {
      name: 'Caso válido',
      data: {
        name: 'Juan Pérez',
        phone: '3105551234',
        email: 'juan@example.com',
        company: 'Mi Empresa',
        requestType: 'Servicios solares',
        message: 'Me interesa información sobre servicios solares'
      }
    },
    {
      name: 'Teléfono demasiado corto',
      data: {
        name: 'Juan Pérez',
        phone: '123456',
        email: 'juan@example.com',
        company: 'Mi Empresa',
        requestType: 'Servicios solares',
        message: 'Me interesa información'
      }
    },
    {
      name: 'Email inválido',
      data: {
        name: 'Juan Pérez',
        phone: '3105551234',
        email: 'juanexample.com',
        company: 'Mi Empresa',
        requestType: 'Servicios solares',
        message: 'Me interesa información'
      }
    },
    {
      name: 'Mensaje demasiado corto',
      data: {
        name: 'Juan Pérez',
        phone: '3105551234',
        email: 'juan@example.com',
        company: 'Mi Empresa',
        requestType: 'Servicios solares',
        message: 'Hola'
      }
    },
    {
      name: 'Nombre faltante',
      data: {
        name: '',
        phone: '3105551234',
        email: 'juan@example.com',
        company: 'Mi Empresa',
        requestType: 'Servicios solares',
        message: 'Me interesa información sobre servicios'
      }
    }
  ];

  testCases.forEach(testCase => {
    console.log(`\n📋 ${testCase.name}:`);
    const result = validationFunctions.validateContactPayload(testCase.data);
    if (result.ok) {
      console.log('  ✅ Validación EXITOSA');
    } else {
      console.log('  ❌ Validación FALLIDA');
      result.errors.forEach(err => console.log(`     - ${err}`));
    }
  });
}

async function main() {
  await testConnection();
  testValidation();
  console.log('\n=== FIN DE PRUEBAS ===\n');
}

main().catch(console.error);

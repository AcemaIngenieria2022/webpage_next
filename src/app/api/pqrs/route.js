import { NextResponse } from 'next/server';
import { savePqrsLead } from '@/lib/pqrsService';
import { sendPqrsEmail } from '@/lib/mailer';
import { validatePqrsPayload, checkRateLimit } from '@/lib/inputUtils';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, idNumber, email, phone, requestType, description } = body;

    // 1. Control de IP y Rate Limit (Prevención de Spam)
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const rl = checkRateLimit(ip);
    if (!rl.allowed) {
      return NextResponse.json({ success: false, error: 'Demasiadas solicitudes. Intenta más tarde.' }, { status: 429 });
    }

    // 2. Validación de Campos de Entrada
    const validation = validatePqrsPayload({ name, idNumber, email, phone, requestType, description });
    if (!validation.ok) {
      return NextResponse.json({ success: false, error: 'Validación fallida.', details: validation.errors }, { status: 400 });
    }

    // 3. Generación de Radicado Único de Alta Colisión Estricta
    const currentYear = new Date().getFullYear();
    const uniqueId = String(Date.now()).slice(-4); // Toma los últimos 4 milisegundos actuales
    const randomNumber = Math.floor(1000 + Math.random() * 9000); // Bloque aleatorio
    const radicado = `PQRS-${currentYear}-${uniqueId}-${randomNumber}`; // Formato robusto

    // 4. Inserción en MySQL de Hostinger
    await savePqrsLead({ radicado, name, idNumber, email, phone, requestType, description });
    
    // 5. Envío Asíncrono de Notificación por Correo (No bloquea la respuesta HTTP)
    sendPqrsEmail({ radicado, name, idNumber, email, phone, requestType, description })
      .catch(err => console.error('Error asíncrono controlado en sendPqrsEmail:', err));

    // Respuesta Exitosa devolviendo el radicado al cliente
    return NextResponse.json({ success: true, radicado }, { status: 200 });

  } catch (error) {
    // Registro detallado en el backend (Ver en stderr.log de Hostinger)
    console.error('Error crítico atrapado en Endpoint [/api/pqrs]:', error);

    // Captura específica de violaciones de restricción UNIQUE en MySQL
    if (error.code === 'ER_DUP_ENTRY') {
      return NextResponse.json({ 
        success: false, 
        error: 'El número de radicado generado ya existe. Por favor, intente enviar la solicitud de nuevo.' 
      }, { status: 409 });
    }

    // Captura de caídas de conexión con la base de datos
    if (error.code === 'ECONNREFUSED' || error.code === 'PROTOCOL_CONNECTION_LOST') {
      return NextResponse.json({ 
        success: false, 
        error: 'El sistema no pudo conectarse con la base de datos de almacenamiento.',
        code: error.code 
      }, { status: 500 });
    }

    // Captura en caso de que falte ejecutar la migración en phpMyAdmin
    if (error.code === 'ER_NO_SUCH_TABLE') {
      return NextResponse.json({ 
        success: false, 
        error: 'La tabla pqrs_leads no se encuentra creada en el servidor de Hostinger.',
        code: error.code 
      }, { status: 500 });
    }

    // Fallback de Error General expuesto para desarrollo
    return NextResponse.json({ 
      success: false, 
      error: 'Error interno al procesar el radicado de PQRS.',
      details: error.message || error
    }, { status: 500 });
  }
}
import { NextResponse } from 'next/server';
import { saveContactLead } from '@/lib/contactService';
import { sendDepartmentEmail } from '@/lib/mailer';
import { validateContactPayload, checkRateLimit } from '@/lib/inputUtils';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, phone, email, company, requestType, message, attachment } = body;

    // 1. Control de IP y Rate Limit
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const rl = checkRateLimit(ip);
    if (!rl.allowed) {
      return NextResponse.json({ success: false, error: 'Demasiadas solicitudes. Intenta más tarde.' }, { status: 429 });
    }

    // 2. Validación de Campos Obligatorios
    const validation = validateContactPayload({ name, phone, email, company, requestType, message });
    if (!validation.ok) {
      return NextResponse.json({ success: false, error: 'Validación fallida.', details: validation.errors }, { status: 400 });
    }

    // 3. Validación Condicional del Adjunto (Trabaja con nosotros)
    if (requestType === 'Trabaja con nosotros') {
      const { isValidAttachment } = await import('@/lib/inputUtils');
      const check = isValidAttachment(attachment);
      if (!check.ok) {
        return NextResponse.json({ success: false, error: 'Adjunto inválido.', details: check.error }, { status: 400 });
      }
    }

    // 4. Persistencia en la Base de Datos (Punto crítico de error 500)
    await saveContactLead({ name, phone, email, company, requestType, message });

    // 5. Envío asíncrono de correo (No bloquea la respuesta HTTP)
    sendDepartmentEmail({ name, phone, email, company, requestType, message, attachment })
      .catch(err => console.error('Error asíncrono controlado en sendDepartmentEmail:', err));

    return NextResponse.json({ success: true, message: 'Procesado con éxito.' }, { status: 200 });

  } catch (error) {
    // Imprime la traza completa en el archivo `stderr.log` de Hostinger
    console.error('Error crítico atrapado en Endpoint [/api/contact]:', error);

    // Mapeo de errores comunes de Base de Datos para fácil diagnóstico
    if (error.code === 'ECONNREFUSED' || error.code === 'PROTOCOL_CONNECTION_LOST') {
      return NextResponse.json({ 
        success: false, 
        error: 'Error de comunicación con la base de datos.',
        code: error.code 
      }, { status: 500 });
    }

    if (error.code === 'ER_NO_SUCH_TABLE') {
      return NextResponse.json({ 
        success: false, 
        error: 'La tabla contact_leads no existe en la base de datos de Hostinger.',
        code: error.code 
      }, { status: 500 });
    }

    // Respuesta genérica con mensaje nativo del motor de Node.js
    return NextResponse.json({ 
      success: false, 
      error: 'Error interno del servidor al procesar el contacto.',
      details: error.message || error
    }, { status: 500 });
  }
}
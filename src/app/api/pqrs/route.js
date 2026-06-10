import { NextResponse } from 'next/server';
import { savePqrsLead } from '@/lib/pqrsService';
import { sendPqrsEmail } from '@/lib/mailer';
import { validatePqrsPayload, sanitizeForEmail, checkRateLimit } from '@/lib/inputUtils';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, idNumber, email, phone, requestType, description } = body;

    // Rate limiting simple por IP
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const rl = checkRateLimit(ip);
    if (!rl.allowed) {
      return NextResponse.json({ success: false, error: 'Demasiadas solicitudes. Intenta más tarde.' }, { status: 429 });
    }

    const validation = validatePqrsPayload({ name, idNumber, email, phone, requestType, description });
    if (!validation.ok) {
      return NextResponse.json({ success: false, error: 'Validación fallida.', details: validation.errors }, { status: 400 });
    }

    const currentYear = new Date().getFullYear();
    const randomNumber = Math.floor(1000 + Math.random() * 9000);
    const radicado = `PQRS-${currentYear}-${randomNumber}`;

    // 1. Guardamos en la base de datos local
    await savePqrsLead({ radicado, name, idNumber, email, phone, requestType, description });
    
    // 2. Disparamos el envío de correos en segundo plano (no bloqueante)
    sendPqrsEmail({ radicado, name, idNumber, email, phone, requestType, description })
      .then(res => {
        if (!res || !res.ok) console.warn('sendPqrsEmail terminó con errores', res);
      })
      .catch(err => console.error('Error asíncrono en sendPqrsEmail:', err));

    return NextResponse.json({ success: true, radicado }, { status: 200 });
  } catch (error) {
    console.error('Error en Endpoint [/api/pqrs]:', error);
    return NextResponse.json({ success: false, error: 'Error interno al radicar.' }, { status: 500 });
  }
}
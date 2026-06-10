import { NextResponse } from 'next/server';
import { savePqrsLead } from '@/lib/pqrsService';
import { sendPqrsEmail } from '@/lib/mailer';
import { validatePqrsPayload, checkRateLimit } from '@/lib/inputUtils';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, idNumber, email, phone, requestType, description } = body;

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

    await savePqrsLead({ radicado, name, idNumber, email, phone, requestType, description });
    
    sendPqrsEmail({ radicado, name, idNumber, email, phone, requestType, description })
      .catch(err => console.error('Error asíncrono en sendPqrsEmail:', err));

    return NextResponse.json({ success: true, radicado }, { status: 200 });
  } catch (error) {
    console.error('Error en Endpoint [/api/pqrs]:', error);
    return NextResponse.json({ success: false, error: 'Error interno al radicar.' }, { status: 500 });
  }
}
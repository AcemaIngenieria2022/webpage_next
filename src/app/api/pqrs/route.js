import { NextResponse } from 'next/server';
import { savePqrsLead } from '@/lib/pqrsService';
import { sendPqrsEmail } from '@/lib/mailer';
import { validatePqrsPayload, checkRateLimit } from '@/lib/inputUtils';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, idNumber, email, phone, requestType, description } = body;

    // 1. Rate limiting
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const rl = checkRateLimit(ip);
    if (!rl.allowed) {
      return NextResponse.json({ success: false, error: 'Demasiadas solicitudes.' }, { status: 429 });
    }

    // 2. Validación
    const validation = validatePqrsPayload({ name, idNumber, email, phone, requestType, description });
    if (!validation.ok) {
      return NextResponse.json({ success: false, error: 'Validación fallida.', details: validation.errors }, { status: 400 });
    }

    // 3. Generación de radicado
    const currentYear = new Date().getFullYear();
    const randomNumber = Math.floor(1000 + Math.random() * 9000);
    const radicado = `PQRS-${currentYear}-${randomNumber}`;

    // 4. Guardar en Base de Datos (Esperamos confirmación)
    await savePqrsLead({ radicado, name, idNumber, email, phone, requestType, description });
    
    // 5. Envío de correo (Esperamos resultado para asegurar consistencia)
    try {
      await sendPqrsEmail({ radicado, name, idNumber, email, phone, requestType, description });
    } catch (mailError) {
      console.error('Error al enviar correo de PQRS:', mailError);
      // Opcional: No lanzamos error aquí para no anular la confirmación al usuario,
      // pero logueamos el fallo para revisión.
    }

    return NextResponse.json({ success: true, radicado }, { status: 200 });
  } catch (error) {
    console.error('Error crítico en [/api/pqrs]:', error);
    return NextResponse.json({ success: false, error: 'Error interno al radicar.' }, { status: 500 });
  }
}
import { NextResponse } from 'next/server';
import { savePqrsLead } from '@/lib/pqrsService';
import { sendPqrsEmail } from '@/lib/mailer';
import { validatePqrsPayload, checkRateLimit } from '@/lib/inputUtils';

export async function POST(request) {
  try {
    const body = await request.json();
    
    // 1. Rate Limit
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    if (!checkRateLimit(ip).allowed) {
      return NextResponse.json({ error: 'Demasiadas solicitudes' }, { status: 429 });
    }

    // 2. Validación
    const validation = validatePqrsPayload(body);
    if (!validation.ok) {
      return NextResponse.json({ error: 'Datos inválidos', details: validation.errors }, { status: 400 });
    }

    // 3. Generación de radicado
    const radicado = `PQRS-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    // 4. Guardado (Await es necesario para asegurar éxito)
    await savePqrsLead({ ...body, radicado });

    // 5. Correo asíncrono
    sendPqrsEmail({ ...body, radicado }).catch(err => 
      console.error('Error en envío de correo:', err)
    );

    return NextResponse.json({ success: true, radicado }, { status: 200 });
  } catch (error) {
    // ESTO TE DIRÁ QUÉ ESTÁ FALLANDO
    console.error('--- ERROR EN API PQRS ---', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
import { NextResponse } from 'next/server';
import { saveContactLead } from '@/lib/contactService';
import { sendDepartmentEmail } from '@/lib/mailer';
import { validateContactPayload, checkRateLimit } from '@/lib/inputUtils';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, phone, email, company, requestType, message, attachment = null } = body;

    // 1. Rate Limiting
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const rl = checkRateLimit(ip);
    if (!rl.allowed) {
      return NextResponse.json({ success: false, error: 'Demasiadas solicitudes.' }, { status: 429 });
    }

    // 2. Validación Básica
    const validation = validateContactPayload({ name, phone, email, company, requestType, message });
    if (!validation.ok) {
      return NextResponse.json({ success: false, error: 'Validación fallida.', details: validation.errors }, { status: 400 });
    }

    // 3. Validación de Adjuntos si es necesario
    if (requestType === 'Trabaja con nosotros' && attachment) {
      const { isValidAttachment } = await import('@/lib/inputUtils');
      const check = isValidAttachment(attachment);
      if (!check.ok) {
        return NextResponse.json({ success: false, error: 'Adjunto inválido.', details: check.error }, { status: 400 });
      }
    }

    // 4. Guardado en BD (Hostinger MySQL)
    const dbResult = await saveContactLead({ name, phone, email, company, requestType, message });
    if (!dbResult.success) {
      throw new Error('Error al guardar en base de datos');
    }

    // 5. Envío de Correo Asíncrono
    sendDepartmentEmail({ name, phone, email, company, requestType, message, attachment })
      .catch(err => console.error('Error asíncrono en sendDepartmentEmail:', err));

    return NextResponse.json({ success: true, message: 'Solicitud enviada correctamente.' }, { status: 200 });
    
  } catch (error) {
    console.error('Error en Endpoint [/api/contact]:', error);
    return NextResponse.json({ success: false, error: 'Error interno del servidor.' }, { status: 500 });
  }
}
import { NextResponse } from 'next/server';
import { saveContactLead } from '@/lib/contactService';
import { sendDepartmentEmail } from '@/lib/mailer';
import { validateContactPayload, checkRateLimit } from '@/lib/inputUtils';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, phone, email, company, requestType, message, attachment } = body;

    // 1. Rate limiting
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const rl = checkRateLimit(ip);
    if (!rl.allowed) {
      return NextResponse.json({ success: false, error: 'Demasiadas solicitudes.' }, { status: 429 });
    }

    // 2. Validación
    const validation = validateContactPayload({ name, phone, email, company, requestType, message });
    if (!validation.ok) {
      return NextResponse.json({ success: false, error: 'Validación fallida.', details: validation.errors }, { status: 400 });
    }

    // 3. Validación de archivo (si aplica)
    if (requestType === 'Trabaja con nosotros' && attachment) {
      const { isValidAttachment } = await import('@/lib/inputUtils');
      const check = isValidAttachment(attachment);
      if (!check.ok) {
        return NextResponse.json({ success: false, error: 'Adjunto inválido.', details: check.error }, { status: 400 });
      }
    }

    // 4. Guardar en Base de Datos (Esperamos a que guarde)
    await saveContactLead({ name, phone, email, company, requestType, message });

    // 5. Envío de correo (Esperamos a que se envíe o manejamos el error)
    // En entornos de producción, es más seguro esperar que el correo se envíe
    try {
      await sendDepartmentEmail({ name, phone, email, company, requestType, message, attachment });
    } catch (mailError) {
      console.error('Error al enviar correo:', mailError);
      // Opcional: Podrías decidir no fallar la petición completa si el email es secundario
    }

    return NextResponse.json({ success: true, message: 'Procesado con éxito.' }, { status: 200 });
    
  } catch (error) {
    console.error('Error crítico en [/api/contact]:', error);
    return NextResponse.json({ success: false, error: 'Error interno del servidor.' }, { status: 500 });
  }
}
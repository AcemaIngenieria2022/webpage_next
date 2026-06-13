import { NextResponse } from 'next/server';
import { saveContactLead } from '@/lib/contactService';
import { sendDepartmentEmail } from '@/lib/mailer';
import { validateContactPayload, isValidAttachment, checkRateLimit } from '@/lib/inputUtils';

export async function POST(request) {
  try {
    // 1. Obtener y parsear el cuerpo (JSON)
    const body = await request.json();
    const { name, phone, email, company, requestType, message, attachment } = body;

    // 2. Rate Limiting
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    if (!checkRateLimit(ip).allowed) {
      return NextResponse.json({ success: false, error: 'Demasiadas solicitudes.' }, { status: 429 });
    }

    // 3. Validación de campos básicos
    const validation = validateContactPayload({ name, phone, email, company, requestType, message });
    if (!validation.ok) {
      return NextResponse.json({ success: false, error: 'Validación fallida.', details: validation.errors }, { status: 400 });
    }

    // 4. Validación de adjunto (Si aplica)
    if (requestType === 'Trabaja con nosotros' && attachment) {
      const check = isValidAttachment(attachment);
      if (!check.ok) {
        return NextResponse.json({ success: false, error: 'Archivo inválido.', details: check.error }, { status: 400 });
      }
    }

    // 5. Persistencia (await necesario para asegurar que se guardó en BD)
    await saveContactLead({ name, phone, email, company, requestType, message });

    // 6. Envío de correo (Asíncrono pero controlado)
    // Nota: Si el adjunto es muy pesado (ej: Base64 grande), esto podría consumir mucha memoria.
    // Considera procesarlo fuera del hilo principal si el archivo es grande.
    sendDepartmentEmail({ name, phone, email, company, requestType, message, attachment })
      .catch(err => console.error('Error crítico en envío de email:', err));

    return NextResponse.json({ success: true, message: 'Solicitud procesada con éxito.' }, { status: 200 });

  } catch (error) {
    console.error('Error en API Contacto:', error);
    return NextResponse.json({ success: false, error: 'Error interno.' }, { status: 500 });
  }
}
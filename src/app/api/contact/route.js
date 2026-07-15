  import { NextResponse } from 'next/server';
  import { saveContactLead } from '@/lib/contactService';
  import { sendDepartmentEmail } from '@/lib/mailer';
  import { validateContactPayload, sanitizeForEmail, checkRateLimit } from '@/lib/inputUtils';

  export async function POST(request) {
    try {
      const body = await request.json();
      const { name, phone, email, company, requestType, message } = body;

      // Rate limiting simple por IP
      const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
      const rl = checkRateLimit(ip);
      if (!rl.allowed) {
        return NextResponse.json({ success: false, error: 'Demasiadas solicitudes. Intenta más tarde.' }, { status: 429 });
      }

      const validation = validateContactPayload({ name, phone, email, company, requestType, message });
      if (!validation.ok) {
        return NextResponse.json({ success: false, error: 'Validación fallida.', details: validation.errors }, { status: 400 });
      }

      // Validate optional attachment if applying for job
      const attachment = body.attachment;
      if (requestType === 'Trabaja con nosotros') {
        const { isValidAttachment } = await import('@/lib/inputUtils');
        const check = isValidAttachment(attachment);
        if (!check.ok) {
          return NextResponse.json({ success: false, error: 'Adjunto inválido.', details: check.error }, { status: 400 });
        }
      }

      await saveContactLead({ name, phone, email, company, requestType, message });

      // Envío asíncrono no bloqueante (el mailer se encargará de sanitizar antes de insertar en HTML)
      sendDepartmentEmail({ name, phone, email, company, requestType, message, attachment })
        .then(res => {
          if (!res || !res.ok) console.warn('sendDepartmentEmail terminó con errores', res);
        })
        .catch(err => console.error('Error asíncrono en sendDepartmentEmail:', err));

      return NextResponse.json({ success: true, message: 'Procesado con éxito.' }, { status: 200 });
    } catch (error) {
      console.error('Error en Endpoint [/api/contact]:', error);
      return NextResponse.json({ success: false, error: 'Error interno del servidor.' }, { status: 500 });
    }
  }
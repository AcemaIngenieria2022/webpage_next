import { NextResponse } from 'next/server';
import { saveContactLead } from '@/lib/contactService';
import { sendDepartmentEmail } from '@/lib/mailer';
import {
  validateContactPayload,
  checkRateLimit,
  isValidAttachment
} from '@/lib/inputUtils';

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      name,
      phone,
      email,
      company,
      requestType,
      message,
      attachment
    } = body;

    // Rate Limiting
    const ip =
      request.headers.get('x-forwarded-for') ||
      request.headers.get('x-real-ip') ||
      'unknown';

    const rateLimit = checkRateLimit(ip);

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: 'Demasiadas solicitudes. Intenta nuevamente más tarde.'
        },
        { status: 429 }
      );
    }

    // Validación de datos
    const validation = validateContactPayload({
      name,
      phone,
      email,
      company,
      requestType,
      message
    });

    if (!validation.ok) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validación fallida.',
          details: validation.errors
        },
        { status: 400 }
      );
    }

    // Validación de adjunto para hoja de vida
    if (requestType === 'Trabaja con nosotros') {
      const attachmentValidation = isValidAttachment(attachment);

      if (!attachmentValidation.ok) {
        return NextResponse.json(
          {
            success: false,
            error: 'Adjunto inválido.',
            details: attachmentValidation.error
          },
          { status: 400 }
        );
      }
    }

    // Guardar en PostgreSQL (Neon)
    const lead = await saveContactLead({
      name,
      phone,
      email,
      company,
      requestType,
      message
    });

    console.log('Lead guardado:', lead.id);

    // Enviar correo sin bloquear la respuesta
    sendDepartmentEmail({
      name,
      phone,
      email,
      company,
      requestType,
      message,
      attachment
    })
      .then((result) => {
        if (!result?.ok) {
          console.warn('Error enviando correo:', result);
        }
      })
      .catch((error) => {
        console.error('Error en sendDepartmentEmail:', error);
      });

    return NextResponse.json(
      {
        success: true,
        leadId: lead.id,
        message: 'Solicitud enviada correctamente.'
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error en /api/contact:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Error interno del servidor.'
      },
      { status: 500 }
    );
  }
}
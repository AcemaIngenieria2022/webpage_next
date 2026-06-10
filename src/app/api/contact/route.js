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

    // Validación
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

    // Validar adjunto
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

    // Guardar lead
    const lead = await saveContactLead({
      name,
      phone,
      email,
      company,
      requestType,
      message
    });

    console.log('Lead guardado:', lead.id);

    // IMPORTANTE:
    // Esperar el envío del correo antes de responder
    const mailResult = await sendDepartmentEmail({
      name,
      phone,
      email,
      company,
      requestType,
      message,
      attachment
    });

    console.log('Resultado correo:', mailResult);

    if (!mailResult?.ok) {
      console.error('Error enviando correo:', mailResult);

      return NextResponse.json(
        {
          success: false,
          error: 'El formulario fue guardado pero el correo no pudo enviarse.',
          details: mailResult
        },
        { status: 500 }
      );
    }

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
        error: error?.message || 'Error interno del servidor.'
      },
      { status: 500 }
    );
  }
}
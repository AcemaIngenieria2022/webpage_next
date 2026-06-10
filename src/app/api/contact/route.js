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

    // ==========================================
    // RATE LIMIT
    // ==========================================

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

    // ==========================================
    // VALIDACIÓN
    // ==========================================

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

    // ==========================================
    // VALIDACIÓN DE ADJUNTO
    // ==========================================

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

    // ==========================================
    // GUARDAR LEAD EN NEON
    // ==========================================

    const lead = await saveContactLead({
      name,
      phone,
      email,
      company,
      requestType,
      message
    });

    console.log('Lead guardado:', lead.id);

    // ==========================================
    // ENVIAR CORREO (IMPORTANTE PARA VERCEL)
    // ==========================================

    let emailResult = null;

    try {
      emailResult = await sendDepartmentEmail({
        name,
        phone,
        email,
        company,
        requestType,
        message,
        attachment
      });

      console.log('Resultado envío correo:', emailResult);

      if (!emailResult?.ok) {
        console.error(
          'Correo no enviado correctamente:',
          emailResult
        );
      }
    } catch (emailError) {
      console.error(
        'Error enviando correo:',
        emailError
      );
    }

    // ==========================================
    // RESPUESTA
    // ==========================================

    return NextResponse.json(
      {
        success: true,
        leadId: lead.id,
        emailSent: emailResult?.ok || false,
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
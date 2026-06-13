import { NextResponse } from 'next/server';
import { saveContactLead } from '@/lib/contactService';
import { sendDepartmentEmail } from '@/lib/mailer';
import {
  validateContactPayload,
  isValidAttachment,
  checkRateLimit
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


    // Obtener IP real
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      'unknown';


    // Rate limit
    const rl = checkRateLimit(ip);

    if (!rl.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: 'Demasiadas solicitudes. Intenta más tarde.'
        },
        { status: 429 }
      );
    }


    // Validación campos
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


    // Validar adjunto solo para empleos
    if (requestType === 'Trabaja con nosotros') {

      const check = isValidAttachment(attachment);

      if (!check.ok) {
        return NextResponse.json(
          {
            success: false,
            error: 'Adjunto inválido.',
            details: check.error
          },
          { status: 400 }
        );
      }
    }


    // Guardar lead
    await saveContactLead({
      name,
      phone,
      email,
      company,
      requestType,
      message
    });


    // Enviar correo
    await sendDepartmentEmail({
      name,
      phone,
      email,
      company,
      requestType,
      message,
      attachment
    });


    return NextResponse.json(
      {
        success: true,
        message: 'Procesado con éxito.'
      },
      { status: 200 }
    );


  } catch (error) {

    console.error(
      'Error en Endpoint [/api/contact]:',
      error
    );

    return NextResponse.json(
      {
        success: false,
        error: 'Error interno del servidor.'
      },
      { status: 500 }
    );

  }
}
import { NextResponse } from 'next/server';
import { savePqrsLead } from '@/lib/pqrsService';
import { sendPqrsEmail } from '@/lib/mailer';
import {
  validatePqrsPayload,
  checkRateLimit
} from '@/lib/inputUtils';

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      name,
      idNumber,
      email,
      phone,
      requestType,
      description
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
    const validation = validatePqrsPayload({
      name,
      idNumber,
      email,
      phone,
      requestType,
      description
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

    // Generar radicado
    const currentYear = new Date().getFullYear();
    const randomNumber = Math.floor(1000 + Math.random() * 9000);

    const radicado = `PQRS-${currentYear}-${randomNumber}`;

    // Guardar en PostgreSQL
    const lead = await savePqrsLead({
      radicado,
      name,
      idNumber,
      email,
      phone,
      requestType,
      description
    });

    console.log('PQRS guardada:', lead);

    // Enviar correo en segundo plano
    sendPqrsEmail({
      radicado,
      name,
      idNumber,
      email,
      phone,
      requestType,
      description
    })
      .then((result) => {
        if (!result?.ok) {
          console.warn('sendPqrsEmail terminó con errores:', result);
        }
      })
      .catch((error) => {
        console.error('Error en sendPqrsEmail:', error);
      });

    return NextResponse.json(
      {
        success: true,
        radicado,
        message: 'PQRS radicada correctamente.'
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error en /api/pqrs:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Error interno al radicar la PQRS.'
      },
      { status: 500 }
    );
  }
}
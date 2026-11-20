import { NextResponse } from 'next/server';
import { savePqrsLead } from '@/lib/pqrsService';
import { sendPqrsEmail } from '@/lib/mailer';
import { validateChannelPayload, checkRateLimit } from '@/lib/inputUtils';
import { saveUploadedFiles } from '@/lib/fileStorage';

// Canales de atención con formulario propio: Acoso laboral, Acoso sexual, Requerimiento legal.
// Se guardan en la misma tabla de PQRS y se enrutan al buzón de cada canal (ver mailer.js).
const RADICADO_PREFIX = {
  'Acoso laboral': 'AL',
  'Acoso sexual': 'AS',
  'Requerimiento legal': 'RL',
};

export async function POST(request) {
  try {
    const formData = await request.formData();
    const field = (key) => formData.get(key)?.toString().trim() || '';

    const payload = {
      requestType: field('requestType'),
      name: field('name'),
      userType: field('userType'),
      phone: field('phone'),
      idNumber: field('idNumber'),
      email: field('email'),
      city: field('city'),
      department: field('department'),
      position: field('position'),
      description: field('description'),
    };
    const tieneEvidencia = field('tieneEvidencia') === 'true';
    const rawAdjuntos = formData.getAll('adjuntos').filter((file) => file && typeof file === 'object' && file.size > 0);

    const xForwardedFor = request.headers.get('x-forwarded-for');
    const ip = xForwardedFor ? xForwardedFor.split(',')[0].trim() : request.headers.get('x-real-ip') || 'unknown';
    const rl = checkRateLimit(ip);
    if (!rl.allowed) {
      return NextResponse.json({ success: false, error: 'Demasiadas solicitudes. Intenta más tarde.' }, { status: 429 });
    }

    const validation = validateChannelPayload({ ...payload, adjuntos: rawAdjuntos });
    if (!validation.ok) {
      return NextResponse.json({ success: false, error: 'Validación fallida.', details: validation.errors }, { status: 400 });
    }

    let savedFiles = [];
    if (tieneEvidencia && rawAdjuntos.length > 0) {
      try {
        savedFiles = await saveUploadedFiles(rawAdjuntos, 'canales');
      } catch (fileError) {
        return NextResponse.json({ success: false, error: fileError.message }, { status: 400 });
      }
    }

    const currentYear = new Date().getFullYear();
    const randomNumber = Math.floor(1000 + Math.random() * 9000);
    const radicado = `${RADICADO_PREFIX[payload.requestType]}-${currentYear}-${randomNumber}`;

    await savePqrsLead({ radicado, ...payload, tieneEvidencia, adjuntos: savedFiles });

    sendPqrsEmail({ radicado, ...payload, adjuntos: savedFiles })
      .then((res) => {
        if (!res || !res.ok) console.warn('sendPqrsEmail (canales) terminó con errores', res);
      })
      .catch((err) => console.error('Error asíncrono en sendPqrsEmail (canales):', err));

    return NextResponse.json({ success: true, radicado }, { status: 200 });
  } catch (error) {
    console.error('Error en Endpoint [/api/canales]:', error);
    return NextResponse.json({ success: false, error: 'Error interno al radicar.' }, { status: 500 });
  }
}

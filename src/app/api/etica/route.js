import { NextResponse } from 'next/server';
import { saveEticaLead } from '@/lib/eticaService';
import { sendEticaEmail } from '@/lib/mailer';
import { validateEticaPayload, sanitizeForEmail, checkRateLimit } from '@/lib/inputUtils';
import { saveEticaFiles } from '@/lib/fileStorage';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const tipoReporte = formData.get('tipoReporte')?.toString() || '';
    const descripcion = formData.get('descripcion')?.toString() || '';
    const fechaOcurrencia = formData.get('fechaOcurrencia')?.toString() || '';
    const tieneEvidenciaRaw = formData.get('tieneEvidencia');
    const observaciones = formData.get('observaciones')?.toString() || '';

    const tieneEvidencia = typeof tieneEvidenciaRaw === 'string' ? tieneEvidenciaRaw === 'true' : Boolean(tieneEvidenciaRaw);
    const rawAdjuntos = formData.getAll('adjuntos').filter(Boolean);

    const xForwardedFor = request.headers.get('x-forwarded-for');
    const ip = xForwardedFor ? xForwardedFor.split(',')[0].trim() : request.headers.get('x-real-ip') || 'unknown';

    const rl = checkRateLimit(ip);
    if (!rl.allowed) {
      return NextResponse.json({ success: false, error: 'Demasiadas solicitudes. Intenta más tarde.' }, { status: 429 });
    }

    const validation = validateEticaPayload({ tipoReporte, descripcion, fechaOcurrencia, tieneEvidencia, adjuntos: rawAdjuntos });
    if (!validation.ok) {
      return NextResponse.json({ success: false, error: 'Validación fallida.', details: validation.errors }, { status: 400 });
    }

    let savedFiles = [];
    if (tieneEvidencia && rawAdjuntos.length > 0) {
      savedFiles = await saveEticaFiles(rawAdjuntos);
    }

    await saveEticaLead({
      tipoReporte,
      descripcion: sanitizeForEmail(descripcion),
      fechaOcurrencia,
      tieneEvidencia,
      adjuntos: savedFiles,
      observaciones,
      ipOrigen: ip,
      userAgent: request.headers.get('user-agent') || '',
    });

    sendEticaEmail({
      tipoReporte,
      descripcion,
      fechaOcurrencia,
      tieneEvidencia,
      adjuntos: savedFiles,
      observaciones,
      ipOrigen: ip,
      userAgent: request.headers.get('user-agent') || '',
    })
      .then((result) => {
        if (!result.ok) {
          console.warn('[ETICA EMAIL] No se pudo enviar el correo de notificación:', result.results);
        }
      })
      .catch((emailError) => {
        console.error('[ETICA EMAIL] Error asíncrono al enviar correo:', emailError);
      });

    return NextResponse.json({ success: true, message: 'Reporte ético registrado correctamente.' }, { status: 200 });
  } catch (error) {
    console.error('Error en Endpoint [/api/etica]:', error);
    return NextResponse.json({ success: false, error: 'Error interno del servidor.' }, { status: 500 });
  }
}

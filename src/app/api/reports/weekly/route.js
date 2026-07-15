import { NextResponse } from 'next/server';
import { sendWeeklyDatabaseReportEmail } from '@/lib/mailer';

export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const to = String(body.to || '').trim();
    const cc = body.cc || [];
    const days = Number(body.days || 7);

    const result = await sendWeeklyDatabaseReportEmail({
      to: to || process.env.EMAIL_TO_INFO || process.env.EMAIL_TO_REPORTES || process.env.EMAIL_TO_CONTACTO,
      cc: "OperacionesTI@acemaingenieria.com",
      days,
    });

    if (!result.ok) {
      return NextResponse.json({ success: false, error: 'No se pudo enviar el informe semanal.', details: result.results }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Informe semanal enviado correctamente.' }, { status: 200 });
  } catch (error) {
    console.error('Error en Endpoint [/api/reports/weekly]:', error);
    return NextResponse.json({ success: false, error: 'Error interno del servidor.' }, { status: 500 });
  }
}

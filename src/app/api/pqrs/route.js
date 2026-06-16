import { NextResponse } from 'next/server';
import { savePqrsLead } from '@/lib/pqrsService';
import { sendPqrsEmail } from '@/lib/mailer';
import { validatePqrsPayload, checkRateLimit } from '@/lib/inputUtils';

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Validaciones de Rate Limit y Payload...
    
    const radicado = `PQRS-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    // Ejecución con captura de error explícita
    await savePqrsLead({ ...body, radicado });

    sendPqrsEmail({ ...body, radicado }).catch(e => console.error('Error envío email:', e));

    return NextResponse.json({ success: true, radicado }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: 'Error interno al radicar.', 
      details: error.message // Esto te mostrará el problema en la consola del navegador
    }, { status: 500 });
  }
}
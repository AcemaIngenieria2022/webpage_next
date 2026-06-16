// Asegúrate de que las importaciones sean top-level
import { NextResponse } from 'next/server';
import { saveContactLead } from '@/lib/contactService';
import { sendDepartmentEmail } from '@/lib/mailer';
import { validateContactPayload, checkRateLimit, isValidAttachment } from '@/lib/inputUtils'; // Importar aquí

export async function POST(request) {
  try {
    const body = await request.json();
    // ... (tu código de rate limit y validación)

    // Si es Trabaja con nosotros, validar adjunto
    if (body.requestType === 'Trabaja con nosotros') {
      const check = isValidAttachment(body.attachment); // Usar la importación directa
      if (!check.ok) return NextResponse.json({ success: false, error: 'Adjunto inválido.' }, { status: 400 });
    }

    // Guardar en BD con log previo
    console.log('Intentando guardar contacto...');
    await saveContactLead(body); 

    // ... (resto del código)
  } catch (error) {
    // ESTO TE DIRÁ EXACTAMENTE QUÉ PASA EN EL LOG
    console.error('DETALLE DEL ERROR 500:', error.message, error.stack);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
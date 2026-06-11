import nodemailer from 'nodemailer';
import path from 'path';
import fs from 'fs';
import { sanitizeForEmail } from './inputUtils';

// ==========================================
// 1. CONFIGURACIÓN Y CONSTANTES DE ENVÍO
// ==========================================

const DEPARTMENTS = {
  contacto: process.env.EMAIL_TO_CONTACTO || '',
  recursos: process.env.EMAIL_TO_RECURSOS || '',
  comercial: process.env.EMAIL_TO_COMERCIAL || '',
  solar: process.env.EMAIL_TO_SOLAR || '',
  electric: process.env.EMAIL_TO_ELECTRIC || '',
  pqrs: process.env.EMAIL_TO_PQRS || process.env.EMAIL_TO_CONTACTO || ''
};

const host = process.env.EMAIL_HOST || 'smtp-mail.outlook.com';
const port = parseInt(process.env.EMAIL_PORT || '587', 10);
const secure = (process.env.EMAIL_SECURE === 'true');

const auth = process.env.EMAIL_USER && process.env.EMAIL_PASS ? {
  user: process.env.EMAIL_USER,
  pass: process.env.EMAIL_PASS,
} : undefined;

const tlsOptions = {
  rejectUnauthorized: process.env.EMAIL_REJECT_UNAUTHORIZED === 'false' ? false : true,
  servername: process.env.EMAIL_SERVERNAME || host,
};

// Logo paths for embedding in emails (prefer WEBP when available)
const logoPngPath = path.join(process.cwd(), 'public', 'images', 'logs', 'logo-acema.png');
const logoWebpPath = path.join(process.cwd(), 'public', 'images', 'logs', 'logo-acema.webp');
const logoWebpExists = fs.existsSync(logoWebpPath);

// Reusable header logo HTML: prefer WEBP when available, otherwise PNG
const headerLogoHtml = logoWebpExists
  ? `<img src="cid:logo_acema_webp" alt="ACEMA" style="height:48px; display:block; margin:0 auto;" />`
  : `<img src="cid:logo_acema_png" alt="ACEMA" style="height:48px; display:block; margin:0 auto;" />`;

// ==========================================
// 2. SISTEMA DE TRANSPORTE Y FALLBACKS
// ==========================================

const createTransport = (config) => nodemailer.createTransport({
  host: config.host,
  port: config.port,
  secure: config.secure,
  auth,
  requireTLS: !config.secure,
  tls: tlsOptions,
});

// Se generan los transporters en cada ejecución para evitar pérdida de estado en Serverless
const getTransporters = () => {
  const primary = createTransport({ host, port, secure });
  const fallbacks = [];

  if (host === 'smtp-mail.outlook.com') {
    fallbacks.push(createTransport({
      host: 'smtp.office365.com',
      port: 587,
      secure: false,
    }));
  }
  return [primary, ...fallbacks];
};

async function sendMailWithFallback(mailOptions) {
  let lastError = null;
  const transporters = getTransporters();

  for (const transporterInstance of transporters) {
    try {
      return await transporterInstance.sendMail(mailOptions);
    } catch (error) {
      lastError = error;
      console.warn(`[MAIL FALLBACK] Falló envío en host ${transporterInstance.options.host}:${transporterInstance.options.port} - Código:`, error && error.code);
    }
  }
  throw lastError;
}

// ==========================================
// 3. ESTILOS CSS REUTILIZABLES (Outlook & Web Safe)
// ==========================================

const emailStyles = `
  body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f4f7f9; -webkit-font-smoothing: antialiased; }
  .wrapper { width: 100%; table-layout: fixed; background-color: #f4f7f9; padding-top: 40px; padding-bottom: 40px; }
  .container { max-width: 600px; background-color: #ffffff; border-radius: 8px; border-spacing: 0; margin: 0 auto; box-shadow: 0 4px 15px rgba(33,91,160,0.08); border: 1px solid #e2e8f0; overflow: hidden; }
  .header { background: #215ba0; background: linear-gradient(135deg, #215ba0 0%, #40a335 100%); padding: 35px 40px; text-align: center; }
  .header { background: #ffffff; padding: 28px 40px; text-align: center; border-bottom: 2px solid #215ba0; }
  .header-logo { color: #215ba0; font-size: 26px; font-weight: 800; letter-spacing: 1.5px; margin: 0; text-transform: uppercase; }
  .header-subtitle { color: #215ba0; font-size: 13px; margin-top: 8px; letter-spacing: 1px; text-transform: uppercase; opacity: 0.95; font-weight: 600; }
  .content { padding: 40px; background-color: #ffffff; }
  .badge { display: inline-block; background-color: #e8f5e9; color: #40a335; padding: 6px 16px; border-radius: 50px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 25px; border: 1px solid #c8e6c9; }
  .section-title { color: #215ba0; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 20px; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px; }
  .data-table { width: 100%; margin-bottom: 25px; border-spacing: 0 10px; }
  .data-card { background-color: #f8fafc; border-left: 4px solid #215ba0; padding: 14px 18px; border-radius: 0 6px 6px 0; border-top: 1px solid #edf2f7; border-right: 1px solid #edf2f7; border-bottom: 1px solid #edf2f7; }
  .data-label { color: #64748b; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
  .data-value { color: #1e293b; font-size: 14px; font-weight: 600; }
  .data-link { color: #215ba0; text-decoration: none; font-weight: 600; }
  .msg-box { background-color: #f8fafc; border-radius: 6px; padding: 22px 25px; border: 1px dashed #cbd5e1; border-left: 4px solid #40a335; }
  .msg-title { color: #40a335; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 10px; }
  .msg-text { color: #334155; font-size: 14px; line-height: 1.6; white-space: pre-wrap; margin: 0; }
  .radicado-banner { background: #f0fdf4; background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border-radius: 6px; padding: 25px; text-align: center; margin-bottom: 25px; border: 1px solid #bbf7d0; }
  .radicado-label { color: #166534; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 6px; }
  .radicado-num { color: #215ba0; font-size: 32px; font-weight: 800; font-family: 'Courier New', monospace; letter-spacing: 2px; margin: 0; }
  .footer { background-color: #f8fafc; padding: 30px 40px; text-align: center; border-top: 1px solid #e2e8f0; }
  .footer-text { color: #94a3b8; font-size: 11px; line-height: 1.6; margin: 4px 0; }
  .success-circle { width: 60px; height: 60px; background-color: #e8f5e9; color: #40a335; font-size: 30px; line-height: 60px; border-radius: 50%; text-align: center; margin: 0 auto 20px auto; font-weight: bold; border: 2px solid #a5d6a7; }
`;

// ==========================================
// 4. MÉTODOS DE ENVÍO EXPORTADOS
// ==========================================

export async function sendDepartmentEmail({ name, phone, email, company, requestType, message, attachment }) {
  // Enrutamiento basado en tus variables de entorno mapeadas
  let targetEmail = DEPARTMENTS.comercial || DEPARTMENTS.contacto || '';

  if (requestType === 'Trabaja con nosotros') targetEmail = DEPARTMENTS.recursos || targetEmail;
  else if (requestType === 'Servicios solares') targetEmail = DEPARTMENTS.solar || targetEmail;
  else if (requestType === 'Servicios eléctricos') targetEmail = DEPARTMENTS.electric || targetEmail;

  console.log(`[CONTACT EMAIL ROUTING] Interés: "${requestType}" -> Destino: "${targetEmail}"`);

  const results = { department: null, confirmation: null, errors: [] };
  
  try {
    const attachments = [];
    if (attachment && attachment.content) {
      try {
        attachments.push({
          filename: attachment.filename,
          content: Buffer.from(attachment.content, 'base64'),
          contentType: attachment.mimeType || undefined,
        });
      } catch (err) {
        console.warn('Adjunto inválido, se ignorará:', err);
      }
    }

    const attachmentsWithLogo = [
      ...attachments,
      {
        filename: 'logo-acema.png',
        path: logoPngPath,
        cid: 'logo_acema_png'
      },
      // attach webp when available for clients that support it
      ...(logoWebpExists ? [{ filename: 'logo-acema.webp', path: logoWebpPath, cid: 'logo_acema_webp' }] : [])
    ];

    const departmentPromise = sendMailWithFallback({
      from: `"Web Contacto ACEMA" <${process.env.EMAIL_USER}>`,
      to: targetEmail,
      replyTo: email,
      subject: `[Contacto - ${requestType}] Nuevo Lead de ${company}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>${emailStyles}</style>
          </head>
          <body>
            <div class="wrapper">
              <table class="container">
                <tr>
                  <td class="header">
                    ${headerLogoHtml}
                    <h1 class="header-logo">ACEMA INGENIERÍA</h1>
                    <div class="header-subtitle">Notificación de Formulario Web</div>
                  </td>
                </tr>
                <tr>
                  <td class="content">
                    <div class="badge">${sanitizeForEmail(requestType)}</div>
                    
                    <div class="section-title">Información del Interesado</div>
                    
                    <table class="data-table">
                      <tr>
                        <td>
                          <div class="data-card">
                            <div class="data-label">Nombre Completo</div>
                            <div class="data-value">${sanitizeForEmail(name)}</div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div class="data-card">
                            <div class="data-label">Empresa</div>
                            <div class="data-value">${sanitizeForEmail(company)}</div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div class="data-card">
                            <div class="data-label">Teléfono de Contacto</div>
                            <div class="data-value">${sanitizeForEmail(phone)}</div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div class="data-card">
                            <div class="data-label">Correo Electrónico</div>
                            <div class="data-value"><a href="mailto:${sanitizeForEmail(email)}" class="data-link">${sanitizeForEmail(email)}</a></div>
                          </div>
                        </td>
                      </tr>
                    </table>

                    <div class="msg-box">
                      <div class="msg-title">Detalles del Mensaje / Consulta:</div>
                      <p class="msg-text">${sanitizeForEmail(message)}</p>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class="footer">
                    <p class="footer-text">Este correo se generó de forma automática desde acemaingenieria.com</p>
                    <p class="footer-text">© 2026 ACEMA Ingeniería. Todos los derechos reservados.</p>
                  </td>
                </tr>
              </table>
            </div>
          </body>
        </html>
      `,
      attachments: attachmentsWithLogo,
    });

    const confirmationPromise = sendMailWithFallback({
      from: `"Atención al Cliente ACEMA" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Confirmación de recepción - ${requestType}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>${emailStyles}</style>
          </head>
          <body>
            <div class="wrapper">
              <table class="container">
                <tr>
                  <td class="header">
                    ${headerLogoHtml}
                    <h1 class="header-logo">ACEMA INGENIERÍA</h1>
                    <div class="header-subtitle">Confirmación de Recepción</div>
                  </td>
                </tr>
                <tr>
                  <td class="content">
                    <div class="success-circle">✓</div>
                    <p style="color: #1e293b; font-size: 16px; font-weight: 700; margin: 0 0 16px 0; text-align: center;">Hola ${sanitizeForEmail(name)},</p>
                    <p style="color: #475569; font-size: 14px; line-height: 1.75; margin: 0 0 24px 0; text-align: center;">Hemos recibido tu solicitud de <strong>${sanitizeForEmail(String(requestType).toLowerCase())}</strong>. Nuestro equipo revisará tu mensaje y te contactará a la brevedad.</p>
                    
                    <div class="radicado-banner">
                      <div class="radicado-label">Tipo de Solicitud Registrada</div>
                      <div class="radicado-num" style="font-size: 20px; font-family: inherit; letter-spacing: 0.5px;">${sanitizeForEmail(requestType)}</div>
                    </div>
                    
                    <div class="msg-box">
                      <div class="msg-title">Tu mensaje enviado:</div>
                      <p class="msg-text">${sanitizeForEmail(message)}</p>
                    </div>
                    <p style="color: #64748b; font-size: 13px; line-height: 1.6; margin: 24px 0 0 0; text-align: center;">Gracias por escribirnos. Si necesitas contactar de nuevo, usa nuestros canales oficiales.</p>
                  </td>
                </tr>
                <tr>
                  <td class="footer">
                    <p class="footer-text">Este correo es automático y confirma que tu mensaje fue recibido por ACEMA Ingeniería.</p>
                    <p class="footer-text">© 2026 ACEMA Ingeniería. Todos los derechos reservados.</p>
                  </td>
                </tr>
              </table>
            </div>
          </body>
        </html>
      `,
      attachments: attachmentsWithLogo,
    });

    const settled = await Promise.allSettled([departmentPromise, confirmationPromise]);
    const [deptRes, confRes] = settled;

    if (deptRes.status === 'fulfilled') results.department = deptRes.value;
    else results.errors.push({ stage: 'department', error: deptRes.reason });

    if (confRes.status === 'fulfilled') results.confirmation = confRes.value;
    else results.errors.push({ stage: 'confirmation', error: confRes.reason });

    return { ok: results.errors.length === 0, results };
  } catch (error) {
    console.error('Error general en sendDepartmentEmail:', error);
    results.errors.push({ stage: 'general', error });
    return { ok: false, results };
  }
}

export async function sendPqrsEmail({ radicado, name, idNumber, email, phone, requestType, description }) {
  const targetEmail = DEPARTMENTS.pqrs || DEPARTMENTS.contacto;
  const results = { internal: null, confirmation: null, errors: [] };
  
  try {
    const pqrsAttachments = [
      {
        filename: 'logo-acema.png',
        path: logoPngPath,
        cid: 'logo_acema_png'
      },
      ...(logoWebpExists ? [{ filename: 'logo-acema.webp', path: logoWebpPath, cid: 'logo_acema_webp' }] : [])
    ];

    const internalPromise = sendMailWithFallback({
      from: `"Sistema PQRS ACEMA" <${process.env.EMAIL_USER}>`,
      to: targetEmail,
      replyTo: email,
      subject: `[${requestType.toUpperCase()}] Radicado N° ${radicado}`,
      attachments: pqrsAttachments,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>${emailStyles}</style>
          </head>
          <body>
            <div class="wrapper">
              <table class="container">
                <tr>
                  <td class="header">
                    <picture>
                      ${logoWebpExists ? '<source srcset="cid:logo_acema_webp" type="image/webp" />' : ''}
                      <img src="cid:logo_acema_png" alt="ACEMA" style="height:48px; display:block; margin:0 auto 8px;" />
                    </picture>
                    <h1 class="header-logo">ACEMA INGENIERÍA</h1>
                    <div class="header-subtitle">Panel de Control General PQRS</div>
                  </td>
                </tr>
                <tr>
                  <td class="content">
                    <div class="radicado-banner">
                      <div class="radicado-label">Número de Radicado Asignado</div>
                      <div class="radicado-num">${sanitizeForEmail(radicado)}</div>
                    </div>

                    <div class="badge">${sanitizeForEmail(requestType)}</div>
                    
                    <div class="section-title">Información del Solicitante</div>
                    
                    <table class="data-table">
                      <tr>
                        <td>
                          <div class="data-card">
                            <div class="data-label">Nombre del Ciudadano / Cliente</div>
                            <div class="data-value">${sanitizeForEmail(name)}</div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div class="data-card">
                            <div class="data-label">Documento de Identidad</div>
                            <div class="data-value">${sanitizeForEmail(idNumber)}</div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div class="data-card">
                            <div class="data-label">Teléfono</div>
                            <div class="data-value">${sanitizeForEmail(phone)}</div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div class="data-card">
                            <div class="data-label">Email de Notificación</div>
                            <div class="data-value"><a href="mailto:${sanitizeForEmail(email)}" class="data-link">${sanitizeForEmail(email)}</a></div>
                          </div>
                        </td>
                      </tr>
                    </table>

                    <div class="msg-box">
                      <div class="msg-title">Descripción de la solicitud:</div>
                      <p class="msg-text">${sanitizeForEmail(description)}</p>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class="footer">
                    <p class="footer-text">Mensaje del sistema de gestión interna de requerimientos web.</p>
                    <p class="footer-text">© 2026 ACEMA Ingeniería. Todos los derechos reservados.</p>
                  </td>
                </tr>
              </table>
            </div>
          </body>
        </html>
      `,
    });

    const confirmationPromise = sendMailWithFallback({
      from: `"Atención al Cliente ACEMA" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Confirmación de Recepción - Radicado N° ${radicado}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>${emailStyles}</style>
          </head>
          <body>
            <div class="wrapper">
              <table class="container">
                <tr>
                  <td class="header">
                    <picture>
                      ${logoWebpExists ? '<source srcset="cid:logo_acema_webp" type="image/webp" />' : ''}
                      <img src="cid:logo_acema_png" alt="ACEMA" style="height:48px; display:block; margin:0 auto 8px;" />
                    </picture>
                    <h1 class="header-logo">ACEMA INGENIERÍA</h1>
                    <div class="header-subtitle">Confirmación de Recepción de Solicitud</div>
                  </td>
                </tr>
                <tr>
                  <td class="content">
                    <div class="success-circle">✓</div>
                    
                    <p style="color: #1e293b; font-size: 16px; font-weight: 600; margin-top: 0; text-align: center;">
                      Estimado(a) ${sanitizeForEmail(name)},
                    </p>
                    
                    <p style="color: #475569; font-size: 14px; line-height: 1.6; text-align: center; margin-bottom: 30px;">
                      Hemos recibido de forma satisfactoria tu solicitud de <strong>${sanitizeForEmail(String(requestType).toLowerCase())}</strong>. Nuestro equipo de atención al cliente ya se encuentra evaluando los datos provistos.
                    </p>

                    <div class="radicado-banner">
                      <div class="radicado-label">Código Único de Seguimiento</div>
                      <div class="radicado-num">${sanitizeForEmail(radicado)}</div>
                      <p style="color: #166534; font-size: 12px; margin: 8px 0 0 0; font-weight: 500;">Por favor guarda este código para cualquier consulta futura sobre tu estado.</p>
                    </div>

                    <p style="color: #64748b; font-size: 13px; line-height: 1.6; margin-top: 30px; text-align: center;">
                      Atentamente,<br>
                      <strong style="color: #215ba0;">Área de Atención al Cliente y PQRS</strong><br>
                      ACEMA Ingeniería S.A.S
                    </p>
                  </td>
                </tr>
                <tr>
                  <td class="footer">
                    <p class="footer-text">Por favor no respondas a este correo corporativo automático de control.</p>
                    <p class="footer-text">© 2026 ACEMA Ingeniería. Todos los derechos reservados.</p>
                  </td>
                </tr>
              </table>
            </div>
          </body>
        </html>
      `,
      attachments: pqrsAttachments,
    });

    const settled = await Promise.allSettled([internalPromise, confirmationPromise]);
    const [intRes, confRes] = settled;

    if (intRes.status === 'fulfilled') results.internal = intRes.value;
    else results.errors.push({ stage: 'internal', error: intRes.reason });

    if (confRes.status === 'fulfilled') results.confirmation = confRes.value;
    else results.errors.push({ stage: 'confirmation', error: confRes.reason });

    return { ok: results.errors.length === 0, results };
  } catch (error) {
    console.error('Error general en sendPqrsEmail:', error);
    results.errors.push({ stage: 'general', error });
    return { ok: false, results };
  }
}

export default {
  sendDepartmentEmail,
  sendPqrsEmail,
};
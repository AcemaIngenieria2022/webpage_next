import nodemailer from 'nodemailer';
import path from 'path';
import fs from 'fs';
import * as XLSX from 'xlsx';
import { pool } from './db';
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
  pqrs: process.env.EMAIL_TO_PQRS || process.env.EMAIL_TO_CONTACTO || '',
  etica: process.env.EMAIL_TO_ETICA || process.env.EMAIL_TO_CONTACTO || '',
  info: process.env.EMAIL_TO_INFO || process.env.EMAIL_TO_REPORTES || process.env.EMAIL_TO_CONTACTO || '',
  reportes: process.env.EMAIL_TO_REPORTES || process.env.EMAIL_TO_INFO || process.env.EMAIL_TO_CONTACTO || ''
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
const logoPngPath = path.join(process.cwd(), 'public', 'images', 'logs', 'logo-acema.webp');
const logoWebpPath = path.join(process.cwd(), 'public', 'images', 'logs', 'logo-acema.webp');
const logoWebpExists = fs.existsSync(logoWebpPath);

// Reusable header logo HTML: prefer WEBP when available, otherwise PNG
const headerLogoHtml = logoWebpExists
  ? `<img src="cid:logo_acema_webp" alt="ACEMA" style="height:48px; display:block; margin:0 auto;" />`
  : `<img src="cid:logo_acema_webp" alt="ACEMA" style="height:48px; display:block; margin:0 auto;" />`;

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

function normalizeEmailList(value) {
  if (!value) return [];
  if (Array.isArray(value)) return value.filter(Boolean);

  return String(value)
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

function formatDateForReport(value) {
  if (!value) return '—';

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

function formatDateOnlyForReport(value) {
  if (!value) return '—';

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

function formatBooleanForReport(value) {
  return value === true || value === 'true' || value === 'TRUE' ? 'Sí' : 'No';
}

function buildExcelWorkbook({ contactRows, pqrsRows, eticaRows }) {
  const workbook = XLSX.utils.book_new();

  const contactSheetRows = contactRows.map((row) => ({
    'Nombre': row.name || '—',
    'Correo electrónico': row.email || '—',
    'Teléfono': row.phone || '—',
    'Empresa': row.company || '—',
    'Tipo de solicitud': row.request_type || '—',
    'Fecha de registro': formatDateForReport(row.created_at),
  }));

  const pqrsSheetRows = pqrsRows.map((row) => ({
    'Radicado': row.radicado || '—',
    'Nombre': row.name || '—',
    'Número de identificación': row.id_number || '—',
    'Correo electrónico': row.email || '—',
    'Teléfono': row.phone || '—',
    'Tipo de solicitud': row.request_type || '—',
    'Descripción': row.description || '—',
    'Fecha de registro': formatDateForReport(row.created_at),
  }));

  const eticaSheetRows = eticaRows.map((row) => ({
    'Tipo de reporte': row.tipo_reporte || '—',
    'Descripción': row.descripcion || '—',
    'Fecha de ocurrencia': formatDateOnlyForReport(row.fecha_ocurrencia),
    'Tiene evidencia': formatBooleanForReport(row.tiene_evidencia),
    'Fecha de reporte': formatDateForReport(row.fecha_reporte),
  }));

  const contactSheet = XLSX.utils.json_to_sheet(contactSheetRows);
  const pqrsSheet = XLSX.utils.json_to_sheet(pqrsSheetRows);
  const eticaSheet = XLSX.utils.json_to_sheet(eticaSheetRows);

  XLSX.utils.book_append_sheet(workbook, contactSheet, 'Contacto');
  XLSX.utils.book_append_sheet(workbook, pqrsSheet, 'PQRS');
  XLSX.utils.book_append_sheet(workbook, eticaSheet, 'Línea Ética');

  return XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
}

function buildHtmlTable(rows, columns) {
  if (!Array.isArray(rows) || rows.length === 0) {
    return '<p class="msg-text">No se encontraron registros en este periodo.</p>';
  }

  const renderedHeaders = columns.map((column) => `<th style="border:1px solid #cbd5e1; padding:8px 10px; background:#eff6ff; text-align:left; font-size:11px; color:#1d4ed8;">${sanitizeForEmail(column.label || column.key)}</th>`).join('');
  const renderedRows = rows.map((row) => {
    const cells = columns.map((column) => {
      const rawValue = row[column.key] ?? row[column.key.toLowerCase()] ?? '';
      let text = String(rawValue ?? '').trim();

      if (column.key === 'created_at' || column.key === 'fecha_reporte') {
        text = formatDateForReport(rawValue);
      }

      if (column.key === 'fecha_ocurrencia') {
        text = formatDateOnlyForReport(rawValue);
      }

      if (column.key === 'tiene_evidencia') {
        text = formatBooleanForReport(rawValue);
      }

      return `<td style="border:1px solid #e2e8f0; padding:8px 10px; font-size:12px; color:#0f172a;">${sanitizeForEmail(text || '—')}</td>`;
    }).join('');

    return `<tr>${cells}</tr>`;
  }).join('');

  return `
    <table style="width:100%; border-collapse:collapse; margin-top:16px; font-size:12px; background:#ffffff;">
      <thead>
        <tr>${renderedHeaders}</tr>
      </thead>
      <tbody>${renderedRows}</tbody>
    </table>
  `;
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
        filename: 'logo-acema.webp',
        path: logoPngPath,
        cid: 'logo_acema_webp'
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

export async function sendEticaEmail({ tipoReporte, descripcion, fechaOcurrencia, tieneEvidencia, adjuntos = [], observaciones, ipOrigen, userAgent }) {
  const targetEmail = DEPARTMENTS.etica;
  const results = { internal: null, errors: [] };

  try {
    if (!targetEmail) {
      throw new Error('No se ha configurado un destinatario para los correos de Línea Ética.');
    }

    const fileAttachments = Array.isArray(adjuntos) && adjuntos.length > 0
      ? adjuntos
          .map((file) => {
            if (!file || !file.storedPath) return null;
            return {
              filename: file.originalName || file.storedName || 'evidencia',
              path: path.join(process.cwd(), file.storedPath),
              contentType: file.mimeType || undefined,
            };
          })
          .filter(Boolean)
      : [];

    const attachments = [
      ...fileAttachments,
      {
        filename: 'logo-acema.webp',
        path: logoPngPath,
        cid: 'logo_acema_webp'
      },
      ...(logoWebpExists ? [{ filename: 'logo-acema.webp', path: logoWebpPath, cid: 'logo_acema_webp' }] : [])
    ];

    const evidenceText = tieneEvidencia ? 'Sí' : 'No';
    const attachmentsSummary = Array.isArray(adjuntos) && adjuntos.length > 0
      ? adjuntos.map((file, index) => `• ${sanitizeForEmail(file.originalName || file.name || `Archivo ${index + 1}`)} (${sanitizeForEmail(file.mimeType || file.type || 'tipo desconocido')})`).join('<br>')
      : 'No se adjuntaron evidencias.';

    const internalResult = await sendMailWithFallback({
      from: `"Línea Ética ACEMA" <${process.env.EMAIL_USER}>`,
      to: targetEmail,
      subject: `[Línea Ética] ${tipoReporte}`,
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
                    <div class="header-subtitle">Nuevo reporte de Línea Ética</div>
                  </td>
                </tr>
                <tr>
                  <td class="content">
                    <div class="badge">${sanitizeForEmail(tipoReporte)}</div>
                    <div class="section-title">Detalles del reporte</div>
                    <table class="data-table">
                      <tr>
                        <td>
                          <div class="data-card">
                            <div class="data-label">Fecha de ocurrencia</div>
                            <div class="data-value">${sanitizeForEmail(fechaOcurrencia)}</div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div class="data-card">
                            <div class="data-label">¿Cuenta con evidencia?</div>
                            <div class="data-value">${sanitizeForEmail(evidenceText)}</div>
                          </div>
                        </td>
                      </tr>
                    </table>
                    <div class="msg-box">
                      <div class="msg-title">Descripción del reporte</div>
                      <p class="msg-text">${sanitizeForEmail(descripcion)}</p>
                    </div>
                 
                    <div class="msg-box" style="margin-top: 18px; border-left: 4px solid #40a335;">
                      <div class="msg-title">Evidencias recibidas</div>
                      <p class="msg-text">${attachmentsSummary}</p>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class="footer">
                    <p class="footer-text">Este correo fue generado automáticamente desde acemaingenieria.com</p>
                    <p class="footer-text">© 2026 ACEMA Ingeniería. Todos los derechos reservados.</p>
                  </td>
                </tr>
              </table>
            </div>
          </body>
        </html>
      `,
      attachments,
    });

    results.internal = internalResult;
    return { ok: true, results };
  } catch (error) {
    console.error('Error general en sendEticaEmail:', error);
    results.errors.push({ stage: 'general', error });
    return { ok: false, results };
  }
}

export async function sendWeeklyDatabaseReportEmail({ to, cc = [], days = 7 }) {
  const targetEmail = to || DEPARTMENTS.info || DEPARTMENTS.reportes;
  const ccList = normalizeEmailList(cc);
  const results = { internal: null, errors: [] };

  try {
    if (!targetEmail) {
      throw new Error('No se ha configurado un destinatario para los informes semanales.');
    }

    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - Number(days || 7));

    const [contactRows, pqrsRows, eticaRows] = await Promise.all([
      pool.query(
        `
          SELECT id, name, phone, email, company, request_type, message, created_at
          FROM contact_leads
          WHERE created_at >= $1
          ORDER BY created_at DESC
        `,
        [cutoff]
      ),
      pool.query(
        `
          SELECT id, radicado, name, id_number, email, phone, request_type, description, created_at
          FROM pqrs_leads
          WHERE created_at >= $1
          ORDER BY created_at DESC
        `,
        [cutoff]
      ),
      pool.query(
        `
          SELECT id, tipo_reporte, descripcion, fecha_ocurrencia, tiene_evidencia, estado, observaciones, fecha_reporte
          FROM etica_leads
          WHERE fecha_reporte >= $1
          ORDER BY fecha_reporte DESC
        `,
        [cutoff]
      ),
    ]);

    const contactColumns = [
      { key: 'name', label: 'Nombre' },
      { key: 'email', label: 'Correo electrónico' },
      { key: 'phone', label: 'Teléfono' },
      { key: 'company', label: 'Empresa' },
      { key: 'request_type', label: 'Tipo de solicitud' },
      { key: 'created_at', label: 'Fecha de registro' },
    ];

    const pqrsColumns = [
      { key: 'radicado', label: 'Radicado' },
      { key: 'name', label: 'Nombre' },
      { key: 'id_number', label: 'Número de identificación' },
      { key: 'email', label: 'Correo electrónico' },
      { key: 'phone', label: 'Teléfono' },
      { key: 'request_type', label: 'Tipo de solicitud' },
      { key: 'description', label: 'Descripción' },
      { key: 'created_at', label: 'Fecha de registro' },
    ];

    const eticaColumns = [
      { key: 'tipo_reporte', label: 'Tipo de reporte' },
      { key: 'descripcion', label: 'Descripción' },
      { key: 'fecha_ocurrencia', label: 'Fecha de ocurrencia' },
      { key: 'tiene_evidencia', label: 'Tiene evidencia' },
      { key: 'fecha_reporte', label: 'Fecha de reporte' },
    ];

    const contactSummary = buildHtmlTable(contactRows.rows, contactColumns);
    const pqrsSummary = buildHtmlTable(pqrsRows.rows, pqrsColumns);
    const eticaSummary = buildHtmlTable(eticaRows.rows, eticaColumns);

    const contactCountHtml = `<div style="margin:-10px 0 12px 0; font-size:12px; color:#475569; font-weight:700;">Cantidad de registros: ${contactRows.rows.length}</div>`;
    const pqrsCountHtml = `<div style="margin:-10px 0 12px 0; font-size:12px; color:#475569; font-weight:700;">Cantidad de registros: ${pqrsRows.rows.length}</div>`;
    const eticaCountHtml = `<div style="margin:-10px 0 12px 0; font-size:12px; color:#475569; font-weight:700;">Cantidad de registros: ${eticaRows.rows.length}</div>`;

    const introMessage = `
<p>Buenos días, cordial saludo.</p>

<p>
A continuación, se presenta el resumen semanal consolidado de los registros
recibidos a través de los formularios de Contacto, PQRS y Línea Ética.
La información se muestra en formato de tabla para facilitar su consulta y análisis.
</p>

<p>
Adicionalmente, se adjunta el archivo de Excel con el mismo contenido para su revisión.
</p>
`;

    const workbookBuffer = buildExcelWorkbook({
      contactRows: contactRows.rows,
      pqrsRows: pqrsRows.rows,
      eticaRows: eticaRows.rows,
    });

    const internalResult = await sendMailWithFallback({
      from: `"Reportes Semanales ACEMA" <${process.env.EMAIL_USER}>`,
      to: targetEmail,
      cc: ccList.length > 0 ? ccList : undefined,
      subject: `[Informes] Resumen de formularios web ${new Date().toLocaleDateString('es-CO')}`,
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
                    <div class="header-subtitle">Informe semanal de base de datos</div>
                  </td>
                </tr>
                <tr>
                  <td class="content">
                    <div class="badge">Resumen ${days || 7} días</div>
                    <div class="msg-box" style="margin-bottom: 18px; border-left: 4px solid #215ba0;">
                      <div class="msg-title">Mensaje del informe</div>
                      ${introMessage}
                    </div>
                    <div class="section-title">Contacto</div>
                    ${contactCountHtml}
                    ${contactSummary}
                    <div class="section-title">PQRS</div>
                    ${pqrsCountHtml}
                    ${pqrsSummary}
                    <div class="section-title">Línea Ética</div>
                    ${eticaCountHtml}
                    ${eticaSummary}
                  </td>
                </tr>
                <tr>
                  <td class="footer">
                    <p class="footer-text">Este correo fue generado automáticamente desde acemaingenieria.com</p>
                    <p class="footer-text">© 2026 ACEMA Ingeniería. Todos los derechos reservados.</p>
                  </td>
                </tr>
              </table>
            </div>
          </body>
        </html>
      `,
      attachments: [
        {
          filename: 'resumen-semanal.xlsx',
          content: workbookBuffer,
          contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        },
        {
          filename: 'logo-acema.webp',
          path: logoPngPath,
          cid: 'logo_acema_webp'
        },
        ...(logoWebpExists ? [{ filename: 'logo-acema.webp', path: logoWebpPath, cid: 'logo_acema_webp' }] : [])
      ],
    });

    results.internal = internalResult;
    return { ok: true, results };
  } catch (error) {
    console.error('Error general en sendWeeklyDatabaseReportEmail:', error);
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
        filename: 'logo-acema.webp',
        path: logoPngPath,
        cid: 'logo_acema_webp'
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
                      <img src="cid:logo_acema_webp" alt="ACEMA" style="height:48px; display:block; margin:0 auto 8px;" />
                    </picture>
             
                    <div class="header-subtitle">Notificación de Formulario Web-PQRS</div>
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
                      <img src="cid:logo_acema_webp" alt="ACEMA" style="height:48px; display:block; margin:0 auto 8px;" />
                    </picture>
         
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

const mailerExports = {
  sendDepartmentEmail,
  sendEticaEmail,
  sendPqrsEmail,
  sendWeeklyDatabaseReportEmail,
};

export default mailerExports;
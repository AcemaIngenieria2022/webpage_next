// Utilidades de validación y sanitización de entrada

const rateMap = new Map(); // key: ip, value: array of timestamps (ms)

export function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function sanitizeForEmail(str = '') {
  // Escape HTML and preserve line breaks as <br>
  const escaped = escapeHtml(str);
  return escaped.replace(/\r?\n/g, '<br>');
}

export function isValidEmail(email) {
  if (!email) return false;
  // Simple RFC-ish email regex (sufficient for server-side quick validation)
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidPhone(phone) {
  if (!phone) return false;
  // Allow digits, spaces, +, -, parentheses. Minimal length check.
  const cleaned = String(phone).replace(/[\s()+\-\.]/g, '');
  return /^[0-9]{7,15}$/.test(cleaned);
}

export function validateContactPayload({ name, phone, email, company, requestType, message }) {
  const errors = [];
  if (!name || String(name).trim().length < 2) errors.push('Nombre inválido');
  if (!isValidPhone(phone)) errors.push('Teléfono inválido');
  if (!isValidEmail(email)) errors.push('Email inválido');
  if (!company || String(company).trim().length < 2) errors.push('Empresa inválida');
  if (!requestType || String(requestType).trim().length < 2) errors.push('Tipo de solicitud inválido');
  if (!message || String(message).trim().length < 5) errors.push('Mensaje demasiado corto');
  // enforce max lengths
  if (String(name).length > 200) errors.push('Nombre demasiado largo');
  if (String(company).length > 200) errors.push('Empresa demasiado larga');
  if (String(message).length > 5000) errors.push('Mensaje demasiado largo');
  return { ok: errors.length === 0, errors };
}

export function isValidAttachment(attachment, maxBytes = 5 * 1024 * 1024) {
  // attachment: { filename, content (base64), mimeType }
  if (!attachment) return { ok: true };
  const { filename, content, mimeType } = attachment;
  if (!filename || !content) return { ok: false, error: 'Adjunto inválido' };
  const allowed = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
  if (mimeType && !allowed.includes(mimeType)) return { ok: false, error: 'Tipo de archivo no permitido' };
  // estimate size from base64 length
  const approxBytes = Math.floor((content.length * 3) / 4);
  if (approxBytes > maxBytes) return { ok: false, error: 'Archivo demasiado grande' };
  return { ok: true };
}

export function validatePqrsPayload({ name, idNumber, email, phone, requestType, description }) {
  const errors = [];
  if (!name || String(name).trim().length < 2) errors.push('Nombre inválido');
  if (!idNumber || String(idNumber).trim().length < 5) errors.push('Documento inválido');
  if (!isValidEmail(email)) errors.push('Email inválido');
  if (!isValidPhone(phone)) errors.push('Teléfono inválido');
  if (!requestType || String(requestType).trim().length < 2) errors.push('Tipo de solicitud inválido');
  if (!description || String(description).trim().length < 5) errors.push('Descripción demasiado corta');
  if (String(description).length > 8000) errors.push('Descripción demasiado larga');
  return { ok: errors.length === 0, errors };
}

export function validateEticaPayload({ tipoReporte, descripcion, fechaOcurrencia, tieneEvidencia, adjuntos }) {
  const errors = [];
  const evidenceFlag = typeof tieneEvidencia === 'string' ? tieneEvidencia === 'true' : tieneEvidencia;
  if (!tipoReporte || String(tipoReporte).trim().length < 2) errors.push('Tipo de reporte inválido');
  if (!descripcion || String(descripcion).trim().length < 10) errors.push('Descripción inválida o muy corta');
  if (!fechaOcurrencia || isNaN(Date.parse(fechaOcurrencia))) errors.push('Fecha de ocurrencia inválida');
  if (typeof evidenceFlag !== 'boolean') errors.push('Debe indicar si tiene evidencia');
  if (!Array.isArray(adjuntos)) errors.push('Adjuntos inválidos');
  if (Array.isArray(adjuntos) && adjuntos.length > 20) errors.push('Se permiten hasta 20 evidencias como máximo');
  return { ok: errors.length === 0, errors };
}

export function checkRateLimit(ip = 'unknown', limit = 6, windowMs = 60_000) {
  try {
    const now = Date.now();
    const entry = rateMap.get(ip) || [];
    // Remove timestamps older than window
    const recent = entry.filter(t => now - t < windowMs);
    if (recent.length >= limit) {
      // update map to trim stale entries
      rateMap.set(ip, recent);
      return { allowed: false, remaining: 0, retryAfter: Math.ceil((windowMs - (now - recent[0])) / 1000) };
    }
    recent.push(now);
    rateMap.set(ip, recent);
    return { allowed: true, remaining: Math.max(0, limit - recent.length) };
  } catch (err) {
    return { allowed: true, remaining: 1 };
  }
}

export default {
  escapeHtml,
  sanitizeForEmail,
  validateContactPayload,
  validatePqrsPayload,
  checkRateLimit,
};

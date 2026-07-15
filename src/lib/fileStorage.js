import fs from 'fs/promises';
import path from 'path';
import { randomUUID } from 'crypto';

const eticaUploadDir = path.join(process.cwd(), 'uploads', 'etica');
const allowedMimeTypes = new Set([
  'application/pdf',
  'image/jpeg',
  'image/jpg',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]);
const maxFileSizeBytes = 15 * 1024 * 1024; // 15 MB por archivo

export function isAllowedEticaMimeType(mimeType) {
  return allowedMimeTypes.has(mimeType);
}

export async function ensureEticaUploadDir() {
  await fs.mkdir(eticaUploadDir, { recursive: true });
}

export async function saveEticaFiles(files) {
  await ensureEticaUploadDir();

  const saved = [];
  for (const file of files) {
    if (!file || typeof file.name !== 'string' || !allowedMimeTypes.has(file.type)) {
      throw new Error(`Tipo de archivo no permitido: ${file?.type || 'desconocido'}`);
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    if (buffer.length > maxFileSizeBytes) {
      throw new Error(`Archivo demasiado grande: ${file.name}. Máximo ${maxFileSizeBytes / 1024 / 1024} MB.`);
    }

    const extension = path.extname(file.name).toLowerCase();
    const baseName = path.basename(file.name, extension).replace(/[^a-zA-Z0-9-_\.]/g, '_').slice(0, 60);
    const storedName = `${Date.now()}-${randomUUID()}-${baseName}${extension}`;
    const storedPath = path.join(eticaUploadDir, storedName);

    await fs.writeFile(storedPath, buffer);

    saved.push({
      originalName: file.name,
      storedName,
      mimeType: file.type,
      size: buffer.length,
      storedPath: path.posix.join('uploads', 'etica', storedName),
    });
  }

  return saved;
}

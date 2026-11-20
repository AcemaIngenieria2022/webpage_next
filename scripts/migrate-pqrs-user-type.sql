-- Migración: nuevos campos de PQRS y canales de atención
-- (Tipo de usuario, Tipo de PQRS, y datos de Acoso laboral / Acoso sexual / Requerimiento legal).
-- Ejecutar una sola vez en la base de datos de producción ANTES de desplegar los cambios.
ALTER TABLE pqrs_leads ADD COLUMN IF NOT EXISTS user_type VARCHAR(50);
ALTER TABLE pqrs_leads ADD COLUMN IF NOT EXISTS pqrs_subtype VARCHAR(50);
ALTER TABLE pqrs_leads ADD COLUMN IF NOT EXISTS city VARCHAR(150);
ALTER TABLE pqrs_leads ADD COLUMN IF NOT EXISTS department VARCHAR(150);
ALTER TABLE pqrs_leads ADD COLUMN IF NOT EXISTS position VARCHAR(150);
ALTER TABLE pqrs_leads ADD COLUMN IF NOT EXISTS has_evidence BOOLEAN DEFAULT FALSE;
ALTER TABLE pqrs_leads ADD COLUMN IF NOT EXISTS attachments JSONB DEFAULT '[]'::jsonb;
